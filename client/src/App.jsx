import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Product from "./pages/Product";
import CartPage from "./pages/CartPage";
import WhishList from "./pages/WhishList";
import ScrollToTop from "./components/ScrollToTop";
import UploadProduct from "./pages/UploadProduct";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
    return (
		<>
			<Nav />

			<main>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
					<Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
					<Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
					<Route path="/wishlist" element={<ProtectedRoute><WhishList /></ProtectedRoute>} />
					<Route path="/products/:categori" element={<ProtectedRoute><Products /></ProtectedRoute>} />
					<Route path="/product/:id" element={<ProtectedRoute><Product /></ProtectedRoute>} />
					<Route path="/uploadproduct" element={<ProtectedRoute><UploadProduct /></ProtectedRoute>} />
					<Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
				</Routes>
			</main>

			<Footer />
		</>
	)
}

export default App;