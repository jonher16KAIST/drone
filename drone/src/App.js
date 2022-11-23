import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from './pages/Dashboard';
import HeaderBar from "./components/HeaderBar"

import { Route, Routes, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <>
      <HeaderBar />
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
