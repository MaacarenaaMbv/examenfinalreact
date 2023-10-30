import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink,Navigate } from 'react-router-dom';

export default class UpdatePersonajes extends Component {
    state = {
        series: [],
        personajes: [],
        statusSeries: false,
        statusPerson: false,
        statusUpdate: false,
        mensaje: "",
        serie: {},
        personaje: {},
        statusSeleccionado: false,
        statusSeleccionadoPersonaje: false,
    }

    selectSerie = React.createRef();
    selectPersonaje = React.createRef();

    loadSeries = () => {
        var request = "api/series";
        var url = Global.apiSeries + request;
        axios.get(url).then(response => {
            this.setState({
                series: response.data,
                statusSeries: true
            })
        })
    }

    loadSerieId = () => {
        var request = "api/series/" + this.selectSerie.current.value;
        var url = Global.apiSeries + request;
        axios.get(url).then(response => {
            this.setState({
                serie: response.data,
                statusSeleccionado: true
            })
        })  
    }

    loadPersonajeId = () => {
        var request = "api/personajes/" + this.selectPersonaje.current.value;
        var url = Global.apiSeries + request;
        axios.get(url).then(response => {
            this.setState({
                personaje: response.data,
                statusSeleccionadoPersonaje: true
            })
        })
    }

    loadPersonajes = () => {
        var request = "api/personajes";
        var url = Global.apiSeries + request;
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                statusPerson: true
            })
        })
    }
    
    guardarCambios = (e) => {
        e.preventDefault();
        var request = "api/personajes/" + parseInt(this.selectPersonaje.current.value) + "/" + this.selectSerie.current.value;
        var url = Global.apiSeries + request;
        console.log(url)
        axios.put(url).then(response => {
            this.setState({
                statusUpdate: true,
                mensaje: "Se ha realizado el cambio correctamente"
            })
        })

    }

    componentDidMount = () => {
        this.loadSeries();
        this.loadPersonajes();
    }

    handleSerieChange = () => {
        // Llamar a loadSerieId cuando cambie la selección de la serie
        this.loadSerieId();
    }

    handlePersonajeChange = () => {
        // Llamar a loadPersonajeId cuando cambie la selección del personaje
        this.loadPersonajeId();
    }



  render() {
    return (
      <div>
        {
            this.state.statusUpdate == true &&
            (<Navigate to={"/personajes/" + this.selectSerie.current.value}/>)
        }
        <h1 style={{color: "blue"}}>Personajes y series</h1>
        <form>
            <label>Seleccione una serie: </label><br/>
            <select ref={this.selectSerie} onChange={this.handleSerieChange}>
            {
                this.state.statusSeries == true &&
                (
                    this.state.series.map((serie, index) => {
                        return(
                            <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                        )
                    })
                )
            }
            </select><br/>
            <label>Seleccione un personaje: </label><br/>
            <select ref={this.selectPersonaje} onChange={this.handlePersonajeChange}>
            {
                this.state.statusPerson == true &&
                (
                    this.state.personajes.map((personaje, index) => {
                        return(
                            <option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>
                        )
                    })
                )
            }
            </select><br/>
        </form><br/>
        <NavLink className='btn btn-info' onClick={this.guardarCambios}>Guardar cambios</NavLink>
            {
                this.state.statusSeleccionado == true &&
                (
                    <div>
                        <h1>{this.state.serie.nombre}</h1>
                        <img style={{width: "150px", height: "150px"}} src={this.state.serie.imagen}/>
                    </div>
                )

            }
            {
                this.state.statusSeleccionadoPersonaje == true &&
                (
                    <div>
                        <h1>{this.state.personaje.nombre}</h1>
                        <img style={{width: "150px", height: "150px"}} src={this.state.personaje.imagen}/>
                    </div>
                )

            }

      </div>
    )
  }
}
