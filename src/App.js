import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import LoginPanel from "./components/LoginPanel/LoginPanel";
import BasketPanel from "./components/BasketPanel/BasketPanel";
import UserPanel from "./components/UserPanel/UserPanel";
import RegisterPanel from "./components/RegisterPanel/RegisterPanel";
import { useLoggedInStatus } from "./useLoggedInStatus";
import UserData from "./components/UserPanel/UserData";
import ShoppingList from "./components/UserPanel/ShoppingList";
import ProductsPanel from "./components/ProductsPanel/ProductsPanel";
import AddProduct from "./components/UserPanel/AddProduct";
import ProductView from "./components/ProductView/ProductView";
import OrderDetails from "./components/UserPanel/OrderDetails";
import EditPassword from "./components/UserPanel/EditPassword";
import EditUserData from "./components/UserPanel/EditUserData";
import AddCategory from "./components/UserPanel/AddCategory";

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/koszyk" element={<BasketPage />} />
                    <Route path="/profil" element={<UserPage />} />
                    <Route path="/rejestracja" element={<RegisterPage />} />
                    <Route
                        path="/dane-uzytkownika"
                        element={<UserDataPage />}
                    />
                    <Route
                        path="/historia-zakupow"
                        element={<ShoppingListPage />}
                    />
                    <Route
                        path="/produkty/:productType?"
                        element={<ProductsPage />}
                    />
                    <Route path="/dodaj-produkt" element={<AddProductPage />} />
                    <Route
                        path="/produkt/:productID/:model/:manufacturer/:price/:quantity"
                        element={<ProductDetailPage />}
                    />
                    <Route
                        path="/order/:orderId"
                        element={<OrderDetailsPage />}
                    />
                    <Route
                        path="/edit-password/:userId"
                        element={<EditPasswordPage />}
                    />
                    <Route
                        path="/edit-user-data/:userId/:userName/:email/:phoneNumber"
                        element={<EditUserDataPage />}
                    />
                    <Route
                        path="/dodaj-kategorie"
                        element={<AddCategoryPage />}
                    />
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
            <Header isLoggedIn={isLoggedIn} />
            <BasketPanel isLoggedIn={isLoggedIn} />
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

function ProductsPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <ProductsPanel isLoggedIn={isLoggedIn} />
        </>
    );
}

function AddProductPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <AddProduct isLoggedIn={isLoggedIn} />
        </>
    );
}

function ProductDetailPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <ProductView isLoggedIn={isLoggedIn} />
        </>
    );
}

function OrderDetailsPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <OrderDetails />
        </>
    );
}

function EditPasswordPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <EditPassword />
        </>
    );
}

function EditUserDataPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <EditUserData />
        </>
    );
}

function AddCategoryPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <AddCategory />
        </>
    );
}

export default App;
