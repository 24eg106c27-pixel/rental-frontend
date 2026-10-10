import { useState } from "react";

// sidebar with tabs, used by the owner, tenant and admin dashboards
export default function Dashboard({ title, tabs, notice }) {
  const [active, setActive] = useState(tabs[0].key);
  const Current = tabs.find((t) => t.key === active).component;

  return (
    <div className="dash">
      <aside>
        <h2>{title}</h2>
        {tabs.map((t) => (
          <button key={t.key} className={t.key === active ? "active" : ""} onClick={() => setActive(t.key)}>
            {t.label}
          </button>
        ))}
      </aside>
      <main>
        {notice}
        <Current />
      </main>
    </div>
  );
}
