export function FocusStrip({ items }: { items: string[] }) {
  return (
    <div className="focus-strip">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
