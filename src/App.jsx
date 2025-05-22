import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./layout/header/index";
import Home from "./pages/home";
import Filters from "./pages/filters";
import Footer from "./layout/Footer";
import ProductPage from "./pages/product/index";
import ViewCart from "./pages/checkout/ViewCart";
import About from "./pages/about";
import ScrollToTop from "./components/ui/ScrollToTop";
import CafePart from "./components/CafePart";
import OrderConfirmation from "./pages/checkout/OrderConfirmation";
import SignIn from "./pages/signin/SignIn";
import ProfileSettings from "./pages/settings/ProfileSettings";
import CreateGift from './pages/CreateGift';
import ProtectedRoute from './components/ProtectedRoute';
import ContactUs from './pages/about/ContactUs'; // Add this import

const AppContent = () => {
  const location = useLocation();
  const isCafePage = location.pathname === "/cafe";
  const isSignInPage = location.pathname === "/sign-in";

  return (
    <>
      {!isCafePage && !isSignInPage && <Header />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:category/:subCategory?" element={<Filters />} />
        <Route path="/product-page" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cafe" element={<CafePart />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-gift" element={<CreateGift />} /> 

        {/* Protected routes */}
        <Route path="/checkout" element={
          <ProtectedRoute>
            <ViewCart />
          </ProtectedRoute>
        } />
        <Route path="/checkout/confirmation" element={
          <ProtectedRoute>
            <OrderConfirmation />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileSettings />
          </ProtectedRoute>
        } />
      </Routes>
      {!isCafePage && !isSignInPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;
