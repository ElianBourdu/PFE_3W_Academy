import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
