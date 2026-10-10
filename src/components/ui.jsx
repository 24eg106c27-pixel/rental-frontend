export function Badge({ value }) {
  return <span className={`badge ${value}`}>{String(value).replaceAll("_", " ")}</span>;
}

export function Message({ text, error }) {
  return text ? <p className={error ? "msg error" : "msg"}>{text}</p> : null;
}

export function Empty({ rows, text = "No records found." }) {
  return rows.length === 0 ? <p className="muted empty">{text}</p> : null;
}

export const PROPERTY_TYPES = ["APARTMENT", "HOUSE", "VILLA", "PG", "COMMERCIAL"];
