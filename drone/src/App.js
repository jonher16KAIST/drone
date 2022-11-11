import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login"
import HeaderBar from "./components/HeaderBar"


function App() {
  return (
    <>
    <HeaderBar />
    <div className="app">
      
      <Login />
    </div>
    </>
  );
}

export default App;
