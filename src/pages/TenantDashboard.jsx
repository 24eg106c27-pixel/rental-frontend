import Dashboard from "../components/Dashboard";
import MyRequests from "../tenant/MyRequests";
import MyPayments from "../tenant/MyPayments";
import ComplaintsTab from "../shared/ComplaintsTab";

const tabs = [
  { key: "req", label: "📋 Requests & History", component: MyRequests },
  { key: "pay", label: "💳 My Payments", component: MyPayments },
  { key: "cmp", label: "📢 Complaints", component: ComplaintsTab },
];

export default function TenantDashboard() {
  return <Dashboard title="Tenant" tabs={tabs} />;
}
