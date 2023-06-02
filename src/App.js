import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import {
  Home,
  Contact,
  Cart,
  Admin,
  NotFound,
  Register,
  Reset,
} from "./pages/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import RouteProtector from "./route/routeProtector/RouteProtector";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <RouteProtector>
                <Home />
              </RouteProtector>
            }
          />
          <Route
            path="/contact"
            element={
              <RouteProtector>
                <Contact />
              </RouteProtector>
            }
          />
          <Route
            path="/cart"
            element={
              <RouteProtector>
                <Cart />
              </RouteProtector>
            }
          />

          <Route path="/reset" element={<Reset />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
