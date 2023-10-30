import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

export default class BarraNavegacion extends Component {
    state = {
        series: [],
        status: false
    }

    loadSeries = () => {
        var request = "api/Series";
        var url = Global.apiSeries + request;
        axios.get(url).then(response => {
            this.setState({
                series: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              Home
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/newpersonaje">
                    Nuevo Personaje
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/updatepersonajes">
                    Modificar Personajes
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="/"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Series
                  </NavLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    {
                        this.state.status == true &&
                        (
                            this.state.series.map((serie, index) => {
                                return(
                                    <li key={index}>
                                        <NavLink className="dropdown-item" to={"/detallesSerie/" + serie.idSerie}>
                                            {serie.nombre}
                                        </NavLink>
                                    </li>
                                )
                            })
                        )
                    }
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
