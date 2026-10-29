import { AccountDesk, type AccountMock } from "@/components/account/AccountDesk";
import { Container } from "@/components/ui/Container";
import mock from "@/data/account-mock.json";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Account",
  description:
    "Wool & Loom orders, favorites, and quotes saved in this browser. This page is not indexed.",
  path: "/account",
  index: false,
});

export default function AccountPage() {
  return (
    <Container className="py-10 pb-16">
      <h1 className="text-h1">Account</h1>
      <AccountDesk mock={mock as AccountMock} />
    </Container>
  );
}
