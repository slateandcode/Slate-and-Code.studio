/* One schema.org block, rendered into the server HTML so crawlers read it
   without running any script. "<" is escaped so no string in the data can
   close the tag early. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
