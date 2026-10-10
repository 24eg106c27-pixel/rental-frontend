import Dashboard from "../components/Dashboard";
import Reports from "../admin/Reports";
import UsersTab from "../admin/UsersTab";
import PropertiesTab from "../admin/PropertiesTab";
import Transactions from "../admin/Transactions";
import AdminComplaints from "../admin/AdminComplaints";

const tabs = [
  { key: "rep", label: "📊 Reports", component: Reports },
  { key: "usr", label: "👥 Users", component: UsersTab },
  { key: "prp", label: "🏘 Property Listings", component: PropertiesTab },
  { key: "trx", label: "💰 Transactions", component: Transactions },
  { key: "cmp", label: "📢 Complaints", component: AdminComplaints },
];

export default function AdminDashboard() {
  return <Dashboard title="Admin" tabs={tabs} />;
}
