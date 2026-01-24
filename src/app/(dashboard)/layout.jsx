import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-full min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-orange-500/10">
                {children}
            </main>
        </div>
    );
}
