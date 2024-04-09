import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import LoginPanel from "./components/LoginPanel/LoginPanel"
import BasketPanel from "./components/BasketPanel/BasketPanel"
import UserPanel from './components/UserPanel/UserPanel';
import RegisterPanel from './components/RegisterPanel/RegisterPanel';

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

    return (
        <>
            <Header />
            <MainContent />
        </>
    );
}

function LoginPage() {

    return (
        <>
            <Header />
            <LoginPanel />
        </>
    );
}

function BasketPage() {

    return (
        <>
            <Header />
            <BasketPanel />
        </>
    );
}

function UserPage() {

    return (
        <>
            <Header />
            <UserPanel />
        </>
    );
}

function RegisterPage() {

    return (
        <>
            <Header />
            <RegisterPanel />
        </>
    );
}

export default App;
