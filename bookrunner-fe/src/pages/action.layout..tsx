import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import ActionNavbar from '../components/ActionNav';

const ActionLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <ActionNavbar />
            <main className="flex-grow container mx-auto p-4 px-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default ActionLayout;
