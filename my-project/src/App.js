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
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import Edit from "./pages/Admin/Films/Edit/Edit";
import Users from "./pages/Admin/Users/Users";
import AddNewUser from "./pages/Admin/Users/AddNew/AddNewUser";
import EditUser from "./pages/Admin/Users/Edit/EditUser";
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />

        <CheckoutTemplate path="/profile" exact Component={Profile} />
        <HomeTemplate path="/" exact Component={Home} />
        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />
        {/* admin */}
        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/users" exact Component={Users} />
        <AdminTemplate
          path="/admin/users/addnew"
          exact
          Component={AddNewUser}
        />
        <AdminTemplate
          path="/admin/users/edituser/:tk"
          exact
          Component={EditUser}
        />

        <AdminTemplate
          path="/admin/films/showtime/:id/:tenphim"
          exact
          Component={ShowTime}
        />
      </Switch>
    </Router>
  );
}

export default App;
