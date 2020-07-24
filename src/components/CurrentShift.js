import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CurrentShift() {
  const [myItem, setMyItem] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/shifts")
      .then((res) => res.json())
      .then((data) => {
        setMyItem(data);
      });
  }, []);

  function deleteShift(id) {
    axios
      .post(`http://127.0.0.1:8080/shifts/${id}/cancel`)
      .then((res) => console.log(res));
    const newList = myItem.filter((item) => item.id !== id);
    setMyItem(newList);
  }

  return (
    <div className="container">
      <ul className="date">
        {myItem.map((thing) => {
          if (thing.booked) {
            var a = new Date(thing.startTime * 1000);
            var b = new Date(thing.endTime * 1000);
            let utcString1 = a.toUTCString();
            let utcString2 = b.toUTCString();
            let date1 = utcString1.slice(5, 11);
            let date2 = utcString2.slice(5, 11);
            let time1 = utcString1.slice(18, 23);
            let time2 = utcString2.slice(18, 23);
            if (time1 === time2) {
              var diff1 = Math.abs(parseInt(date1) - parseInt(date2));
            }
            if (time1 > time2) {
              var diff = Math.abs(parseInt(time1) - parseInt(time2 + 12));
            }
            var diff = Math.abs(parseInt(time1) - parseInt(time2));

            return (
              <li key={thing.id}>
                {date1}-{date2}
                <span className="diff">
                  1 shift, {time1 === time2 ? diff1 + "d" : diff + "h"}
                </span>
                <span
                  className="currentTime"
                  styles={{ display: thing.booked ? "block" : "none" }}
                >
                  <ul>
                    <li id="listLength">
                      <span>
                        <h6>
                          {time1}-{time2}
                        </h6>
                        <span>{thing.area}</span>
                      </span>
                      <span>
                        <button onClick={() => deleteShift(thing.id)}>
                          Cancel
                        </button>
                      </span>
                    </li>
                  </ul>
                </span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
