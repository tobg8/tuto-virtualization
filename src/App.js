import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import faker from 'faker';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';

const App = () => {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  const [people, setPeople] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setPeople(
      [...Array(10000).keys()].map(key => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>{time.toISOString()}</h1>
      <div style={{width: "100%", height: "90vh"}}>
        <AutoSizer>
          {({width, height}) => (
            <List
            width={width}
            height={height}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            rowCount={people.length}
            rowRenderer={ ({key, index, style, parent}) => {
              const person = people[index];

              return (
                <CellMeasurer
                  key={key}
                  cache={cache.current}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  <div key={key} style={style}>
                    <h2>{person.name}</h2>
                    <p>{person.bio}</p>
                  </div>
                </CellMeasurer>
              );
            }}
          />
          )}
        </AutoSizer>
      </div>
      {/* <ul>
        {people.map((element) => (
          <li key={element.id}>
            <h2>{element.name}</h2>
            <div className="ok">
              <p>phone-number : {element.phoneNumber}</p>
              <p>address : {element.address}</p>
            </div>
          </li>))}
      </ul> */}
    </div>
  );
}

export default App;
