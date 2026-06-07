export function serviceLink(href: string, anchor?: string) {
  return anchor ? `${href}#${anchor}` : href;
}
