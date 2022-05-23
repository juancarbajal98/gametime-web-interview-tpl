import React, { useEffect, useState } from 'react';
import logo from './Gametime_logo.png';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([])
  let results = ``
  useEffect(() => {
    // get results
    const loadResults = async() => {
      const response = await axios.get('https://mobile-staging.gametime.co/v1/search?q=oakland')
      // console.log(response.data)

      // construct HTML to update view with results
      let result_entity_pattern = {0: 'events', 1: 'performers', 2:'venues'}
      for(let i =0; i <3;i++){
        for(let j=0;j<3;j++){
          let current_result = response.data[result_entity_pattern[i]][j]
          if(current_result === undefined) continue
          console.log(current_result)
          switch(result_entity_pattern[i]){
            case 'events':
              results += `<img src="${current_result.performers[0].hero_image_url}">`
              results += `<p>${current_result.event.name}</p>`
              results += `<p>${current_result.venue.name}</p>`
              break
          case 'performers':
            results += `<img src="${current_result.hero_image_url}">`
            results += `<p>${current_result.name}</p>`
            results += `<p>${current_result.category}</p>`
            break
          case 'venues':
            results += `<img src="${current_result.image_url}">`
            results += `<p>${current_result.name}</p>`
            results += `<p>${current_result.city}</p>`
            break
          }
        }
      }
    }
    loadResults();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <div className="App-searchBar">
          <input className ="App-searchInput" type="text"></input>
          <div className="App-searchResults">
          {results}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
