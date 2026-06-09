import { defineField, defineType } from "sanity";

export const richCta = defineType({
  name: "richCta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      title: "Expanded content",
      description: "Shown when the reader opens the CTA panel",
    }),
    defineField({
      name: "bullets",
      type: "array",
      of: [{ type: "string" }],
      title: "Trust bullets",
      description: "Short proof points shown in the expanded panel",
    }),
    defineField({
      name: "buttonLabel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "actionType",
      type: "string",
      title: "Button action",
      options: {
        list: [
          { title: "Open contact form", value: "contact" },
          { title: "Go to link", value: "link" },
        ],
        layout: "radio",
      },
      initialValue: "contact",
    }),
    defineField({
      name: "buttonUrl",
      type: "string",
      title: "Button URL",
      description: "Used when action is Go to link (internal or external)",
      hidden: ({ parent }) => parent?.actionType !== "link",
    }),
    defineField({
      name: "defaultExpanded",
      type: "boolean",
      title: "Show expanded by default",
      initialValue: false,
    }),
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "primary" },
          { title: "Dark", value: "dark" },
        ],
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: { headline: "headline", actionType: "actionType" },
    prepare({ headline, actionType }) {
      return {
        title: "CTA",
        subtitle: `${headline ?? ""} · ${actionType === "link" ? "Link" : "Contact"}`,
      };
    },
  },
});
