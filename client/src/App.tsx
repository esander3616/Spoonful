import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { UserProvider } from "./context/userContext";
import userService from "./utils/userService";
import type { User } from "./shared.types";
import { Navbar } from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Recipes from "./pages/Recipes/Recipes";
import SpoonBot from "./pages/SpoonBot/SpoonBot";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";


function App() {
  const [user, setUser] = useState<User | null>(userService.getUser());

  function handleLogin() {
    setUser(userService.getUser());
  }

  function logout() {
    userService.logout();
    setUser(null);
  }

  return (
    <UserProvider user={user} logout={logout}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipe_details" element={<Recipes />} />
            <Route path="/ai" element={<SpoonBot />} />

            <Route path="/login" 
              element={ user ? (<Navigate to="/dashboard" />) : (<Login handleLogin={handleLogin} /> )} />
              
            <Route path="/signup" 
              element={ user ? (<Navigate to="/dashboard" />) : (<Signup handleLogin={handleLogin} /> )} />
            
            <Route path="/dashboard"
              element={ user ? (<Dashboard />) : (<Navigate to="/login" /> )} />

          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
