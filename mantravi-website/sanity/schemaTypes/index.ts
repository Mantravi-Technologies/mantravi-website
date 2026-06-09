import { defineField, defineType } from "sanity";
import {
  richBodyMembers,
  richCallout,
  richCta,
  richQuote,
  richTable,
} from "./blocks";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", type: "string", title: "Company Name" }),
    defineField({ name: "tagline", type: "string", title: "Tagline" }),
    defineField({ name: "email", type: "string", title: "Contact Email" }),
    defineField({ name: "phone", type: "string", title: "Phone" }),
    defineField({
      name: "socialLinks",
      type: "object",
      fields: [
        { name: "linkedin", type: "url" },
        { name: "twitter", type: "url" },
        { name: "instagram", type: "url" },
      ],
    }),
  ],
});

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "text" }),
    defineField({ name: "image", type: "image" }),
  ],
});

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
  ],
});

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "featuredImage", type: "image" }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }] }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "body", type: "array", title: "Body", of: richBodyMembers }),
    defineField({ name: "featured", type: "boolean", title: "Featured on blog hero" }),
    defineField({ name: "featuredRank", type: "number", title: "Featured rank (1 = primary)" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["published", "draft"] },
      initialValue: "published",
    }),
    defineField({ name: "readTime", type: "string" }),
    defineField({ name: "seoTitle", type: "string", title: "SEO title (≤60 chars)" }),
    defineField({ name: "seoDescription", type: "text", title: "SEO description (≤160 chars)" }),
    defineField({ name: "focusKeyword", type: "string", title: "Focus keyword" }),
    defineField({
      name: "keyTakeaways",
      type: "array",
      of: [{ type: "string" }],
      title: "Key takeaways (GEO)",
    }),
    defineField({
      name: "faq",
      type: "array",
      title: "FAQ (GEO + schema)",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string" },
            { name: "answer", type: "text" },
          ],
        },
      ],
    }),
    defineField({ name: "updatedAt", type: "datetime", title: "Last updated" }),
  ],
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fieldsets: [
    {
      name: "placementImages",
      title: "Card & placement images",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "industry", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "region", type: "string" }),
    defineField({ name: "summary", type: "text" }),
    defineField({
      name: "featuredImage",
      type: "image",
      title: "Featured image (hero)",
      description:
        "Case study page hero, SEO/social preview, and default fallback for all cards below.",
    }),
    defineField({
      name: "homepageCardImage",
      type: "image",
      title: "Homepage carousel image",
      description: "Homepage portfolio showcase card. Falls back to Featured image.",
      fieldset: "placementImages",
    }),
    defineField({
      name: "listingImage",
      type: "image",
      title: "Portfolio listing image",
      description: "/portfolio grid cards. Falls back to Featured image.",
      fieldset: "placementImages",
    }),
    defineField({
      name: "serviceCardImage",
      type: "image",
      title: "Service page card image",
      description: "Pinned case study cards on service pages. Falls back to Featured image.",
      fieldset: "placementImages",
    }),
    defineField({
      name: "relatedCardImage",
      type: "image",
      title: "Related / recommended image",
      description:
        "“Explore more work” cards on case study pages. Falls back to Featured image.",
      fieldset: "placementImages",
    }),
    defineField({ name: "metrics", type: "array", of: [{ type: "object", fields: [{ name: "value", type: "string" }, { name: "label", type: "string" }] }] }),
    defineField({ name: "heroMetrics", type: "array", of: [{ type: "object", fields: [{ name: "value", type: "string" }, { name: "label", type: "string" }] }] }),
    defineField({ name: "highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "challenge", type: "text" }),
    defineField({ name: "solution", type: "text" }),
    defineField({ name: "gradient", type: "string", title: "Tailwind gradient classes" }),
    defineField({ name: "projectUrl", type: "url", title: "Live project URL" }),
    defineField({ name: "body", type: "array", title: "Body", of: richBodyMembers }),
    defineField({ name: "technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({ name: "showOnHomepage", type: "boolean", title: "Show on homepage carousel" }),
    defineField({ name: "homepageOrder", type: "number", title: "Homepage carousel order" }),
    defineField({
      name: "pinnedOnServices",
      type: "array",
      of: [{ type: "string" }],
      title: "Pinned service slugs",
      description: "e.g. product-engineering, ai-data, consulting, qa-it",
    }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["published", "draft"] },
      initialValue: "published",
    }),
    defineField({ name: "order", type: "number", title: "Legacy sort order" }),
  ],
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "bio", type: "text" }),
    defineField({ name: "photo", type: "image" }),
    defineField({ name: "order", type: "number" }),
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text" }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "type", type: "string", options: { list: ["client", "employee"] } }),
  ],
});

export const award = defineType({
  name: "award",
  title: "Award",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "image", type: "image" }),
  ],
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string" }),
    defineField({ name: "answer", type: "text" }),
    defineField({ name: "order", type: "number" }),
  ],
});

export const schemaTypes = [
  siteSettings,
  author,
  category,
  richTable,
  richCallout,
  richCta,
  richQuote,
  blogPost,
  caseStudy,
  teamMember,
  testimonial,
  award,
  faq,
];
