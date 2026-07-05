import { Fragment } from "react";

export type CompatibilityRow = Record<string, string | undefined> & {
  note?: string;
};

export type CompatibilityColumn = {
  key: string;
  label: string;
};

// The original vocabulary (agnostic-web-ble) stays the default so existing
// content renders unchanged; projects with different semantics pass their
// own columns.
const DEFAULT_COLUMNS: CompatibilityColumn[] = [
  { key: "runtime", label: "Runtime" },
  { key: "adapter", label: "Adapter" },
  { key: "request", label: "Request" },
  { key: "connect", label: "Connect" },
  { key: "read", label: "Read" },
  { key: "write", label: "Write" },
  { key: "notify", label: "Notify" },
];

export function CompatibilityMatrix({
  rows,
  columns = DEFAULT_COLUMNS,
}: {
  rows: CompatibilityRow[];
  columns?: CompatibilityColumn[];
}) {
  return (
    <figure className="overflow-x-auto">
      <table className="w-full border-collapse font-mono text-[12px]">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="label border-b border-ink/20 px-3 py-2 text-left font-normal"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Fragment key={columns.map((column) => row[column.key]).join("-") || index}>
              <tr>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="border-b border-ink/10 px-3 py-3 text-ink/80"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
              {row.note ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="border-b border-ink/10 px-3 pb-3 pt-0 text-[11px] italic text-stone"
                  >
                    {row.note}
                  </td>
                </tr>
              ) : null}
            </Fragment>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
