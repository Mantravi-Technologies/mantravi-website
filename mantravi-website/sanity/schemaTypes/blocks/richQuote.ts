import { defineField, defineType } from "sanity";

export const richQuote = defineType({
  name: "richQuote",
  title: "Quote",
  type: "object",
  fields: [
    defineField({ name: "quote", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "attribution", type: "string", title: "Attribution" }),
    defineField({ name: "role", type: "string", title: "Role / Company" }),
  ],
  preview: {
    select: { quote: "quote", attribution: "attribution" },
    prepare({ quote, attribution }) {
      return {
        title: attribution || "Quote",
        subtitle: quote?.slice(0, 60),
      };
    },
  },
});
