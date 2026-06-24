"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useContact } from "@/components/providers/ContactProvider";
import { ContactForm } from "@/components/forms/ContactForm";
import { contactForm } from "@/lib/content/site-data";

export function ContactModal() {
  const { isOpen, closeContact } = useContact();
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setFormKey((key) => key + 1);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeContact]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={closeContact}
        aria-hidden
      />
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#050505] p-8 shadow-2xl shadow-black/50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        data-lenis-prevent
      >
        <div className="grain-overlay opacity-20" aria-hidden="true" />
        <button
          type="button"
          onClick={closeContact}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative">
          <h2
            id="contact-modal-title"
            className="text-2xl font-bold text-white"
          >
            {contactForm.title}
          </h2>
          <p className="mt-2 text-sm text-slate-400">{contactForm.subtitle}</p>
          <ContactForm key={formKey} className="mt-6" />
        </div>
      </div>
    </div>
  );
}

export function FloatingContactButton() {
  const { openContact, isOpen } = useContact();

  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={openContact}
      className="floating-contact-btn"
      aria-label="Get in touch"
    >
      <span className="floating-contact-btn__icon" aria-hidden="true">
        <MessageCircle className="h-4 w-4" />
      </span>
      <span className="floating-contact-btn__label">Get In Touch</span>
    </button>
  );
}
