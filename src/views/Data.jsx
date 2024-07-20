import React, { useEffect, useState } from "react";
import axios from "axios";

const Data = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get("http://localhost:5000/items")
      .then((response) => {
        setItems(response.data); // Set the data to state
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.Id_User}>
              <td>{item.Email}</td>
              <td>{item.Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
