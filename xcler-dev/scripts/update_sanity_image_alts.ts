/**
 * Updates Sanity image alt text for SEO (team + blog).
 * Requires SANITY_API_WRITE_TOKEN in env.
 *
 * Run: npx tsx scripts/update_sanity_image_alts.ts
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fw842vw9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN. Add a Sanity write token to xcler-dev/.env, then re-run."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-13",
  token,
  useCdn: false,
});

const TEAM_ALTS: Record<string, string> = {
  "musharraf aziz":
    "Musharraf Aziz, XCLER AI automation engineer for chatbots, agents and workflows",
  "abeel mehr": "Abeel Mehr, XCLER web and app development lead for Next.js platforms",
  "mehru seemab":
    "Mehru Seemab, XCLER WordPress and Shopify commerce specialist",
};

async function main() {
  const team = await client.fetch<
    Array<{ _id: string; name?: string; image?: { alt?: string } }>
  >(`*[_type == "teamMember"]{_id, name, "image": image}`);

  for (const member of team) {
    const key = (member.name || "").trim().toLowerCase();
    const alt = TEAM_ALTS[key] || `${member.name}, XCLER team — AI automation agency`;
    await client
      .patch(member._id)
      .set({ "image.alt": alt })
      .commit({ autoGenerateArrayKeys: true });
    console.log(`team alt updated: ${member.name} -> ${alt}`);
  }

  const posts = await client.fetch<
    Array<{
      _id: string;
      title_en?: string;
      title_de?: string;
      mainImage?: unknown;
      mainImage_en?: unknown;
      mainImage_de?: unknown;
    }>
  >(
    `*[_type == "blogPost"]{_id, title_en, title_de, mainImage, mainImage_en, mainImage_de}`
  );

  for (const post of posts) {
    const enTitle = post.title_en || "XCLER AI automation insight";
    const deTitle = post.title_de || "XCLER KI-Automatisierung Insight";
    const patch = client.patch(post._id);
    let changed = false;

    if (post.mainImage) {
      patch.set({
        "mainImage.alt": `${enTitle} — XCLER AI automation article cover`,
      });
      changed = true;
    }
    if (post.mainImage_en) {
      patch.set({
        "mainImage_en.alt": `${enTitle} — XCLER AI automation article cover`,
      });
      changed = true;
    }
    if (post.mainImage_de) {
      patch.set({
        "mainImage_de.alt": `${deTitle} — XCLER KI-Automatisierung Artikelbild`,
      });
      changed = true;
    }

    if (changed) {
      await patch.commit({ autoGenerateArrayKeys: true });
      console.log(`blog alts updated: ${enTitle}`);
    }
  }

  console.log("Sanity image alt SEO update complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
