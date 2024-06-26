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
import { useCheckAdminStatus } from "./useCheckAdminStatus";
import UsersOrders from "./components/UserPanel/UsersOrders";
import ManageUsers from "./components/UserPanel/ManageUsers";
import ModifyProduct from "./components/ProductView/ModifyProduct";

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
                        path="/order/:orderId/:orderStatus"
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
                    <Route
                        path="/zamowienia-uzytkownikow"
                        element={<UsersOrdersPage />}
                    />
                    <Route
                        path="/zarzadzaj-uzytkownikiem"
                        element={<ManageUsersPage />}
                    />
                    <Route
                        path="/modyfikuj/:productID"
                        element={<ModifyProductPage />}
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
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <UserPanel isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
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
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <UserData isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        </>
    );
}

function ShoppingListPage() {
    const { isLoggedIn } = useLoggedInStatus();
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <ShoppingList isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
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
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <AddProduct isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        </>
    );
}

function ProductDetailPage() {
    const { isLoggedIn } = useLoggedInStatus();
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <ProductView isAdmin={isAdmin} />
        </>
    );
}

function OrderDetailsPage() {
    const { isLoggedIn } = useLoggedInStatus();
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <OrderDetails isAdmin={isAdmin} />
        </>
    );
}

function EditPasswordPage() {
    const { isLoggedIn } = useLoggedInStatus();
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <EditPassword isAdmin={isAdmin} />
        </>
    );
}

function EditUserDataPage() {
    const { isLoggedIn } = useLoggedInStatus();
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <EditUserData isAdmin={isAdmin} />
        </>
    );
}

function AddCategoryPage() {
    const { isLoggedIn } = useLoggedInStatus();
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <AddCategory isAdmin={isAdmin} />
        </>
    );
}

function UsersOrdersPage() {
    const { isLoggedIn } = useLoggedInStatus();
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <UsersOrders isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        </>
    );
}

function ManageUsersPage() {
    const { isLoggedIn } = useLoggedInStatus();
    const { isAdmin } = useCheckAdminStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <ManageUsers isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        </>
    );
}

function ModifyProductPage() {
    const { isLoggedIn } = useLoggedInStatus();

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <ModifyProduct isLoggedIn={isLoggedIn} />
        </>
    );
}

export default App;
