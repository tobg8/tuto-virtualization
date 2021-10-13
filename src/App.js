import React, { useState, useEffect } from 'react';
import './App.css';

import faker from 'faker';

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    setPeople(
      [...Array(1000).keys()].map(key => {
        return {
          id: key,
          name: faker.name.firstName(),
          phoneNumber: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          bio: faker.lorem.lines(Math.random() * 100 ),
        }
      })
    )
  }, []);

  return (
    <div className="App">
      <ul>
        {people.map((element) => (
          <li key={element.id}>
            <h2>{element.name}</h2>
            <div className="ok">
              <p>phone-number : {element.phoneNumber}</p>
              <p>address : {element.address}</p>
            </div>
          </li>))}
      </ul>
    </div>
  );
}

export default App;
