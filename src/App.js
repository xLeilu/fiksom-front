import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import LoginPanel from "./components/LoginPanel/LoginPanel"
import BasketPanel from "./components/BasketPanel/BasketPanel"
import UserPanel from './components/UserPanel/UserPanel';
import RegisterPanel from './components/RegisterPanel/RegisterPanel';
import { useLoggedInStatus } from './useLoggedInStatus';
import UserData from "./components/UserPanel/UserData";
import ShoppingList from "./components/UserPanel/ShoppingList";

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
                    <Route path="/dane-uzytkownika" element={<UserDataPage />} />
                    <Route path="/historia-zakupow" element={<ShoppingListPage />} />
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
            <Header isLoggedIn={isLoggedIn} />
            <UserPanel isLoggedIn={isLoggedIn} />
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

function UserDataPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <UserData isLoggedIn={isLoggedIn} />
        </>
    );
}

function ShoppingListPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <ShoppingList isLoggedIn={isLoggedIn} />
        </>
    );
}

export default App;
