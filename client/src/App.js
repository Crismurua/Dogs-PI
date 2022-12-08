import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateDog from "./components/CreateDog/CreateDog";
import DogCards from "./components/DogCards/DogCards";
import DogDetail from "./components/DogDetail/DogDetail";
import Nav from "./components/Nav/Nav";
import Container from "@material-ui/core/Container";
import Landing from "./components/Landing/Landing";
import EditDog from "./components/EditDog/EditDog";
import { ThemeProvider, createTheme, CssBaseline, IconButton } from "@material-ui/core";
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  darkmode: {
          position:"absolute",
          margin:10,
         
  },
}));



function App() {

  const [dark, setDark] = React.useState(false);
  const classes = useStyles();


  const theme = createTheme({
    palette: {
      type: dark ? 'dark' : 'light',
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconButton className={classes.darkmode} edge='start' color="inherit" onClick={()=> setDark(!dark)}>
        {!dark ? <RiMoonLine /> : <RiSunLine />}
      </IconButton>
        <Container>
          <Route exact path='/' component={() => <Landing />}/>
          <Route path='/dogs' component={() => <Nav />}/>      
          <Switch>
            <Route exact path='/dogs' component={() => <DogCards />}/>
            <Route exact path='/dogs/:id' component={() => <DogDetail />}/>
            <Route exact path='/create' component={() => <CreateDog />}/>
            <Route exact path='/edit/:id' component={() => <EditDog />}/>
          </Switch>
        </Container>
    </ThemeProvider>
  );
}

export default App;
