import type { BlogFaqItem } from "@/lib/content/blog-data";

export function BlogKeyTakeaways({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <aside className="mb-8 border border-[#050505]/10 bg-[#f8fafc] px-5 py-5 md:px-6">
      <p className="text-sm font-bold text-[#050505]">Key takeaways</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-sm leading-relaxed text-[#050505]/78"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#050a30]" />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function BlogFaqSection({ faqs }: { faqs: BlogFaqItem[] }) {
  if (!faqs.length) return null;
  return (
    <section className="mt-12 border-t border-[#050505]/10 pt-10">
      <h2 className="text-2xl font-bold text-[#050505]">
        Frequently asked questions
      </h2>
      <dl className="mt-6 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <dt className="font-semibold text-[#050505]">{faq.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-[#050505]/75 md:text-base">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
