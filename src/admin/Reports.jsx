import { money } from "../api";
import useFetch from "../useFetch";

const cards = [
  ["totalUsers", "Total users"], ["owners", "Property owners"], ["tenants", "Tenants"],
  ["totalProperties", "Properties listed"], ["verifiedProperties", "Verified listings"],
  ["pendingProperties", "Waiting for verification"], ["rentedProperties", "Currently rented"],
  ["totalRequests", "Rental requests"], ["pendingRequests", "Pending requests"],
  ["approvedRequests", "Approved, awaiting payment"], ["paidRequests", "Paid rentals"],
  ["transactions", "Transactions"], ["revenue", "Total rent paid", true], ["openComplaints", "Open complaints"],
];

export default function Reports() {
  const { data: s } = useFetch("/admin/report", {});
  return (
    <>
      <h2>Reports</h2>
      <div className="stats">
        {cards.map(([key, label, isMoney]) => (
          <div className="card stat" key={key}>
            <div className="num">{s[key] === undefined ? "-" : isMoney ? money(s[key]) : s[key]}</div>
            <div className="muted">{label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
