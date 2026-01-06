import Sidebar from "@/Components/Sidebar/Sidebar";

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, marginLeft: '240px', minHeight: '100vh', backgroundColor: 'var(--background-base)' }}>
                {children}
            </main>
        </div>
    );
};

export default PagesLayout;