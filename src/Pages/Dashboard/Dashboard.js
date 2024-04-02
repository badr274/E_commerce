import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/Sidebar";
import TopBar from "../../Components/Dashboard/Topbar";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="position-relative dashboard">
      <TopBar />
      <div className="d-flex g-2" style={{ marginTop: "70px" }}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
