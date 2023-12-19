import GymSearch from "./scenes/GymSearch";
import Home from "./scenes/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./scenes/SignIn";
import SignUp from "./scenes/SignUp";
import RequireUser from "./components/RequireUser";
import DietPlanner from "./scenes/DietPlanner";
import Resources from "./scenes/Resources";
import Store from "./scenes/Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "./state";
import Profile from "./scenes/Profile";

function App() {
  const toastData = useSelector((store) => store.toastData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (toastData?.type === "Success") {
      toast.success(toastData?.message);
      dispatch(showToast({
        type: "",
        message: "",
      }))
    }
    else if (toastData?.type === "Error") {
      toast.error(toastData?.message);
      dispatch(showToast({
        type: "",
        message: "",
      }))
    }

  }, [toastData])

  return (
    <div className="App">
      {/* {toastData ? <div> <ToastContainer /></div> : ""} */}
      <div> <ToastContainer /></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireUser />}>
          <Route path="/services/findGyms" element={<GymSearch />} />
          <Route path="/services/dietPlanner" element={<DietPlanner />} />
          <Route path="/services/resources" element={<Resources />} />
          <Route path="/services/store" element={<Store />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
export default App;