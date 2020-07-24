import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Helsinki from "./Helsinki";
import Heading from "./Heading";
import Turku from "./Turku";
import Tampere from "./Tampere";

function AvailableShift() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/shifts")
      .then((res) => res.json())
      .then((data) => {
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

  function handleClick(e) {
    document.getElementById("book").innerHTML = "Cancel";
    document.getElementById("book").style.color = "#e2006a";
    document.getElementById("book").style.borderColor = "#fe93b3";
  }

  function handlePlace() {
    console.log("hi");
  }

  return (
    <div className="container">
      <Helsinki />
    </div>
  );
}

export default AvailableShift;
