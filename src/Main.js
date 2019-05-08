import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import AltaAlojamiento from "./AltaAlojamiento";
  import ListadoAlojamientos from "./ListadoAlojamientos";

class Main extends Component {
  render() {
    return (
        <HashRouter>
        <div>
          <h1>Alojamientos</h1>
          <ul className="header">
            <li><NavLink exact to="/">Inicio</NavLink></li>
            <li><NavLink exact to="/altaAlojamientos">Alta de alojamientos</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/altaAlojamientos" component={AltaAlojamiento}/>
            <Route exact path="/" component={ListadoAlojamientos}/>
             
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;