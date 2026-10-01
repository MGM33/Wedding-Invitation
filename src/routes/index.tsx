import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { InvitationPage } from "@/components/wedding/InvitationPage";
import { wedding } from "@/config/wedding";

const title = `${wedding.bride.firstName} & ${wedding.groom.firstName}`;
const description = `We're Getting Married — ${wedding.dateLabel.en}`;

export const Route = createFileRoute("/")({
  validateSearch: z.object({ guest: z.string().optional() }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      // When you have a real absolute image URL, add:
      // { property: "og:image", content: wedding.images.social },
      // { name: "twitter:image", content: wedding.images.social },
    ],
  }),
  component: Index,
});

function Index() {
  const { guest } = Route.useSearch();
  return <InvitationPage guest={{ name: guest ?? null }} />;
}
