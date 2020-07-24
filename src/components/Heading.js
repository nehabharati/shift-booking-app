import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Helsinki from "./Helsinki";
import Turku from "./Turku";
import Tampere from "./Tampere";

function AvailableShift() {
  const [bookingTime, setBookingTime] = useState([]);
  const [bookingDay, setBookingDay] = useState([]);
  const [myItem, setMyItem] = useState([]);
  const [places, setPlaces] = useState([]);
  const [helsinki, setHelsinki] = useState([]);
  const [turku, setTurku] = useState([]);
  const [tampere, setTampere] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/shifts")
      .then((res) => res.json())
      .then((data) => {
        setMyItem(data);
        var flags = [],
          output = [],
          l = data.length;
        for (let i = 0; i < l; i++) {
          if (flags[data[i].area]) continue;
          flags[data[i].area] = true;
          output.push(data[i].area);
        }
        setPlaces(places.concat(output));
      });
  }, []);

  return (
    <div className="container">
      <ul className="place">
        {places.map((place, i) => {
          return place === "Helsinki" ? (
            <Link key={i} to={"/helsinki"}>
              Helsinki
            </Link>
          ) : place === "Turku" ? (
            <Link key={i} to={"/turku"}>
              Turku
            </Link>
          ) : (
            <Link key={i} to={"/tampere"}>
              Tampere
            </Link>
          );
        })}
      </ul>
      <Helsinki />
    </div>
  );
}

export default AvailableShift;
