import { money } from "../api";
import useFetch from "../useFetch";
import { Empty } from "../components/ui";

export default function Transactions() {
  const { data: rows } = useFetch("/admin/payments");
  const total = rows.reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      <h2>Rental Transactions</h2>
      <p className="muted">{rows.length} transaction(s), total <b>{money(total)}</b></p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Tenant</th><th>Property</th><th>Owner</th><th>Amount</th><th>Method</th><th>Reference</th></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{p.paymentDate}</td><td>{p.tenant.name}</td><td>{p.rentalRequest.property.title}</td>
                <td>{p.rentalRequest.property.owner?.name}</td><td>{money(p.amount)}</td><td>{p.method}</td><td>{p.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Empty rows={rows} text="No transactions yet." />
      </div>
    </>
  );
}
