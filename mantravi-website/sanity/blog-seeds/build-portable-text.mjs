/** Converts simplified section arrays into Sanity Portable Text blocks. */

let seq = 0;
function uid(prefix) {
  seq += 1;
  return `${prefix}-${seq}`;
}

function textBlock(style, text, key) {
  return {
    _type: "block",
    _key: key ?? uid(style),
    style,
    markDefs: [],
    children: [
      { _type: "span", _key: uid("span"), text, marks: [] },
    ],
  };
}

function linkBlock(parts, key) {
  const markDefs = [];
  const children = parts.map((part, i) => {
    if (typeof part === "string") {
      return { _type: "span", _key: uid(`span-${i}`), text: part, marks: [] };
    }
    const markKey = uid("link");
    markDefs.push({
      _key: markKey,
      _type: "link",
      href: part.href,
      blank: part.blank ?? false,
    });
    return {
      _type: "span",
      _key: uid(`span-${i}`),
      text: part.text,
      marks: [markKey],
    };
  });
  return {
    _type: "block",
    _key: key ?? uid("p"),
    style: "normal",
    markDefs,
    children,
  };
}

export function buildPortableText(sections) {
  seq = 0;
  const blocks = [];

  for (const section of sections) {
    switch (section.type) {
      case "p":
        blocks.push(textBlock("normal", section.text));
        break;
      case "h2":
        blocks.push(textBlock("h2", section.text));
        break;
      case "h3":
        blocks.push(textBlock("h3", section.text));
        break;
      case "linkP":
        blocks.push(linkBlock(section.parts));
        break;
      case "table":
        blocks.push({
          _type: "richTable",
          _key: uid("table"),
          caption: section.caption ?? "",
          headers: section.headers,
          rows: section.rows.map((cells) => ({ cells })),
        });
        break;
      case "callout":
        blocks.push({
          _type: "richCallout",
          _key: uid("callout"),
          variant: section.variant ?? "tip",
          title: section.title ?? "",
          body: section.body,
        });
        break;
      case "cta":
        blocks.push({
          _type: "richCta",
          _key: uid("cta"),
          eyebrow: section.eyebrow ?? "",
          headline: section.headline,
          body: section.body ?? "",
          bullets: section.bullets ?? [],
          buttonLabel: section.buttonLabel,
          actionType: section.actionType ?? "contact",
          buttonUrl: section.buttonUrl,
          defaultExpanded: section.defaultExpanded ?? false,
          variant: section.variant ?? "primary",
        });
        break;
      default:
        break;
    }
  }

  return blocks;
}
