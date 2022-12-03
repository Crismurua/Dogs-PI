import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateDog from "./components/CreateDog/CreateDog";
import DogCards from "./components/DogCards/DogCards";
import DogDetail from "./components/DogDetail/DogDetail";
import Nav from "./components/Nav/Nav";
import Container from "@material-ui/core/Container";


function App() {
  return (
    <Container>
      <Route path='/dogs' component={() => <Nav />}/>
      <Switch>
        <Route exact path='/dogs' component={() => <DogCards />}/>
        <Route exact path='/dogs/:id' component={() => <DogDetail />}/>
        <Route exact path='/create' component={() => <CreateDog />}/>
      </Switch>
    </Container>
  );
}

export default App;
