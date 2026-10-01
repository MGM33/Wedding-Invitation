import { createFileRoute } from "@tanstack/react-router";
import { InvitationPage } from "@/components/wedding/InvitationPage";
import { wedding } from "@/config/wedding";
import { rsvpService } from "@/services/rsvpService";

const title = `${wedding.bride.firstName} & ${wedding.groom.firstName} — Your Invitation`;
const description = `A personal invitation — ${wedding.dateLabel.en}`;

export const Route = createFileRoute("/invite/$token")({
  loader: async ({ params }) => ({ guest: await rsvpService.getGuestByToken(params.token) }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Invite,
});

function Invite() {
  const { guest } = Route.useLoaderData();
  const { token } = Route.useParams();
  return <InvitationPage guest={{ name: guest?.name ?? null, token }} />;
}
