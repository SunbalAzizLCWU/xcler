---
id: rag-chatbot
slug: rag-chatbot-company-knowledge
slug_en: rag-chatbot-company-knowledge
slug_de: rag-chatbot-unternehmenswissen
title: "RAG Chatbots Explained: How to Build an AI Assistant on Your Company Knowledge"
excerpt: "What retrieval-augmented generation is, how a RAG pipeline works step by step, and the mistakes that make company chatbots give wrong answers."
seoTitle: "RAG Chatbot Explained: Build an AI on Company Knowledge"
seoDescription: "RAG explained for businesses: pipeline, chunking, vector search, citations and the common mistakes when building a company knowledge chatbot."
publishedAt: "2026-09-12T08:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-rag-knowledge-chatbot-cover.webp
coverAlt: "RAG chatbot turning company documents into cited AI answers"
readingTime: 10
tags:
  - RAG
  - retrieval-augmented generation
  - knowledge chatbot
  - vector database
  - AI assistant
  - enterprise search
---

A general-purpose language model knows a lot about the world and nothing about your price list, your return policy or last month's product update. **Retrieval-augmented generation (RAG)** fixes that: before the model answers, the system looks up the relevant passages in your own documents and hands them to the model as context.

The result is an assistant that answers from **your** knowledge, can show where each answer came from, and can be updated by changing documents instead of retraining a model.

![RAG pipeline: documents, chunking, embeddings, vector index, retrieval, LLM answer with citations](/blog/blog-rag-pipeline-diagram.webp)

## How a RAG pipeline works

1. **Collect documents.** PDFs, Confluence or Notion pages, SharePoint, help-centre articles, product data, tickets.
2. **Chunk them.** Split each document into passages of a few hundred words, keeping headings and tables intact.
3. **Create embeddings.** Turn each chunk into a vector — a list of numbers that captures its meaning.
4. **Store them in a vector index** such as Qdrant, PGVector, Pinecone or Weaviate, together with metadata like source, date and access level.
5. **Retrieve.** When a user asks a question, embed the question and fetch the most similar chunks. Good systems combine this with keyword search.
6. **Generate with citations.** Pass the question and retrieved chunks to the language model with instructions to answer only from that context and cite the sources.

## Why RAG instead of fine-tuning?

| | RAG | Fine-tuning |
| --- | --- | --- |
| Update knowledge | Replace a document | Retrain the model |
| Shows sources | Yes | No |
| Handles access rights | Yes, via metadata filters | Hard |
| Cost to change | Low | High |
| Best for | Facts, policies, product data | Style, format, narrow tasks |

For company knowledge, RAG is almost always the right starting point. Fine-tuning is useful later for tone or specialised formats.

## Where RAG projects go wrong

- **Bad chunking.** Splitting a table in half or losing the heading that says which product a paragraph is about. Most "the bot is wrong" complaints start here.
- **Stale sources.** Three versions of the same policy in the index, and the bot quotes the oldest one. You need a sync process and version rules.
- **No access control.** An intern should not get answers from board minutes. Filter retrieval by the user's permissions.
- **No "I don't know".** The model must be allowed — and instructed — to say it cannot find the answer and hand over to a human.
- **No evaluation.** Without a test set of real questions and expected answers, you cannot tell whether a change made things better or worse.

## Good practices we use

- **Hybrid search** (vector plus keyword) for part numbers, names and codes that pure semantic search misses.
- **Reranking** the top results before sending them to the model.
- **Citations in every answer**, linking to the source page or document.
- **A weekly review** of unanswered and low-rated questions, which become new content or fixes.
- **EU hosting** for embeddings, index and model where the data is sensitive.

## Typical use cases

- Customer support assistant that answers from your help centre and hands over to agents.
- Internal assistant for HR policies, IT how-tos and sales playbooks.
- Technical documentation search for field service teams.
- Pre-sales assistant that answers product and compatibility questions.

## FAQ

**Does RAG stop hallucinations completely?**
No, but it reduces them a lot. Strict prompts, citations and an "I don't know" path bring errors down further.

**How many documents can a RAG system handle?**
From a few dozen to millions. The hard part is keeping sources clean and current, not the volume.

**Can it work in German and English?**
Yes. Multilingual embedding models let users ask in one language and retrieve documents written in another.

We build RAG assistants as part of our [AI chatbots and agents](/en/services/ai-chatbots-agents) work, usually on n8n with EU-hosted vector storage. [Tell us which knowledge you want to unlock](/en/contact) and we will outline the pipeline.
