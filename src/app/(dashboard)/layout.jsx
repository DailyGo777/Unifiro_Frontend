import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-full min-h-screen bg-gradient-to-br from-green-500/20 via-yellow-400/20 to-orange-400/20 overflow-auto">
            <Sidebar />
            <main className="flex-1 p-8 overflow-auto bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-orange-500/10">
                {children}
            </main>
        </div>
    );
}
