import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Helsinki(props) {
  const [helsinki, setHelsinki] = useState([]);
  const [places, setPlaces] = useState([]);
  const [index, setIndex] = useState(-1);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/shifts").then((data) => {
      //Helsinki
      let hData = data.data.filter((i) => i.area === "Helsinki");
      setHelsinki(
        hData.map((i) => {
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
        l = data.data.length;
      for (let i = 0; i < l; i++) {
        if (flags[data.data[i].area]) continue;
        flags[data.data[i].area] = true;
        output.push(data.data[i].area);
      }
      setPlaces(places.concat(output));
    });
  }, []);

  function handleToggle(id) {
    let status = document.getElementById("book");
    axios
      .post(`http://127.0.0.1:8080/shifts/${id}/book`)
      .then((res) => {
        setIndex(id);

        if (res.data.booked) {
          setBooking(true);
          status.innerHTML = "Cancel";
        }
      })
      .catch((error) => {
        let condition =
          error.response.data.message === `Shift ${id} is already booked` ||
          error.response.data.message === "Cannot book an overlapping shift" ||
          error.response.data.message === "Shift is already finished";
        setIndex(id);
        if (condition && index === id) {
          status.disabled = true;
        }
      });
  }

  const unique = helsinki
    .map((i) => i)
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => helsinki[e])
    .map((e) => helsinki[e]);

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
            <Link key={i} to={"/helsinki"}>
              <li>Helsinki</li>
            </Link>
          ) : place === "Turku" ? (
            <Link key={i} to={"/turku"}>
              <li>Turku</li>
            </Link>
          ) : (
            <Link key={i} to={"/tampere"}>
              <li>Tampere</li>
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
                    <button
                      id="book"
                      onClick={() => handleToggle(i.id)}
                      style={
                        booking && index === i.id
                          ? styles.booked
                          : styles.listItem
                      }
                    >
                      {booking && index === i.id ? "Cancel" : "Book"}
                    </button>
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

export default Helsinki;
