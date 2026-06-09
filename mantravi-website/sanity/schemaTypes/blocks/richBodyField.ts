import { defineArrayMember } from "sanity";

export const richBodyMembers = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
    ],
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
    marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: "External link",
          fields: [
            {
              name: "href",
              type: "url",
              validation: (Rule) =>
                Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
            },
            {
              name: "blank",
              type: "boolean",
              title: "Open in new tab",
              initialValue: true,
            },
          ],
        },
        {
          name: "internalLink",
          type: "object",
          title: "Internal link",
          fields: [
            {
              name: "reference",
              type: "reference",
              to: [{ type: "blogPost" }, { type: "caseStudy" }],
            },
          ],
        },
      ],
    },
  }),
  defineArrayMember({
    type: "image",
    options: { hotspot: true },
    fields: [
      { name: "alt", type: "string", title: "Alt text" },
      { name: "caption", type: "string", title: "Caption" },
    ],
  }),
  defineArrayMember({ type: "richTable" }),
  defineArrayMember({ type: "richCallout" }),
  defineArrayMember({ type: "richCta" }),
  defineArrayMember({ type: "richQuote" }),
];
