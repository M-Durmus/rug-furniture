"use client";

import { InquiryForm } from "@/components/forms/InquiryForm";
import { Modal } from "@/components/ui/Modal";

export default function QuoteModal({
  intent,
  city,
  showDimensions = false,
  onClose,
}: {
  intent: string;
  city?: string;
  showDimensions?: boolean;
  onClose: () => void;
}) {
  return (
    <Modal title="Request a quote" onClose={onClose}>
      <p className="mb-4 text-sm">Tell us the size in feet and inches. We reply by email. This form does not place an order or take payment.</p>
      <InquiryForm intent={intent} city={city} showDimensions={showDimensions} />
    </Modal>
  );
}
