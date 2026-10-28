import { Outlet } from "react-router";
import { TabBar } from "../../components/layout/tab-bar";

export default function ProtectedLayout() {
  return (
    <>
      <div className="pb-[69px] md:pb-0">
        <Outlet />
      </div>
      <TabBar />
    </>
  );
}
