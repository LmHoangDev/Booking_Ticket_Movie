import { createBrowserHistory } from "history";
import { Route } from "react-router-dom";
import { Router, Switch } from "react-router-dom";
import "./App.css";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import News from "./pages/News/News";
import Register from "./pages/Register/Register";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { CheckoutTemplate } from "./templates/CheckoutTemplate/CheckoutTemplate";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />

        <Route path="/register" exact component={Register} />
        <HomeTemplate path="/" exact Component={Home} />
        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        <UserTemplate path="/login" exact Component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
