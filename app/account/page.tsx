import { AccountForm } from "@/components/forms/AccountForm";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Account",
  description: "Wool & Loom account sign-in is not open yet. This page is not indexed.",
  path: "/account",
  index: false,
});

export default function AccountPage() {
  return (
    <Container className="py-10">
      <h1 className="font-serif text-5xl">Account</h1>
      <p className="mt-4 max-w-xl">Order history and saved quotes will live here. For now, leave an email and we will use it when sign-in opens. Nothing is sent to a server.</p>
      <AccountForm />
    </Container>
  );
}
