import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./layout/header/index";
import SignUpLayout from "./layout/SignUpLayout";
import SignUpPhone from "./pages/signup/SignUpPhone";
import SignUpVerification from "./pages/signup/SignUpVerification";
import SignUpDetails from "./pages/signup/SignUpDetails";
import Home from "./pages/home";
import Filters from "./pages/filters";
import Footer from "./layout/Footer";
import ProductPage from "./pages/product/index";
import CheckoutLayout from "./layout/CheckoutLayout";
import ViewCart from "./pages/checkout/ViewCart";
import CustomerInfo from "./pages/checkout/CustomerInfo";
import OrderInformation from "./pages/checkout/OrderInformation";
import SettingsLayout from "./layout/SettingsLayout";
import Profile from "./pages/settings/Profile";
import MyOrders from "./pages/settings/MyOrders";
import ShippingAddress from "./pages/settings/ShippingAddress";
import JeevicPoints from "./pages/settings/JeevicPoints";
import TermsAndConditions from "./pages/settings/TermsAndConditions";
import Faq from "./pages/settings/Faq";
import About from "./pages/about";
import ScrollToTop from "./components/ui/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category/:subCategory?" element={<Filters />} />
        <Route path="/product-page" element={<ProductPage />} />
        <Route path="/about" element={<About />} />

        <Route path="/sign-up" element={<SignUpLayout />}>
          <Route path="" element={<SignUpPhone />} />
          <Route path="verification" element={<SignUpVerification />} />
          <Route path="details" element={<SignUpDetails />} />
        </Route>

        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="shipping-address" element={<ShippingAddress />} />
          <Route path="jeevic-points" element={<JeevicPoints />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="faq" element={<Faq />} />
        </Route>

        <Route path="/checkout" element={<CheckoutLayout />}>
          <Route path="" element={<ViewCart />} />
          <Route path="customer-info" element={<CustomerInfo />} />
          <Route path="order-information" element={<OrderInformation />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
