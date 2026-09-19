"use client";

import { Gift } from "lucide-react";
import { GiftDetails } from "@/lib/types";
import { useLang } from "@/lib/language";

export default function GiftDetailsForm({
  value,
  onChange,
}: {
  value: GiftDetails;
  onChange: (val: GiftDetails) => void;
}) {
  const { t } = useLang();
  const update = (patch: Partial<GiftDetails>) => onChange({ ...value, ...patch });

  return (
    <div className="rounded-soft border border-line bg-cream p-5">
      <div className="mb-4 flex items-center gap-2">
        <Gift size={16} className="text-teddy" />
        <p className="text-sm font-semibold text-cocoa">{t("gift.heading")}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="recipient-name" className="label-bx">
          {t("gift.recipient")}
        </label>
        <input
          id="recipient-name"
          type="text"
          value={value.recipientName}
          onChange={(e) => update({ recipientName: e.target.value })}
          placeholder={t("gift.recipientPlaceholder")}
          className="input-bx"
          maxLength={60}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cake-message" className="label-bx">
          {t("gift.cakeMessage")}
        </label>
        <input
          id="cake-message"
          type="text"
          value={value.cakeMessage}
          onChange={(e) => update({ cakeMessage: e.target.value })}
          placeholder={t("gift.cakeMessagePlaceholder")}
          className="input-bx"
          maxLength={40}
        />
        <p className="mt-1 text-right text-xs text-taupe">{value.cakeMessage.length}/40</p>
      </div>

      <label className="mb-4 flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={value.isGift}
          onChange={(e) => update({ isGift: e.target.checked })}
          className="h-4 w-4 rounded border-line text-teddy focus:ring-teddy"
        />
        <span className="text-sm text-cocoa">{t("gift.isGift")}</span>
      </label>

      {value.isGift && (
        <div className="mb-4">
          <label htmlFor="gift-card-message" className="label-bx">
            {t("gift.cardMessage")}
          </label>
          <textarea
            id="gift-card-message"
            value={value.giftCardMessage}
            onChange={(e) => update({ giftCardMessage: e.target.value })}
            placeholder={t("gift.cardMessagePlaceholder")}
            rows={3}
            className="input-bx resize-none"
            maxLength={200}
          />
        </div>
      )}

      <div>
        <label htmlFor="special-request" className="label-bx">
          {t("gift.specialRequest")}
        </label>
        <textarea
          id="special-request"
          value={value.specialRequest}
          onChange={(e) => update({ specialRequest: e.target.value })}
          placeholder={t("gift.specialRequestPlaceholder")}
          rows={2}
          className="input-bx resize-none"
          maxLength={200}
        />
      </div>
    </div>
  );
}
