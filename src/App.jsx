import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Works from "./pages/Works";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trabajos" element={<Works />} />
        <Route path="/contacto" element={<Navigate to="/#contacto" replace />} />
      </Routes>
    </>
  );
}
