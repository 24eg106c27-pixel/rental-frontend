import { money } from "../api";
import useFetch from "../useFetch";
import { Empty } from "../components/ui";

export default function MyPayments() {
  const { data: rows } = useFetch("/tenant/payments");
  return (
    <>
      <h2>My Payments</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Property</th><th>Amount</th><th>Method</th><th>Reference</th></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{p.paymentDate}</td><td>{p.rentalRequest.property.title}</td>
                <td>{money(p.amount)}</td><td>{p.method}</td><td>{p.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Empty rows={rows} text="No payments yet." />
      </div>
    </>
  );
}
