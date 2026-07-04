export function Callout({
  type = "note",
  children,
}: {
  type?: "note" | "warning";
  children: React.ReactNode;
}) {
  const isWarning = type === "warning";
  return (
    <aside
      className={`border-l-2 py-1 pl-6 ${isWarning ? "border-rust/60" : "border-ink/20"}`}
    >
      <p className={`label ${isWarning ? "text-rust" : ""}`}>
        {isWarning ? "Warning" : "Note"}
      </p>
      <div
        className="mt-2 flex flex-col gap-3 font-body text-ink/80 [&_p]:!text-[15px]"
        style={{ fontSize: 15, lineHeight: 1.6 }}
      >
        {children}
      </div>
    </aside>
  );
}
