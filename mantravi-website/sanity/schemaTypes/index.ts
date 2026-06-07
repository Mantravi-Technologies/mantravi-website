import { defineField, defineType } from "sanity";

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
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "featured", type: "boolean" }),
  ],
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "industry", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "region", type: "string" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "featuredImage", type: "image" }),
    defineField({ name: "metrics", type: "array", of: [{ type: "object", fields: [{ name: "value", type: "string" }, { name: "label", type: "string" }] }] }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({ name: "order", type: "number" }),
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
  blogPost,
  caseStudy,
  teamMember,
  testimonial,
  award,
  faq,
];
