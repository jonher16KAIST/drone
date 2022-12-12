import { Button, Card, Tab, Tabs } from "react-bootstrap";
import "./Dashboard.css";
import Building from "../components/Building";
import { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate, redirect } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import autoid from "../img/autoid.png";
import Event from "../components/Event";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactFlvPlayer } from "react-flv-player";
import ReactPlayer from "react-player";

const Dashboard = () => {
  const server = { ip: "192.168.0.105", port: "1337" };
  const ons = { ip: "143.248.55.161", port: "5555" };

  let navigate = useNavigate();

  const dataFetchedRef = useRef(false);

  const showError = (msg) => {
    toast.error(msg, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const [buildings, setBuildings] = useState([]);
  const [isWorking, setIsWorking] = useState([]);

  const events = [
    { name: "event1", id_key: "key1" },
    { name: "event2", id_key: "key2" },
  ];

  async function getBuildings() {
    try {
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
      } else {
        showError("Error: Could not fetch building data from MongoDB");
      }
    } catch {
      showError("Could not fetch building data. Check backend server status.");
    }
  }

  async function queryONS(id_key) {
    console.log("id key from params", id_key);
    let link = "";
    try {
      const response = await fetch(
        `http://${ons.ip}:${ons.port}/ons?AUS=kr|en|sgln|${id_key}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();
      console.log("Response", data);
      let flag_isLink = false;
      for (let j = 0; j < data.length; j++) {
        if (data[j].order === 2) {
          link = data[j].name;
          flag_isLink = true;
        }
      }
      if (flag_isLink === true) {
        console.log("link: ", link);
        window.open(link, "_blank");
      } else {
        showError("Error: ONS did not provide any link for this building.");
      }
    } catch {
      showError("Error: Query to ONS not successful. Please check ONS status.");
    }
  }

  async function queryEPCIS() {
    showError("Not implemented yet.");
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    
    const token = localStorage.getItem("token");
    console.log("token useffect", token);
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        redirect("/login");
      } else {
        getBuildings();
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <HeaderBar isLogged={true} />
      <div className="dashboard">
        <div className="div1 d-flex justify-content-center align-items-center">
          <ToastContainer />
          {/* <iframe
          className="iframe"
          width="90%"
          height="90%"
          src="https://www.youtube.com/embed/wxt13IZkiK0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> */}
          {/* <ReactFlvPlayer
            url="http://143.248.55.161:8000/live/stream_building.flv"
            height="100%"
            width="100%"
            isMuted={true}
            handleError={(error)=>console.log(error)}
            type="flv"
          /> */}
          <ReactPlayer
                    className='react-player iframe'
                    url={'http://143.248.55.161:8000/live/stream.flv'}    // 플레이어 url
                    width='1000px'         // 플레이어 크기 (가로)
                    height='700px'        // 플레이어 크기 (세로)
                    playing={true}        // 자동 재생 on
                    muted={true}          // 자동 재생 on
                    controls={true}       // 플레이어 컨트롤 노출 여부
                    light={false}         // 플레이어 모드
                    pip={true}
                    enableError={true}
                    onError={(e)=>console.log(e)}      // pip 모드 설정 여부
                    poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}   // 플레이어 초기 포스터 사진
                // 플레이어 끝났을 때 이벤트
                />
                
        </div>
        <div className="div2">
          <div className="div3">
            <Tabs defaultActiveKey="first">
              <Tab eventKey="first" title="Building list">
                <div className="building_list">
                  {buildings?.map((building) => (
                    <Building
                      className="border bg-yellow"
                      onClick={(e) => queryONS(building.id_key)}
                      key={building.name}
                      building={building}
                    />
                  ))}
                </div>
              </Tab>
              <Tab eventKey="second" title="Event list">
                {events.map((event) => (
                  <Event
                    onClick={(e) => queryEPCIS()}
                    key={event.name}
                    event={event}
                  />
                ))}
              </Tab>
            </Tabs>
          </div>
          <img className="autoidLogo" src={autoid} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
