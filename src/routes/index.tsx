import { createFileRoute } from "@tanstack/react-router";
import { InvitationPage } from "@/components/wedding/InvitationPage";
import { wedding } from "@/config/wedding";

const siteUrl = "https://meriham-peter-wedding-invitation.vercel.app";
const title = `${wedding.groom.firstName} & ${wedding.bride.firstName} Wedding Invitation`;
const description = `We're Getting Married — ${wedding.dateLabel.en}`;
const ogImage = `${siteUrl}/og-image.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: siteUrl },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
  }),
  component: InvitationPage,
});
