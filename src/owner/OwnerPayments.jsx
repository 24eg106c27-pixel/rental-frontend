import { money } from "../api";
import useFetch from "../useFetch";
import { Empty } from "../components/ui";

export default function OwnerPayments() {
  const { data: rows } = useFetch("/owner/payments");
  const total = rows.reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      <h2>Payments Received</h2>
      <p className="muted">Total received: <b>{money(total)}</b></p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Tenant</th><th>Property</th><th>Amount</th><th>Method</th><th>Reference</th></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{p.paymentDate}</td><td>{p.tenant.name}</td><td>{p.rentalRequest.property.title}</td>
                <td>{money(p.amount)}</td><td>{p.method}</td><td>{p.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Empty rows={rows} text="No payments received yet." />
      </div>
    </>
  );
}
