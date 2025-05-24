import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import CreateGift from "./pages/CreateGift";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactUs from "./pages/about/ContactUs"; // Add this import
import Unsubscribe from "./pages/Unsubscribe";
import OrderTracking from "./pages/tracking/OrderTracking";
import { SearchProvider } from './context/SearchContext';
import Search from "./pages/search";

const AppContent = () => {
  const location = useLocation();
  const isCafePage = location.pathname === "/cafe";
  const isSignInPage = location.pathname === "/sign-in";
  const isUnsubscribePage = location.pathname === "/unsubscribe";

  return (
    <>
      {!isCafePage && !isSignInPage && !isUnsubscribePage && <Header />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:category/:subCategory?" element={<Filters />} />
        <Route path="/category/:category" element={<Filters />} />
        <Route path="/product-page/:product_id" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cafe" element={<CafePart />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-gift" element={<CreateGift />} />
        <Route path="/search" element={<Search />} />

        {/* Protected routes */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <ViewCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/confirmation"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          }
        />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route
          path="/tracking/:ship_order_id"
          element={
            <ProtectedRoute>
              <OrderTracking />
            </ProtectedRoute>
          }
        />
        
      </Routes>
      {!isCafePage && !isSignInPage && !isUnsubscribePage && <Footer />}
    </>
  );
};

function App() {
  return (
    <SearchProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </SearchProvider>
  );
};

export default App;
