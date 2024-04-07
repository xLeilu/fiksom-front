import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import LoginPanel from "./components/LoginPanel/LoginPanel"
import BasketPanel from "./components/BasketPanel/BasketPanel"
import UserPanel from './components/UserPanel/UserPanel';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/koszyk" element={<BasketPage />} />
                    <Route path="/profil" element={<UserPage />} />
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

export default App;
