import React, { Component } from "react";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import axios from "axios";
 
class ListadoAlojamientos extends Component {
  state = {
    alojamientos: []
  };

  componentDidMount() {
    axios
    //.get("https://alojapp-backend.herokuapp.com/alojamiento/get")
    .get("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      const newData = response.data.map(c => {
        return {
          id: c.id,
          name: c.name,
          username: c.username
        };
      });
      const newState = Object.assign({}, this.state, {
        alojamientos: newData
      });
      this.setState(newState);
    })
    .catch(error => console.log(error));
  };

  render() {
    const columns = [{
      Header: 'Id',
      accessor: 'id' // String-based value accessors!
    }, {
      Header: 'Nombre',
      accessor: 'name'
    }, {
      Header: 'Nombre de Usuario',
      accessor: 'username' // Custom value accessors!
    }]
   
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