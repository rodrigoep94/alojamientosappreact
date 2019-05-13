import React, { Component } from "react";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import axios from "axios";
 
class ListadoAlojamientos extends Component {
  state = {
    alojamientos: []
  };

  deleteAlojamieto(idAlojamiento){
    if (window.confirm("¿Está seguro que quiere eliminar el alojamiento?")){
      axios
        .put("http://localhost:9090/alojamiento/delete/" + idAlojamiento.toString())
        .then(response => {
          this.getAlojamientos();
        })
    }
  }

  getAlojamientos(){
    axios
    .get("https://alojapp-backend.herokuapp.com/alojamiento/get")
    .then(response => {
      const newData = response.data.map(c => {
        return {
          id: c.id,
          nombre: c.nombre,
          descripcion: c.descripcion,
          categoria: c.categoria,
          provincia: c.ubicacion.provincia,
          localidad: c.ubicacion.localidad,
          direccion: c.ubicacion.direccion
        };
      });
      const newState = Object.assign({}, this.state, {
        alojamientos: newData
      });
      this.setState(newState);
    })
    .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getAlojamientos();
  };

  render() {
    const columns = [{
      Header: 'Id',
      accessor: 'id',
      show: false
    },{
      Header: 'Nombre',
      accessor: 'nombre' // String-based value accessors!
    }, {
      Header: 'Descripcion',
      accessor: 'descripcion'
    }, {
      Header: 'Categoria',
      accessor: 'categoria' // Custom value accessors!
    }, {
      Header: 'Provincia',
      accessor: 'provincia' // Custom value accessors!
    }, {
      Header: 'Localidad',
      accessor: 'localidad' // Custom value accessors!
    }, {
      Header: 'Dirección',
      accessor: 'direccion' // Custom value accessors!
    }, {
      Header: 'Eliminar',
      Cell: row => (
        <div className="clickeable-icon">
          <i className="far fa-trash-alt" onClick={() => this.deleteAlojamieto(row.original.id)}></i>
        </div>
    )}]
   
    return <ReactTable
      data={this.state.alojamientos}
      columns={columns}
      defaultPageSize={5}
      previousText={'Anterior'}
      nextText={'Siguiente'}
      pageText={'Página'}
      ofText={'de'}
      rowsText={'filas'}
    />
  }
}
 
export default ListadoAlojamientos;