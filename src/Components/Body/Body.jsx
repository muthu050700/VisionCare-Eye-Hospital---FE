import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer.jsx/Footer";

const Body = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
