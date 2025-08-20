import React from 'react';
import {Routes, Route} from 'react-router';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import NotFound from "./pages/NotFound";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>      {/* Layout is the parent route */}
        <Route index element={<Home/>}/>      {/* index = default child (when at /) */}
        <Route path="about" element={<About />}/>
        <Route path="users" element={<Users />}/>

        <Route path="users/:id" element={<UserDetail/>} />     {/* dynamic route → /users/1, /users/2, etc */}

        <Route path="*" element={<NotFound />}/>    {/* fallback for unknown URLs */}




      </Route>
    </Routes>
  )
}

export default App