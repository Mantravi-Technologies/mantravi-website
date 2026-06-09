import { defineField, defineType } from "sanity";

export const richTable = defineType({
  name: "richTable",
  title: "Table",
  type: "object",
  fields: [
    defineField({ name: "caption", type: "string", title: "Caption (optional)" }),
    defineField({
      name: "headers",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "rows",
      type: "array",
      of: [
        {
          type: "object",
          name: "tableRow",
          fields: [
            {
              name: "cells",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { headers: "headers" },
    prepare({ headers }) {
      return {
        title: "Table",
        subtitle: headers?.slice(0, 3).join(" · ") || "No headers",
      };
    },
  },
});
