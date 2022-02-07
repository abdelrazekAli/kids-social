import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import pages
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import Chats from "./pages/chats/Chats";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Requests from "./pages/requests/Requests";
import Postdetails from "./pages/postDetails/PostDetails";

function App() {
  return (
    <Router>
      <Switch>
        {/* For test UI */}
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile/:userId">
          <Profile />
        </Route>
        <Route path="/posts/:postId">
          <Postdetails />
        </Route>
        <Route path="/requests">
          <Requests />
        </Route>
        <Route path="/chats">
          <Chats />
        </Route>
        <Route path="/chat/:userId">
          <Chat />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
