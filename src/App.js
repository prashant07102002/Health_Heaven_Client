import GymSearch from "./scenes/GymSearch";
import Home from "./scenes/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./scenes/SignIn";
import SignUp from "./scenes/SignUp";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gymSearch" element={<GymSearch />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}
export default App;