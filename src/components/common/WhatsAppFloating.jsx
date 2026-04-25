import { useState } from "react";

const WHATSAPP_NUMBER = "8801338338537";

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    const defaultMessage = "Assalamu Alaikum, I want to know more about your fragrances.";
    const outgoingMessage = trimmedMessage || defaultMessage;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(outgoingMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );

    setIsOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:right-5">
      {isOpen ? (
        <div className="w-74 rounded-2xl border border-(--color-primary)/14 bg-(--color-bg) p-4 shadow-[0_12px_30px_rgba(23,33,25,0.16)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.18em] text-(--color-primary)/65">Message Us</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-(--color-primary)/70 transition-colors duration-300 hover:text-(--color-accent)"
              aria-label="Close WhatsApp popup"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type your message"
            className="w-full rounded-xl border border-(--color-primary)/18 bg-(--color-bg) px-3 py-2 text-sm text-(--color-primary) outline-none transition-colors duration-300 focus:border-(--color-accent)"
          />

          <button
            type="button"
            onClick={sendMessage}
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-(--color-primary) px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-(--color-accent) transition-all duration-300 hover:-translate-y-0.5"
          >
            Send
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="whatsapp-float-attention mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-2 shadow-[0_14px_28px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-105"
        aria-label="Open WhatsApp chat"
      >
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
          <path
            fill="#FFFFFF"
            d="M19.11 17.35c-.25-.13-1.47-.73-1.7-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.3.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.76 2.68 4.27 3.76.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.17.21-.57.21-1.06.15-1.16-.06-.11-.23-.17-.48-.3Z"
          />
          <path
            fill="#FFFFFF"
            d="M16 5.33c-5.88 0-10.67 4.78-10.67 10.67 0 1.88.5 3.73 1.45 5.36L5.33 26.67l5.43-1.42c1.58.86 3.36 1.31 5.24 1.31h.01c5.88 0 10.67-4.78 10.67-10.67 0-2.85-1.11-5.53-3.12-7.54-2.01-2.01-4.69-3.12-7.56-3.12Zm0 19.39h-.01c-1.62 0-3.2-.43-4.58-1.24l-.33-.2-3.22.84.86-3.14-.21-.32a8.85 8.85 0 0 1-1.35-4.72c0-4.89 3.98-8.87 8.88-8.87 2.37 0 4.59.92 6.27 2.6a8.8 8.8 0 0 1 2.59 6.26c0 4.89-3.98 8.88-8.88 8.88Z"
          />
        </svg>
        <span className="pr-1 text-xs font-semibold tracking-wide text-white">Chat with us</span>
      </button>
    </div>
  );
}
