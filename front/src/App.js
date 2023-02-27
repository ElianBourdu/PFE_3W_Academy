import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import Navbar from "./components/Navbar";

// Users components
import CreateUser from "./components/users/CreateUser";
import ReadAllUsers from "./components/users/ReadAllUsers";
import UpdateUser from "./components/users/UpdateUser";
import Login from "./components/users/Login";

// Topics components
import CreateTopic from "./components/topics/CreateTopic";
import ReadAllTopics from "./components/topics/ReadAllTopics";
import UpdateTopic from "./components/topics/UpdateTopic";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Mains routes*/}
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                
                {/* Users routes*/}
                <Route path="/CreateUser" element={<CreateUser />} />
                <Route path="/ReadAllUsers" element={<ReadAllUsers />} />
                <Route path="/User/:id" element={<UpdateUser />} />
                
                {/* Topics routes*/}
                <Route path="/CreateTopic" element={<CreateTopic />} />
                <Route path="/ReadAllTopics" element={<ReadAllTopics />} />
                <Route path="/Topic/:id" element={<UpdateTopic />} />
                
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
