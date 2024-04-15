import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import LoginPanel from "./components/LoginPanel/LoginPanel"
import BasketPanel from "./components/BasketPanel/BasketPanel"
import UserPanel from './components/UserPanel/UserPanel';
import RegisterPanel from './components/RegisterPanel/RegisterPanel';
import { useLoggedInStatus } from './useLoggedInStatus';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/koszyk" element={<BasketPage />} />
                    <Route path="/profil" element={<UserPage />} />
                    <Route path ="/rejestracja" element={<RegisterPage />} />
                </Routes>
            </div>
        </Router>
    );
}

function MainPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <MainContent isLoggedIn={isLoggedIn} />
        </>
    );
}

function LoginPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <LoginPanel />
        </>
    );
}

function BasketPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header />
            <BasketPanel />
        </>
    );
}

function UserPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header />
            <UserPanel />
        </>
    );
}

function RegisterPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header />
            <RegisterPanel />
        </>
    );
}

export default App;
