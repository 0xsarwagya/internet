import { Fragment } from "react";

export type CompatibilityRow = {
  runtime: string;
  adapter: string;
  request: string;
  connect: string;
  read: string;
  write: string;
  notify: string;
  note?: string;
};

const COLUMNS = [
  ["runtime", "Runtime"],
  ["adapter", "Adapter"],
  ["request", "Request"],
  ["connect", "Connect"],
  ["read", "Read"],
  ["write", "Write"],
  ["notify", "Notify"],
] as const;

export function CompatibilityMatrix({ rows }: { rows: CompatibilityRow[] }) {
  return (
    <figure className="overflow-x-auto">
      <table className="w-full border-collapse font-mono text-[12px]">
        <thead>
          <tr>
            {COLUMNS.map(([, label]) => (
              <th
                key={label}
                className="label border-b border-ink/20 px-3 py-2 text-left font-normal"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Fragment key={`${row.runtime}-${row.adapter}`}>
              <tr>
                {COLUMNS.map(([key]) => (
                  <td
                    key={key}
                    className="border-b border-ink/10 px-3 py-3 text-ink/80"
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
              {row.note ? (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
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
