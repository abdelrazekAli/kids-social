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
import Room from "./pages/Room/Room";
import Chats from "./pages/chats/Chats";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Learning from "./pages/learning/Learning";
import Register from "./pages/register/Register";
import Requests from "./pages/requests/Requests";
import PostDetails from "./pages/postDetails/PostDetails";
import LearningCategory from "./pages/learningCategory/LearningCategory";

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
            <Route path="/chat/:friendId" component={Chat} />
            <Route path="/room/:type/:roomID" component={Room} />
            <Route path="/learning" component={Learning} exact />
            <Route path="/learning/:category" component={LearningCategory} />
          </>
        ) : (
          <>
            <Redirect from="/" to="/login" />
            <Redirect from="/profile/:userId" to="/login" />
            <Redirect from="/posts/:postId" to="/login" />
            <Redirect from="/requests" to="/login" />
            <Redirect from="/chats" to="/login" />
            <Redirect from="/chat/:userId" to="/login" />
            <Redirect from="/room/:type/:roomID" to="/login" />
            <Redirect from="/learning" to="/login" />
            <Redirect from="/learning/:category" to="/login" />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
