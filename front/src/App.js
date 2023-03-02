// import Error404 from "./components/Error404";
// import Home from "./components/Home";

// // Users components
// import CreateUser from "./components/users/CreateUser";
// import ReadAllUsers from "./components/users/ReadAllUsers";
// import UpdateUser from "./components/users/UpdateUser";
// import Login from "./components/users/Login";

// // Topics components
// import CreateTopic from "./components/topics/CreateTopic";
// import ReadAllTopics from "./components/topics/ReadAllTopics";
// import UpdateTopic from "./components/topics/UpdateTopic";

// // Threads components
// import CreateThread from "./components/threads/CreateThread";
// import ReadAllThreads from "./components/threads/ReadAllThreads";
// import UpdateThread from "./components/threads/UpdateThread";

// // Messages components
// import CreateMessage from "./components/messages/CreateMessage";
// import ReadAllMessages from "./components/messages/ReadAllMessages";
// import UpdateMessage from "./components/messages/UpdateMessage";

// const App = () => {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 {/* Mains routes*/}
//                 <Route path="/" element={<Home />} />
//                 <Route path="/Login" element={<Login />} />
                
//                 {/* Users routes*/}
//                 <Route path="/CreateUser" element={<CreateUser />} />
//                 <Route path="/ReadAllUsers" element={<ReadAllUsers />} />
//                 <Route path="/User/:id" element={<UpdateUser />} />
                
//                 {/* Topics routes*/}
//                 <Route path="/CreateTopic" element={<CreateTopic />} />
//                 <Route path="/ReadAllTopics" element={<ReadAllTopics />} />
//                 <Route path="/Topic/:id" element={<UpdateTopic />} />
                
//                 {/* Threads routes*/}
//                 <Route path="/CreateThread" element={<CreateThread />} />
//                 <Route path="/ReadAllThreads" element={<ReadAllThreads />} />
//                 <Route path="/Thread/:id" element={<UpdateThread />} />
                
//                 {/* Messages routes*/}
//                 <Route path="/CreateMessage" element={<CreateMessage />} />
//                 <Route path="/ReadAllMessages" element={<ReadAllMessages />} />
//                 <Route path="/Message/:id" element={<UpdateMessage />} />
                
//                 <Route path="*" element={<Error404 />} />
//             </Routes>
//         </BrowserRouter>
//     );
// };

import Navbar from "./components/Navbar";
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Router />
        </BrowserRouter>
    );
}

export default App;
