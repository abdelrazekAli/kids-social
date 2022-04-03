import { useContext } from "react";
import { Context } from "./context/Context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Import pages
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import Chats from "./pages/chats/Chats";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Requests from "./pages/requests/Requests";
import PostDetails from "./pages/postDetails/PostDetails";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {user ? (
          <>
            <Route exact path="/" component={Home} />
            <Route path="/profile/:userId" component={Profile} />
            <Route path="/posts/:postId" component={PostDetails} />
            <Route path="/requests" component={Requests} />
            <Route path="/chats" component={Chats} />
            <Route path="/chat/:userId" component={Chat} />
          </>
        ) : (
          <>
            <Redirect from="/" to="/login" />
            <Redirect from="/profile/:userId" to="/login" />
            <Redirect from="/posts/:postId" to="/login" />
            <Redirect from="/requests" to="/login" />
            <Redirect from="/chats" to="/login" />
            <Redirect from="/chat/:userId" to="/login" />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
