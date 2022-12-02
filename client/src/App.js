import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateDog from "./components/CreateDog/CreateDog";
import DogCards from "./components/DogCards/DogCards";
import DogDetail from "./components/DogDetail/DogDetail";
import Nav from "./components/Nav/Nav";


function App() {
  return (
    <div className="App">
      <Route path='/dogs' component={() => <Nav />}/>
      <Switch>
        <Route exact path='/dogs' component={() => <DogCards />}/>
        <Route exact path='/dogs/:id' component={() => <DogDetail />}/>
        <Route exact path='/create' component={() => <CreateDog />}/>
      </Switch>
    </div>
  );
}

export default App;
