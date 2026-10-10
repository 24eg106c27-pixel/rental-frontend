import { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../AuthContext";
import MyProperties from "../owner/MyProperties";
import OwnerRequests from "../owner/OwnerRequests";
import OwnerPayments from "../owner/OwnerPayments";
import ComplaintsTab from "../shared/ComplaintsTab";

const tabs = [
  { key: "props", label: "🏘 My Properties", component: MyProperties },
  { key: "req", label: "📩 Rental Requests", component: OwnerRequests },
  { key: "pay", label: "💰 Payments Received", component: OwnerPayments },
  { key: "cmp", label: "📢 Complaints", component: ComplaintsTab },
];

export default function OwnerDashboard() {
  const { user, refresh } = useAuth();
  useEffect(() => { refresh().catch(() => {}); }, []);

  const notice = !user.verified && (
    <p className="msg error">
      Your owner account is waiting for admin verification. You can add properties after the admin verifies you.
    </p>
  );
  return <Dashboard title="Owner" tabs={tabs} notice={notice} />;
}
