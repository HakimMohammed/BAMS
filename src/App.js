import React from "react";

// Routes
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

// Authentification Pages
import LogIn from "./Pages/Authentification/login";
import SignUp from "./Pages/Authentification/signup";

//Loading Page
import Loading from "./Pages/Loading/Loading";

//Create Post
import AjouterPublication from "./Pages/createPost/AjouterPublication";

//Home Page
const Home = React.lazy(()=>{
  return new Promise(resolve => {
    setTimeout(()=> resolve(import("./Pages/Home/Home")) , 600 );
  });
});





function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentification Routes */}

        <Route exact path="/" element={<LogIn />}/>
        <Route exact path="/signup" element={ <SignUp />} />
        <Route exact path="/login" element={ <LogIn />} />
        <Route exact path="/home" element={ <React.Suspense fallback={ <Loading />}><Home /></React.Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;