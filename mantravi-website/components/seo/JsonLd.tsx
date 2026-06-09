export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdMulti({
  schemas,
}: {
  schemas: (Record<string, unknown> | null)[];
}) {
  return (
    <>
      {schemas.filter(Boolean).map((schema, i) => (
        <JsonLd key={i} data={schema!} />
      ))}
    </>
  );
}
