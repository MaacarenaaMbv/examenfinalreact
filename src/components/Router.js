import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Home from './Home';
import NewPersonaje from './NewPersonaje';
import Personajes from './Personajes';
import UpdatePersonajes from './UpdatePersonajes';
import BarraNavegacion from './BarraNavegacion';
import DetallesSerie from './DetallesSerie';

export default class Router extends Component {

  render() {

    function DetallesSerieElement(){
        var {idserie} = useParams();
        return (<DetallesSerie idserie={idserie}/>)
    }

    function PersonajesElement(){
        var {idserie} = useParams();
        return (<Personajes idserie={idserie}/>)
    }

    return (
      <BrowserRouter>
      <BarraNavegacion/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/newpersonaje' element={<NewPersonaje/>}/>
        <Route path='/detallesSerie/:idserie' element={<DetallesSerieElement/>}/>
        <Route path='/personajes/:idserie' element={<PersonajesElement/>}/>
        <Route path='/updatepersonajes' element={<UpdatePersonajes/>}/>
      </Routes>
      </BrowserRouter>
    )
  }
}
