import { Card, Tab, Tabs } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard d-flex flex-row">
      <div className="d-flex justify-content-center align-items-center border w-50 h-100">
        <iframe
          width="90%"
          height="90%"
          src="https://www.youtube.com/embed/dIP7wWY4Znw"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="border w-50 h-100">
        <div style={{ display: "block", width: 700, padding: 30 }}>
          <Tabs defaultActiveKey="second">
            <Tab eventKey="first" title="Building list">
              <Card className="mt-2 p-2">Bulding 1</Card>
              <Card className="mt-2 p-2">Bulding 2</Card>
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
