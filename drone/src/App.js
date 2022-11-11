import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login"
import Register from "./pages/Register"
import HeaderBar from "./components/HeaderBar"


function App() {
  return (
    <>
    <HeaderBar />
    <div className="app">

      <Register />
    </div>
    </>
  );
}

export default App;
