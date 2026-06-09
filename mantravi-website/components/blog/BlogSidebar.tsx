import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { blogCategories } from "@/lib/content/blog-data";

export function BlogSidebar() {
  return (
    <aside className="blog-sidebar space-y-8 lg:sticky lg:top-28 lg:self-start">
      <Card variant="light">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#050505]/70">
          Categories
        </h3>
        <ul className="mt-4 space-y-2">
          {blogCategories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/blog/category/${cat.slug}`}
                className="text-sm text-[#050505]/65 transition-colors hover:text-primary"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </Card>
      <Card variant="light">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#050505]/70">
          Newsletter
        </h3>
        <p className="mt-2 text-sm text-[#050505]/65">
          Insights on engineering, growth, and AI — twice a month.
        </p>
        <NewsletterForm />
      </Card>
    </aside>
  );
}
