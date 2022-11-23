import { Button, Card, Tab, Tabs } from "react-bootstrap";
import "./Dashboard.css";
import Building from "../components/Building";
import { useEffect, useState } from "react";
import { socket } from "../services/socket"
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const server = { ip: "192.168.0.105", port: "1337" };
  const ons = { ip: "143.248.55.161", port: "5555"}

  let navigate = useNavigate()

  const [buildings, setBuildings] = useState([{ name: "Null 1", id_key: null}, { name: "Null 2", id_key:null }]);
  const [quote, setQuote] = useState('')

  async function getBuildings() {

    const response = await fetch(
      `http://${server.ip}:${server.port}/api/buildings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("Response", data);
    if (data.status === "ok") {
      setBuildings(data.buildings);
    }
  }

  async function queryONS(id_key) {
    console.log("id key from params", id_key)
    let link = ""
    const response = await fetch(
      `http://${ons.ip}:${ons.port}/ons?AUS=kr|en|sgln|${id_key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': "*"
        },
      }
    );
    const data = await response.json()
    console.log("Response", data);
    for (let j=0; j<data.length; j++) {
      if(data[j].order === 2){
        link = data[j].name
      }
    }
    console.log("link: ", link)
    window.open(link, "_blank");

  }

  async function populateQuote() {
   const req = await fetch(`http://${server.ip}:${server.port}/api/quote`, {
    headers: {
      'x-access-token' : localStorage.getItem('token'),
    }
   })
   const data = await req.json()
   if(data.status === 'ok'){
    setQuote(data.quote)
   }else{
    alert(data.error)
   }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(' token useffect', token)
    if(token) {
      const user = jwt_decode(token)
      if(!user){
        localStorage.removeItem('token')
        navigate('/login')
      } else {
        getBuildings();
      }
    } else {
      navigate('/login')
    }
    
  }, []);

  return (
    <div className="dashboard">
      <div className="div1 d-flex justify-content-center align-items-center">
        <iframe
          className="iframe"
          width="90%"
          height="90%"
          src="https://www.youtube.com/embed/wxt13IZkiK0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="div2">
        <div className="div3">
          <Tabs className="tabs" defaultActiveKey="first">
            <Tab eventKey="first" title="Building list">
              {buildings.map((building) => (
                <Building onClick={e=>queryONS(building.id_key)} key={building.name} building={building} />
              ))}
            </Tab>
            <Tab eventKey="second" title="Event list">
              <Card className="mt-2 p-2">Event 1</Card>
              <Card className="mt-2 p-2">Event 2</Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
