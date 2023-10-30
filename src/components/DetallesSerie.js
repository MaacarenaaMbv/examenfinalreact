import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class DetallesSerie extends Component {
    state = {
        serie: {},
        status: false
    }
    
    loadSerieDetails = () => {
        var request = "api/Series/" + this.props.idserie;
        var url = Global.apiSeries + request;
        axios.get(url).then(response => {
            this.setState({
                serie: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadSerieDetails();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idserie != this.props.idserie){
            this.loadSerieDetails();
        }
    }

  render() {
    return (
      <div>
        <h1>Serie: {this.props.idserie}</h1>
        {
            this.state.status == true &&
            (
                <h2>{this.state.serie.nombre}</h2>
            )
        }

        <table className='table table-bordered' style={{textAlign: "center", width: "75%", margin: "0 auto"}}>
            <thead>
                <tr><th>{this.state.serie.nombre}</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <img src={this.state.serie.imagen} style={{width:"150px", height:"150px"}}/>
                        <p>{this.state.serie.nombre}</p>
                        <p>IMDB: {this.state.serie.puntuacion}</p>
                        <NavLink className='btn btn-success' to={"/personajes/" + this.state.serie.idSerie}>Personajes</NavLink>
                    </td>
                </tr>
            </tbody>
        </table>
        
      </div>
    )
  }
}
