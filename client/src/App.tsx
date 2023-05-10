import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddInventory from "./pages/AddInventory";


const App: React.FC<{}> = () => {
  return (
<Router>
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/add' element={<AddInventory />} />
      </Routes>
    </Router>
  )
}

export default App