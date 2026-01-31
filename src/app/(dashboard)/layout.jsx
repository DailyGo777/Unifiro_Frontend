import Sidebar from "@/components/dashboard/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("organizer_token")?.value;

  if (!token) {
    redirect("/organiser-login");
  }

  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-orange-500/10">
        {children}
      </main>
    </div>
  );
}
