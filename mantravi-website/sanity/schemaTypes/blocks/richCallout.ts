import { defineField, defineType } from "sanity";

export const richCallout = defineType({
  name: "richCallout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Tip", value: "tip" },
          { title: "Insight", value: "insight" },
          { title: "Warning", value: "warning" },
        ],
      },
      initialValue: "insight",
    }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "body", type: "text" }),
  ],
  preview: {
    select: { title: "title", variant: "variant" },
    prepare({ title, variant }) {
      return { title: title || "Callout", subtitle: variant };
    },
  },
});
