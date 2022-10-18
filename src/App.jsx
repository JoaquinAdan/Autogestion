import "./App.css";
import Home from "./components/LogIn/Home";
import Loby from "./components/master/Loby";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import UserState from "./context/user/UserState";

function App() {

  // useEffect(() => {
  //   localStorage.removeItem("token")
  // }, [window.BeforeUnloadEvent])
  
  return (
    <UserState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<ProtectedRoute Component={Loby} />} />
        </Routes>
      </BrowserRouter>
    </UserState>
  );
}

export default App;
