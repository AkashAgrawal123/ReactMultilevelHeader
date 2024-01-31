import React, { useEffect, useState } from "react";
import axios from "./axiosMockAdapter";

const YourReactComponent = () => {
  const [data, setData] = useState([]);

  const endpointsData = JSON.parse(
    document.querySelector('script[data-config-id="endpoints"]').textContent
  );

  useEffect(() => {
    if (!endpointsData || !endpointsData.user) {
      return;
    }

    axios
      .get(endpointsData.user)
      .then((response) => {
        console.log(response.data.users);
        setData(response.data.users);
      })
      .catch((error) => {
        console.log("error aa gayi", error);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Users</h1>
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              <p>{user.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default YourReactComponent;
