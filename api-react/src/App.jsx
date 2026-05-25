import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Works from "./pages/Works";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trabajos" element={<Works />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}