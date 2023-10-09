import GymSearch from "./scenes/GymSearch";
import Home from "./scenes/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./scenes/SignIn";
import SignUp from "./scenes/SignUp";
import RequireUser from "./components/RequireUser";
import DietPlanner from "./scenes/DietPlanner";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireUser />}>
          <Route path="/services/findGyms" element={<GymSearch />} />
          <Route path="/services/dietPlanner" element={<DietPlanner />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
export default App;