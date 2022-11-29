import React from "react";
import { Route, Switch } from "react-router-dom";
import DogCards from "./components/DogCards/DogCards";


function App() {
  return (
    <div className="App">
      <Route exact path='/dogs' component={() => <DogCards />}/>
    </div>
  );
}

export default App;
