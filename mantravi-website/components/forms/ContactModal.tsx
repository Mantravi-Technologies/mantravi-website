"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, X } from "lucide-react";
import { useContact } from "@/components/providers/ContactProvider";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Card";
import { contactForm } from "@/lib/content/site-data";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(5, "Phone is required"),
  company: z.string().optional(),
  message: z.string().min(10, "Please describe your project"),
});

type FormData = z.infer<typeof schema>;

export function ContactModal() {
  const { isOpen, closeContact } = useContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeContact]);

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Contact form:", data);
    reset();
  };

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

          {isSubmitSuccessful ? (
            <div className="mt-8 rounded-xl border border-primary/30 bg-primary/10 p-6 text-center">
              <p className="font-semibold text-primary">
                Thank you! We&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <Input
                  dark
                  placeholder={contactForm.namePlaceholder}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  dark
                  type="email"
                  placeholder={contactForm.emailPlaceholder}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  dark
                  placeholder={contactForm.phonePlaceholder}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  dark
                  placeholder={contactForm.companyPlaceholder}
                  {...register("company")}
                />
              </div>
              <div>
                <Textarea
                  dark
                  placeholder={contactForm.messagePlaceholder}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : contactForm.submitLabel}
              </Button>
            </form>
          )}
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
