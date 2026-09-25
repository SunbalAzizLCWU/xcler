"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

type Citation = { title: string; heading: string; url: string };
type ChatMsg = { id: string; role: "user" | "assistant"; content: string; citations?: Citation[] };
type Mode = "text" | "voice";
type VoiceState = "idle" | "listening" | "thinking" | "speaking";

const SESSION_KEY = "xcler-assistant-session";
const PENDING_KEY = "xcler-assistant-pending-transcript";
const BAR_COUNT = 26;
const IDLE_MS = 10 * 60 * 1000;

type StoredSession = {
  token?: string;
  name?: string;
  messages?: ChatMsg[];
  lastActivityAt?: number;
};

function VoiceWaveform({
  analyser,
  active,
  tone,
}: {
  analyser: AnalyserNode | null;
  active: boolean;
  tone: "user" | "ai" | "idle";
}) {
  const [heights, setHeights] = useState<number[]>(() => Array.from({ length: BAR_COUNT }, () => 0.14));

  useEffect(() => {
    let raf = 0;
    const bins = new Uint8Array(analyser?.frequencyBinCount ?? 64);
    const tick = () => {
      if (analyser && active) {
        analyser.getByteFrequencyData(bins);
        setHeights(
          Array.from({ length: BAR_COUNT }, (_, i) => {
            const idx = Math.min(bins.length - 1, Math.floor((i / BAR_COUNT) * bins.length * 0.7) + 2);
            return Math.max(0.1, bins[idx] / 255);
          })
        );
      } else if (active) {
        const t = Date.now() / 220;
        setHeights(
          Array.from({ length: BAR_COUNT }, (_, i) => 0.18 + Math.abs(Math.sin(t + i * 0.42)) * 0.72)
        );
      } else {
        setHeights(Array.from({ length: BAR_COUNT }, (_, i) => 0.1 + (i % 4 === 0 ? 0.06 : 0)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [analyser, active]);

  const color =
    tone === "user" ? "bg-terracotta shadow-[0_0_10px_rgba(255,77,28,0.45)]" : tone === "ai"
      ? "bg-sage shadow-[0_0_10px_rgba(45,255,154,0.4)]"
      : "bg-cream/25";

  return (
    <div className="flex h-[4.5rem] items-end justify-center gap-[3px]" aria-hidden="true">
      {heights.map((height, index) => (
        <span
          key={index}
          className={`w-[3px] rounded-full sm:w-[4px] ${color}`}
          style={{ height: `${Math.round(height * 100)}%`, transition: "height 80ms linear" }}
        />
      ))}
    </div>
  );
}

function pickBrowserVoice(locale: string) {
  const voices = window.speechSynthesis.getVoices();
  const lang = locale === "de" ? "de" : "en";
  return (
    voices.find((voice) => voice.lang.toLowerCase().startsWith(lang) && /female|anna|google/i.test(voice.name)) ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith(lang)) ||
    null
  );
}

export function AssistantWidget() {
  const t = useTranslations("Assistant");
  const locale = useLocale() === "en" ? "en" : "de";
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gateError, setGateError] = useState("");
  const [gating, setGating] = useState(false);
  const [mode, setMode] = useState<Mode>("text");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [busy, setBusy] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [ending, setEnding] = useState(false);
  const [endedNotice, setEndedNotice] = useState<"idle" | "manual" | "">("");

  const listRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const abortSpeakRef = useRef<AbortController | null>(null);
  const tokenRef = useRef("");
  const messagesRef = useRef<ChatMsg[]>([]);
  const lastActivityRef = useRef(Date.now());
  const endingRef = useRef(false);
  const endChatRef = useRef<(reason: "idle" | "manual") => Promise<void>>(async () => {});

  tokenRef.current = token;
  messagesRef.current = messages;

  const touchActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  const persistSession = useCallback((next: StoredSession) => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const endChat = useCallback(
    async (reason: "idle" | "manual") => {
      if (endingRef.current) return;
      const authToken = tokenRef.current;
      if (!authToken) return;
      endingRef.current = true;
      setEnding(true);
      abortSpeakRef.current?.abort();
      window.speechSynthesis?.cancel();
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      setAnalyser(null);
      setVoiceState("idle");

      const payload = {
        reason,
        messages: messagesRef.current.map((msg) => ({ role: msg.role, content: msg.content })),
      };

      try {
        sessionStorage.setItem(PENDING_KEY, JSON.stringify({ token: authToken, ...payload }));
      } catch {
        // ignore
      }

      try {
        await fetch("/api/assistant/end", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          keepalive: true,
        });
        sessionStorage.removeItem(PENDING_KEY);
      } catch {
        // retry on next visit via PENDING_KEY
      }

      sessionStorage.removeItem(SESSION_KEY);
      setToken("");
      setVisitorName("");
      setMessages([]);
      setInput("");
      setEndedNotice(reason);
      setEnding(false);
      endingRef.current = false;
    },
    []
  );
  endChatRef.current = endChat;

  useEffect(() => {
    try {
      const pendingRaw = sessionStorage.getItem(PENDING_KEY);
      if (pendingRaw) {
        const pending = JSON.parse(pendingRaw) as { token?: string; reason?: "idle" | "manual"; messages?: ChatMsg[] };
        if (pending.token) {
          void fetch("/api/assistant/end", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${pending.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reason: pending.reason === "idle" ? "idle" : "manual",
              messages: (pending.messages ?? []).map((msg) => ({ role: msg.role, content: msg.content })),
            }),
            keepalive: true,
          }).finally(() => {
            sessionStorage.removeItem(PENDING_KEY);
          });
        }
      }

      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredSession;
      if (!parsed.token || !parsed.name) return;
      if (parsed.lastActivityAt && Date.now() - parsed.lastActivityAt >= IDLE_MS) {
        tokenRef.current = parsed.token;
        messagesRef.current = parsed.messages ?? [];
        void endChatRef.current("idle");
        return;
      }
      setToken(parsed.token);
      setVisitorName(parsed.name);
      if (parsed.messages?.length) setMessages(parsed.messages);
      lastActivityRef.current = parsed.lastActivityAt || Date.now();
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    persistSession({
      token,
      name: visitorName,
      messages,
      lastActivityAt: lastActivityRef.current,
    });
  }, [token, visitorName, messages, persistSession]);

  useEffect(() => {
    if (!token) return;
    const timer = window.setInterval(() => {
      if (Date.now() - lastActivityRef.current >= IDLE_MS) {
        void endChatRef.current("idle");
      }
    }, 15000);
    return () => window.clearInterval(timer);
  }, [token]);

  useEffect(() => {
    const onHide = () => {
      if (!tokenRef.current) return;
      if (Date.now() - lastActivityRef.current >= IDLE_MS) {
        void endChatRef.current("idle");
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") onHide();
    };
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, busy]);

  const ensureAudio = useCallback(async () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") await audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const stopMic = useCallback(() => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    setAnalyser(null);
  }, []);

  const authHeaders = useCallback(
    () => ({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    [token]
  );

  async function startGate(event: React.FormEvent) {
    event.preventDefault();
    setGateError("");
    setGating(true);
    try {
      const response = await fetch("/api/assistant/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: gateName, email: gateEmail, locale }),
      });
      const json = (await response.json()) as { token?: string; name?: string; error?: string };
      if (!response.ok || !json.token) {
        setGateError(json.error || t("gateInvalid"));
        return;
      }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token: json.token, name: json.name }));
      setToken(json.token);
      setVisitorName(json.name || gateName);
      setEndedNotice("");
      lastActivityRef.current = Date.now();
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: t("welcome", { name: json.name || gateName }),
        },
      ]);
    } catch {
      setGateError(t("error"));
    } finally {
      setGating(false);
    }
  }

  async function streamAnswer(history: ChatMsg[], voice: boolean) {
    const response = await fetch("/api/assistant/chat", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        voice,
        messages: history.map((msg) => ({ role: msg.role, content: msg.content })),
      }),
    });
    if (response.status === 410) {
      await endChat("idle");
      throw new Error("ended");
    }
    if (!response.ok || !response.body) {
      throw new Error("chat failed");
    }

    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let full = "";
    let citations: Citation[] = [];

    const apply = (content: string, nextCitations?: Citation[]) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content, citations: nextCitations ?? msg.citations }
            : msg
        )
      );
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        let payload: {
          type?: string;
          token?: string;
          citations?: Citation[];
          text?: string;
        };
        try {
          payload = JSON.parse(line.slice(5).trim()) as typeof payload;
        } catch {
          continue;
        }
        if (payload.type === "meta" && payload.citations) {
          citations = payload.citations;
          apply(full, citations);
        } else if (payload.type === "token" && payload.token) {
          full += payload.token;
          apply(full, citations);
        } else if (payload.type === "done" && payload.text) {
          full = payload.text;
          apply(full, citations);
        }
      }
    }
    return full;
  }

  async function speak(text: string) {
    abortSpeakRef.current?.abort();
    const abort = new AbortController();
    abortSpeakRef.current = abort;
    setVoiceState("speaking");

    const response = await fetch("/api/assistant/speak", {
      method: "POST",
      headers: authHeaders(),
      signal: abort.signal,
      body: JSON.stringify({ text, locale }),
    });

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      await speakBrowser(text);
      return;
    }

    const ctx = await ensureAudio();
    const buffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(buffer.slice(0));
    const source = ctx.createBufferSource();
    const node = ctx.createAnalyser();
    node.fftSize = 256;
    source.buffer = audioBuffer;
    source.connect(node);
    node.connect(ctx.destination);
    setAnalyser(node);
    await new Promise<void>((resolve) => {
      source.onended = () => resolve();
      source.start();
    });
    setAnalyser(null);
    setVoiceState("idle");
  }

  async function speakBrowser(text: string) {
    await new Promise<void>((resolve) => {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = locale === "de" ? "de-DE" : "en-US";
      const voice = pickBrowserVoice(locale);
      if (voice) utter.voice = voice;
      utter.rate = 1.02;
      utter.onend = () => resolve();
      utter.onerror = () => resolve();
      window.speechSynthesis.speak(utter);
    });
    setVoiceState("idle");
  }

  async function sendText(raw?: string) {
    const text = (raw ?? input).trim();
    if (!text || !token) return;
    if (raw === undefined && busy) return;
    touchActivity();
    setInput("");
    setBusy(true);
    const userMsg: ChatMsg = { id: `u-${Date.now()}`, role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    try {
      const answer = await streamAnswer(history, mode === "voice");
      if (mode === "voice" && answer) {
        try {
          await speak(answer);
        } catch {
          await speakBrowser(answer);
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message === "ended") return;
      setMessages((prev) => [
        ...prev,
        { id: `e-${Date.now()}`, role: "assistant", content: t("error") },
      ]);
    } finally {
      setBusy(false);
      setVoiceState("idle");
    }
  }

  async function startListening() {
    if (!token || busy || voiceState === "listening") return;
    touchActivity();
    setMode("voice");
    setVoiceState("listening");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setVoiceState("idle");
      setMessages((prev) => [...prev, { id: `e-${Date.now()}`, role: "assistant", content: t("error") }]);
      return;
    }
    mediaStreamRef.current = stream;
    const ctx = await ensureAudio();
    const source = ctx.createMediaStreamSource(stream);
    const node = ctx.createAnalyser();
    node.fftSize = 256;
    source.connect(node);
    setAnalyser(node);

    const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";
    const recorder = new MediaRecorder(stream, { mimeType: mime });
    chunksRef.current = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.start();
    recorderRef.current = recorder;
    window.setTimeout(() => {
      if (recorderRef.current === recorder && recorder.state === "recording") stopAndSendVoice();
    }, 28000);
  }

  async function stopAndSendVoice() {
    const recorder = recorderRef.current;
    if (!recorder) return;
    setVoiceState("thinking");
    const blob = await new Promise<Blob>((resolve) => {
      recorder.onstop = () => resolve(new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" }));
      if (recorder.state === "recording") recorder.stop();
      else resolve(new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" }));
    });
    stopMic();
    try {
      const form = new FormData();
      form.set("file", blob, blob.type.includes("mp4") ? "speech.mp4" : "speech.webm");
      const transcribed = await fetch("/api/assistant/transcribe", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const json = (await transcribed.json()) as { text?: string; error?: string };
      if (!transcribed.ok || !json.text) {
        setMessages((prev) => [...prev, { id: `e-${Date.now()}`, role: "assistant", content: t("error") }]);
        return;
      }
      await sendText(json.text);
    } catch {
      setMessages((prev) => [...prev, { id: `e-${Date.now()}`, role: "assistant", content: t("error") }]);
    } finally {
      setBusy(false);
      if (voiceState !== "speaking") setVoiceState("idle");
    }
  }

  const gated = Boolean(token);
  const waveformTone = voiceState === "listening" ? "user" : voiceState === "speaking" ? "ai" : "idle";

  return (
    <div
      className="fixed z-[80]"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "calc(max(1rem, env(safe-area-inset-bottom)) + 4.35rem)",
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex h-[min(36rem,calc(100dvh-8.5rem))] w-[min(24.5rem,calc(100vw-2rem))] flex-col overflow-hidden border border-cream/10 bg-richblack/95 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <header className="border-b border-cream/10 px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-stone-light">{t("eyebrow")}</p>
              <div className="mt-1 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg leading-tight text-cream">{t("title")}</h2>
                  {visitorName ? (
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-sage">{visitorName}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-0.5 text-cream/50 transition-colors hover:text-cream"
                  aria-label={t("close")}
                >
                  ✕
                </button>
              </div>
              <div className="mt-3 h-px w-10 bg-gradient-to-r from-sage to-terracotta" />
              {gated && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setMode("text")}
                    className={`px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
                      mode === "text" ? "bg-terracotta text-richblack" : "border border-cream/15 text-cream/70"
                    }`}
                  >
                    {t("switchToText")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("voice")}
                    className={`px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
                      mode === "voice" ? "bg-sage text-richblack" : "border border-cream/15 text-cream/70"
                    }`}
                  >
                    {t("switchToVoice")}
                  </button>
                  <button
                    type="button"
                    disabled={ending}
                    onClick={() => void endChat("manual")}
                    className="ml-auto border border-cream/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/70 hover:border-terracotta hover:text-terracotta disabled:opacity-40"
                  >
                    {ending ? t("ending") : t("endChat")}
                  </button>
                </div>
              )}
            </header>

            {!gated ? (
              <form onSubmit={startGate} className="flex flex-1 flex-col gap-3 overflow-auto px-4 py-4">
                {endedNotice ? (
                  <p className="border border-sage/30 bg-sage/10 px-3 py-2 text-sm text-sage">
                    {endedNotice === "idle" ? t("endedIdle") : t("endedManual")}
                  </p>
                ) : null}
                <p className="text-sm leading-relaxed text-cream/75">{t("gateIntro")}</p>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light">{t("nameLabel")}</span>
                  <input
                    required
                    value={gateName}
                    onChange={(event) => setGateName(event.target.value)}
                    autoComplete="name"
                    className="mt-1 w-full border border-cream/15 bg-charcoal px-3 py-2.5 text-sm text-cream outline-none focus:border-sage"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light">{t("emailLabel")}</span>
                  <input
                    required
                    type="email"
                    value={gateEmail}
                    onChange={(event) => setGateEmail(event.target.value)}
                    autoComplete="email"
                    className="mt-1 w-full border border-cream/15 bg-charcoal px-3 py-2.5 text-sm text-cream outline-none focus:border-sage"
                  />
                </label>
                {gateError ? <p className="text-sm text-terracotta">{gateError}</p> : null}
                <button type="submit" disabled={gating} className="btn-signal mt-auto w-full py-3 text-sm">
                  {gating ? "…" : t("start")}
                </button>
                <p className="text-xs leading-relaxed text-cream/45">{t("privacy")}</p>
              </form>
            ) : (
              <>
                {mode === "voice" && (
                  <div className="border-b border-cream/10 px-4 py-3">
                    <VoiceWaveform
                      analyser={analyser}
                      active={voiceState === "listening" || voiceState === "speaking"}
                      tone={waveformTone}
                    />
                    <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-stone-light">
                      {voiceState === "listening"
                        ? t("listening")
                        : voiceState === "speaking"
                          ? t("speaking")
                          : voiceState === "thinking"
                            ? t("thinking")
                            : t("statusIdle")}
                    </p>
                  </div>
                )}

                <div ref={listRef} className="flex-1 space-y-3 overflow-auto px-4 py-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-terracotta text-richblack"
                            : "border border-cream/10 bg-charcoal text-cream/90"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        {msg.citations && msg.citations.length > 0 ? (
                          <p className="mt-2 space-x-2 font-mono text-[10px] uppercase tracking-[0.14em] text-sage">
                            {t("citations")}:{" "}
                            {msg.citations.map((cite) => (
                              <a key={cite.url} href={cite.url} className="underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
                                {cite.title}
                              </a>
                            ))}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  {busy && mode === "text" ? (
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage">{t("thinking")}</p>
                  ) : null}
                </div>

                <div className="border-t border-cream/10 p-3">
                  {mode === "voice" ? (
                    <button
                      type="button"
                      disabled={!token || voiceState === "thinking" || voiceState === "speaking" || (busy && voiceState !== "listening")}
                      onClick={() => (voiceState === "listening" ? stopAndSendVoice() : startListening())}
                      className={`flex w-full items-center justify-center gap-2 py-3 font-heading text-sm ${
                        voiceState === "listening" ? "bg-terracotta text-richblack" : "bg-sage text-richblack"
                      }`}
                    >
                      {voiceState === "listening" ? t("voiceStop") : t("voice")}
                    </button>
                  ) : (
                    <form
                      className="flex gap-2"
                      onSubmit={(event) => {
                        event.preventDefault();
                        void sendText();
                      }}
                    >
                      <input
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        placeholder={t("placeholder")}
                        disabled={ending}
                        className="min-w-0 flex-1 border border-cream/15 bg-charcoal px-3 py-2.5 text-sm text-cream outline-none focus:border-sage"
                      />
                      <button type="submit" disabled={ending || busy || !input.trim()} className="bg-terracotta px-3 text-sm font-heading text-richblack disabled:opacity-40">
                        {t("send")}
                      </button>
                    </form>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={t("launcherLabel")}
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-12 w-12 items-center justify-center border border-sage/40 bg-charcoal text-sage shadow-lg shadow-sage/20 sm:h-14 sm:w-14"
      >
        <span className="pointer-events-none absolute inset-0 -z-10 bg-sage/20 motion-safe:animate-ping" aria-hidden="true" />
        {open ? (
          <span className="font-heading text-lg">✕</span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M4 6h16v10H8l-4 4V6z" />
            <path d="M8 10h8M8 13h5" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
