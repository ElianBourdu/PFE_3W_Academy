import Error404 from "../components/Error404";
import Home from "../components/Home";

// Users components
import CreateUser from "../components/users/CreateUser";
import ReadAllUsers from "../components/users/ReadAllUsers";
import UpdateUser from "../components/users/UpdateUser";
import Login from "../components/users/Login";
import Logout from "../components/users/Logout";

// Topics components
import CreateTopic from "../components/topics/CreateTopic";
import ReadAllTopics from "../components/topics/ReadAllTopics";
// import UpdateTopic from "../components/topics/UpdateTopic";
import ReadByTopicID from "../components/topics/ReadByTopicID";

// Threads components
import CreateThread from "../components/threads/CreateThread";
import ReadAllThreads from "../components/threads/ReadAllThreads";
// import UpdateThread from "../components/threads/UpdateThread";
import ReadByThreadID from "../components/threads/ReadByThreadID";

// Messages components
import CreateMessage from "../components/messages/CreateMessage";
import ReadAllMessages from "../components/messages/ReadAllMessages";
import UpdateMessage from "../components/messages/UpdateMessage";

const routes = [
    /* Mains routes*/
    {path:"/", component:<Home />},
    {path:"/Login", component:<Login />},
    {path:"/Logout", component:<Logout />},
    
    /* Users routes*/
    {path:"/CreateUser", component:<CreateUser />},
    {path:"/ReadAllUsers", component:<ReadAllUsers />, auth:'admin'},
    {path:"/User/:id", component:<UpdateUser />},
    
    /* Topics routes*/
    {path:"/CreateTopic", component:<CreateTopic />, auth:'admin'},
    {path:"/ReadAllTopics", component:<ReadAllTopics />},
    {path:"/topic/:id", component:<ReadByTopicID />},
    // {path:"/Topic/:id", component:<UpdateTopic />},
    
    // faire la navbar final
    // faire les groupes
    
    /* Threads routes*/
    {path:"/CreateThread", component:<CreateThread />},
    {path:"/ReadAllThreads", component:<ReadAllThreads />},
    {path:"/Thread/:id", component:<ReadByThreadID />},
    // {path:"/Thread/:id", component:<UpdateThread />},
    
    /* Messages routes*/
    {path:"/CreateMessage", component:<CreateMessage />},
    {path:"/ReadAllMessages", component:<ReadAllMessages />},
    {path:"/Message/:id", component:<UpdateMessage />},
    
    {path:"*", component:<Error404 />}
];
    // {path:"/", component:<Home />, auth:"admin"},
    // {path:"/login", component:<Login />},
    // {path:"/register", component:<AddUser />},
    // {path:"/profil", component:<Profil />, auth:"user"},
    // {path:"*", component:<Error404 />}

export default routes;