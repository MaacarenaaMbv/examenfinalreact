import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';

export default class NewPersonaje extends Component {

    state = {
        series: [],
        status: false,
        statusInsert: false,
        mensaje: ""
    }

    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSerie = React.createRef();

    insertarPersonaje = (e) => {
        e.preventDefault();
        var request = "api/Personajes";
        var url = Global.apiSeries + request;
        var idPersonaje = 0;
        var nombre = this.cajaNombre.current.value;
        var imagen = this.cajaImagen.current.value;
        var serie = parseInt(this.selectSerie.current.value);
        var personaje = {
            idPersonaje: idPersonaje,
            nombre: nombre,
            imagen: imagen,
            idSerie: serie
        }

        axios.post(url, personaje).then(response => {
            this.setState({
                statusInsert: true,
                mensaje: "Insertado Correctamente!!"
            })
        })
        console.log(personaje)
    }

    loadSeries = () => {
        var request = "api/series";
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
        {
            this.state.statusInsert == true &&
            <h2 style={{color: "red"}}>{this.state.mensaje}</h2>
        }
        <h1>Nuevo Personaje</h1>
        <form>
            <label>Nombre: </label>
            <input type='text' className='form-control' ref={this.cajaNombre}/><br/>
            <label>Imagen: </label>
            <input type='text' className='form-control' ref={this.cajaImagen}/><br/>
            <label>Serie: </label><br/>
            <select ref={this.selectSerie}>
                {
                    this.state.status == true &&
                    (
                        this.state.series.map((serie, index) => {
                            return (
                                <option key={index} value={serie.idSerie}> {serie.nombre} </option>
                            )
                        })
                    )
                }
            </select>
            <br/>
        </form><br/>
        <button className='btn btn-success' onClick={this.insertarPersonaje}>Insertar Personaje</button>
      </div>
    )
  }
}
