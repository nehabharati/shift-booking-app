import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Turku(props) {
  const [turku, setTurku] = useState([]);
  const [places, setPlaces] = useState([]);
  const [index, setIndex] = useState(-1);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/shifts")
      .then((res) => res.json())
      .then((data) => {
        //Turku
        let tuData = data.filter((i) => i.area === "Turku");
        setTurku(
          tuData.map((i) => {
            return {
              startTime: i.startTime,
              endTime: i.endTime,
              id: i.id,
              booked: i.booked,
            };
          })
        );

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

  function handleToggle(id) {
    setIndex(id);
    axios
      .post(`http://127.0.0.1:8080/shifts/${id}/book`)
      .then((res) => console.log(res));
  }

  const unique = turku
    .map((i, j) => i)
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => turku[e])
    .map((e) => turku[e]);

  const styles = {
    listItem: {
      color: "#16a64d",
      borderColor: "#55cb82",
    },
    listItemClicked: {
      color: "#e2006a",
      borderColor: "#fe93b3",
    },
    booked: {
      color: "#e2006a",
      borderColor: "#fe93b3",
      opacity: "0.5",
    },
  };

  return (
    <div className="container">
      <ul className="place">
        {places.map((place, i) => {
          return place === "Helsinki" ? (
            <Link
              key={i}
              to={"/helsinki"}
              className="link active"
              // style={{
              //   backgroundColor: index === i ? "#a4b8d3" : "#f7f8fb",
              //   color: index === i ? "#fff" : "004fb4",
              //   padding: index === i ? "0.2em" : "0",
              //   borderRadius: index === i ? "5px" : "0",
              // }}
            >
              <span>Helsinki</span>
            </Link>
          ) : place === "Turku" ? (
            <Link
              key={i}
              to={"/turku"}
              className="link active"
              // style={{
              //   backgroundColor: index === i ? "#a4b8d3" : "#f7f8fb",
              //   color: index === i ? "#fff" : "004fb4",
              //   padding: index === i ? "0.2em" : "0",
              //   borderRadius: index === i ? "5px" : "0",
              // }}
            >
              Turku
            </Link>
          ) : (
            <Link
              key={i}
              to={"/tampere"}
              className="link active"
              // style={{
              //   backgroundColor: index === i ? "#a4b8d3" : "#f7f8fb",
              //   color: index === i ? "#fff" : "004fb4",
              //   padding: index === i ? "0.2em" : "0",
              //   borderRadius: index === i ? "5px" : "0",
              // }}
            >
              Tampere
            </Link>
          );
        })}
      </ul>
      <ul className="stats">
        {unique.map((i) => {
          var a = new Date(i.startTime * 1000);
          var b = new Date(i.endTime * 1000);
          let utcString1 = a.toUTCString();
          let utcString2 = b.toUTCString();
          let date1 = utcString1.slice(5, 11);
          let date2 = utcString2.slice(5, 11);
          let time1 = utcString1.slice(18, 23);
          let time2 = utcString2.slice(18, 23);
          return (
            <li key={i.id} className="date">
              {date1}-{date2}
              <ul className="time">
                <li className="listItem">
                  <span>
                    {time1}-{time2}
                  </span>
                  <span>
                    {i.booked ? (
                      <button
                        id="book"
                        onClick={() => handleToggle(i.id)}
                        style={styles.booked}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        id="book"
                        onClick={() => handleToggle(i.id)}
                        style={
                          index === i.id
                            ? styles.listItemClicked
                            : styles.listItem
                        }
                      >
                        {/* {loading && <img src="../images/spinner_green.svg" />} */}
                        Book
                      </button>
                    )}
                  </span>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
