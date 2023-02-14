import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import Navbar from "./components/Navbar";
import CreateUser from "./components/users/CreateUser";
import ReadAllUsers from "./components/users/ReadAllUsers";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CreateUser" element={<CreateUser />} />
                <Route path="/ReadAllUsers" element={<ReadAllUsers />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
