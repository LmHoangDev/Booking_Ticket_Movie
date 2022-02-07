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
import { CheckoutTemplate } from './templates/CheckoutTemplate/CheckoutTemplate';
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <Route path="/login" exact Component={Login} />
        <Route path="/register" exact Component={Register} />
        <HomeTemplate path="/" exact Component={Home} />
        <CheckoutTemplate path="/checkout/:id" exact component={Checkout} />
      </Switch>
    </Router>
  );
}

export default App;
