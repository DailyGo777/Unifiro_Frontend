import TemplatesSidebar from "@/components/templates/TemplatesSidebar";
import { TemplatesProvider } from "@/context/TemplatesContext";

export default function TemplatesLayout({ children }) {
    return (
        <TemplatesProvider>
            <div className="flex h-full min-h-screen">
                <TemplatesSidebar />
                <main className="flex-1 overflow-auto bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-orange-500/10">
                    {children}
                </main>
            </div>
        </TemplatesProvider>
    );
}
