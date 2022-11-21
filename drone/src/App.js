import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from './pages/Dashboard';
import HeaderBar from "./components/HeaderBar"

import { Route, Routes, Switch, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <>
      <HeaderBar />
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
