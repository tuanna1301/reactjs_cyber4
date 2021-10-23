import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Footer from "./components/Home/Footer/Footer";
import Header from "./components/Home/Header/Header";
import Modal from "./HOC/Modal/Modal";
import About from "./pages/About/About";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import Contact from "./pages/Contact/Contact";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Detai from "./pages/Detail/Detai";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import TodoList from "./pages/TodoList/TodoList";
import TodoListRedux from "./pages/TodoList/TodoListRedux";
import TodoListRFC from "./pages/TodoList/TodoListRFC";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";

function App() {
  return (
    <BrowserRouter>

      <Modal />
      <LoadingComponent />
      <Switch>
        {/* <Route exact path="/home" render={(propsRoute) => {
          return <>
            <Header />
            <Home {...propsRoute} />
          </>
        }} /> */}
        <HomeTemplate Component={Home} path="/home" exact />
        <Route exact path="/profile" component={Profile} />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <HomeTemplate exact path="/about" Component={About} />
        <HomeTemplate Component={Contact} path="/contact" exact />
        <Route exact path="/todolist" component={TodoList} />
        <Route exact path="/todolistrfc" component={TodoListRFC} />
        <Route exact path="/todolistredux" component={TodoListRedux} />
        <Route exact path="/todolistsaga" component={BaiTapToDoListSaga} />
        <Route exact path="/detail/:id" component={Detai} />
        <Route exact path="/demohocmodal" component={DemoHOCModal} />
        <HomeTemplate exact path="/" Component={Home} />
        <Route exact path="*" component={PageNotFound} />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
