import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Personajes extends Component {
    state = {
        personajes: [],
        status: false
    }

    loadPersonajes = () => {
        var request ="api/Series/PersonajesSerie/" + this.props.idserie;
        var url = Global.apiSeries + request;
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadPersonajes();
    }

  render() {
    return (
      <div>
        <NavLink className='btn btn-danger' to={"/detallesSerie/" + this.props.idserie}>Volver</NavLink>
        <table className='table table-bordered'>
        <thead>
            <tr>
                <th>Personaje</th>
                <th>Imagen</th>
            </tr>
        </thead>
        <tbody>
            {
                this.state.status == true && 
                (
                    this.state.personajes.map((personaje, index) => {
                        return(
                            <tr key={index}>
                                <td>{personaje.nombre}</td>
                                <td><img src={personaje.imagen} style={{width: "100px", height: "100px"}}/></td>
                            </tr>
                        )
                    })
                )
            }
        </tbody>
        </table>
      </div>
    )
  }
}
