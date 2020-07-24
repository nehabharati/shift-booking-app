import React, { useEffect, useState } from "react";
import Helsinki from "./Helsinki";

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

  return (
    <div className="container">
      <Helsinki />
    </div>
  );
}

export default AvailableShift;
