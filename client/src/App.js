import React from "react";
import { Route, Switch } from "react-router-dom";
import DogCards from "./components/DogCards/DogCards";
import DogDetail from "./components/DogDetail/DogDetail";


function App() {
  return (
    <div className="App">
      <Route exact path='/dogs' component={() => <DogCards />}/>
      <Route exact path='/dogs/:id' component={() => <DogDetail />}/>
    </div>
  );
}

export default App;
