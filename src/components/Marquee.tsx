type Props = {
  items: string[];
};

/**
 * Full-bleed ticker strip. The track holds two copies of the row and
 * slides -50% on a loop (see .marquee-track in globals.css); edges fade
 * into the page background. Static under reduced motion.
 */
export default function Marquee({ items }: Props) {
  const Row = ({ hidden = false }: { hidden?: boolean }) => (
    <div aria-hidden={hidden} className="flex w-max shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="micro whitespace-nowrap px-8 text-fog">{t}</span>
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/50" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-pit/60 py-4">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
