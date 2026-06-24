"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

type ContactFormProps = {
  className?: string;
  onSuccess?: () => void;
};

export function ContactForm({ className, onSuccess }: ContactFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmitError(
        "Form is not configured. Please try again later or email us directly.",
      );
      return;
    }

    const formData = new FormData();
    formData.append("access_key", accessKey);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("company", data.company ?? "");
    formData.append("message", data.message);
    formData.append("from_url", window.location.href);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed");
      }

      setSubmitSuccess(true);
      reset();
      onSuccess?.();
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or email us directly.",
      );
    }
  };

  if (submitSuccess) {
    return (
      <div
        className={`rounded-xl border border-primary/30 bg-primary/10 p-6 text-center ${className ?? ""}`}
      >
        <p className="font-semibold text-primary">
          Thank you! We&apos;ll be in touch shortly.
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Our team typically responds within two business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className ?? ""}`}
    >
      {submitError ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {submitError}
        </p>
      ) : null}
      <div>
        <Input
          dark
          placeholder={contactForm.namePlaceholder}
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
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
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          dark
          placeholder={contactForm.phonePlaceholder}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
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
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
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
  );
}
