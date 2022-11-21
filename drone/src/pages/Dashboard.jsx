import { Button, Card, Tab, Tabs } from "react-bootstrap";
import "./Dashboard.css";
import Building from "../components/Building";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const server = { ip: "192.168.0.105", port: "1337" };

  const [buildings, setBuildings] = useState([{ name: "Null 1", id_key: null}, { name: "Null 2", id_key:null }]);

  async function getBuildings(id_key) {
    console.log(id_key, id_key)
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
    const response = await fetch(
      `http://143.248.55.161:5555/ons?AUS=kr|en|sgln|${id_key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': "*"
        },
      }
    );
    const data = await response.json();
    let link = ""
    console.log("Response", data);
    for (let j=0; j<data.length; j++) {
      if(data[j].order === 2){
        link = data[j].name
      }
    }
    console.log("link: ", link)
    window.open(link, "_blank");

  }

  useEffect(() => {
    getBuildings();
  }, []);

  return (
    <div className="dashboard d-flex flex-row">
      <div className="div1 d-flex justify-content-center align-items-center h-100">
        <iframe
          className="iframe"
          width="90%"
          height="90%"
          src="https://www.youtube.com/embed/k8CQeybowqw"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="div2 h-100">
        <div className="div3">
          <Tabs defaultActiveKey="first">
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
