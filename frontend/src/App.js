import { useEffect, useState,  } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavbarBox from "./components/Navbar/navbar";
import { Provider, useDispatch,  } from "react-redux";
import store from "./redux/store/Store";
import Home from "./pages/home/Home";
import Profile from "./pages/User/Profile";
import { getAllUsersAction } from "./redux/actions/getUsersAction";
import EditUser from "./pages/User/edit";


function App() {
  const [loginUser, setLoginUser] = useState("");
  const userHandler = (user) => {
    setLoginUser(user);
  };



  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="d-flex flex-column" style={{ overflow: "hidden" }}>
          <NavbarBox loginuserHandler={userHandler} user={loginUser} />

          <Routes>
          <Route exact path="/" element={<Home/>} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/user/edit/:id" element={< EditUser/>} />

          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
