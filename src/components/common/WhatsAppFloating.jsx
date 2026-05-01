import { useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "8801338338537";

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);

  const presets = ["Attar price?", "Best perfume?", "Delivery info"];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

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
    <div ref={containerRef} className="fixed bottom-[90px] right-4 z-50 flex flex-col items-end md:hidden">
      <div
        className={`mb-3 w-[260px] rounded-xl border border-(--color-primary)/12 bg-white p-3 shadow-[0_16px_34px_rgba(23,33,25,0.18)] transition-all duration-200 ease-out origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-(--color-primary)/65">Quick message</p>
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

        <div className="mb-3 flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setMessage(preset)}
              className="rounded-full border border-(--color-primary)/10 bg-(--color-bg) px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-(--color-primary)/75 transition-colors duration-200 md:hover:border-(--color-accent) md:hover:text-(--color-accent)"
            >
              {preset}
            </button>
          ))}
        </div>

        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type your message..."
          className="w-full rounded-lg border border-(--color-primary)/16 bg-white px-3 py-2 text-sm text-(--color-primary) outline-none transition-colors duration-200 focus:border-(--color-accent)"
        />

        <button
          type="button"
          onClick={sendMessage}
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-[#25D366] px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-200 md:hover:-translate-y-0.5"
        >
          Send
        </button>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="whatsapp-float-attention inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#1ebe57] px-4 py-2 text-white shadow-[0_14px_28px_rgba(0,0,0,0.22)] transition-transform duration-300 md:hover:scale-105"
        aria-label="Open WhatsApp chat"
      >
        <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden="true">
          <path
            fill="#ffffff"
            d="M24 8.02c-8.82 0-15.98 7.16-15.98 15.98 0 2.8.72 5.53 2.09 7.94L8 40l8.23-2.15a15.9 15.9 0 0 0 7.77 2.02h.01c8.82 0 15.98-7.16 15.98-15.98 0-4.26-1.66-8.27-4.67-11.28A15.87 15.87 0 0 0 24 8.02Zm0 28.14h-.01a13.22 13.22 0 0 1-6.73-1.84l-.48-.29-4.88 1.27 1.3-4.75-.31-.49a13.22 13.22 0 0 1-2.02-7.1c0-7.3 5.94-13.24 13.24-13.24a13.13 13.13 0 0 1 9.36 3.88 13.13 13.13 0 0 1 3.88 9.36c0 7.3-5.94 13.24-13.24 13.24Zm7.69-9.95c-.42-.21-2.46-1.22-2.84-1.36-.38-.15-.66-.21-.93.21-.27.42-1.07 1.36-1.31 1.64-.24.28-.49.31-.91.1-.42-.21-1.77-.65-3.37-2.08-1.24-1.1-2.07-2.47-2.31-2.89-.24-.42-.02-.65.18-.85.19-.19.42-.49.63-.73.21-.24.28-.42.42-.7.14-.28.07-.52-.03-.73-.1-.21-.93-2.24-1.27-3.07-.34-.82-.68-.71-.93-.72h-.79c-.28 0-.73.1-1.11.52-.38.42-1.46 1.43-1.46 3.49s1.49 4.06 1.7 4.34c.21.28 2.93 4.46 7.1 6.25.99.43 1.77.69 2.37.88.99.31 1.91.27 2.63.16.8-.12 2.46-1 2.81-1.95.34-.94.34-1.74.24-1.91-.1-.17-.38-.28-.8-.49Z"
          />
        </svg>
        <span className="text-xs font-semibold tracking-wide">Chat with us</span>
      </button>
    </div>
  );
}
