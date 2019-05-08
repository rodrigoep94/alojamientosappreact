import React, { Component } from "react";
import classNames from 'classnames';
import validator from 'validator';
 

class AltaAlojamiento extends Component {

  formDefaults = {
    nombre: { value: '', isValid: true, message: '' },
    descripcion: { value:'', isValid: true, message: '' }
  }

  state = {
    ...this.formDefaults
  };

  model = {
    nombre: '',
    descripcion: ''
  }
  
  onChange = (e) => {
    const state = {
      ...this.state,
      [e.target.name]: {
        ...this.state[e.target.name],
        value: e.target.value,
      }
    };

    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    // reset states before the validation procedure is run.
    this.resetValidationStates();
    // run the validation, and if it's good move on.
    if (this.formIsValid()) {
      alert("OK!");
    }
  }

  formIsValid = () => {
    debugger;
    const nombre = { ...this.state.nombre };
    const descripcion = { ...this.state.descripcion };
    let isGood = true;

    if (!nombre.value != ''){
      nombre.isValid = false;
      nombre.message = 'El nombre es requerido';
      isGood = false;
    }

    if (!descripcion.value != ''){
      descripcion.isValid = false;
      descripcion.message = 'La descripción es requerida';
      isGood = false;
    }

    return isGood;
  }

  resetValidationStates = () => {
    // make a copy of everything in state
    const state = JSON.parse(JSON.stringify(this.state));

    /*
    loop through each item in state and if it's safe to assume that only
    form values have an 'isValid' property, we can use that to reset their
    validation states and keep their existing value property. This process
    makes it easy to set all validation states on form inputs in case the number
    of fields on our form grows in the future.
    */
    Object.keys(state).map(key => {
      if (state[key].hasOwnProperty('isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });

    this.setState(state);
  }

  resetForm = () => {
    this.setState(...this.formDefaults);
  }

  render() {
    const { nombre, descripcion } = this.state;

    const nombreGroupClass = classNames('form-group',
      { 'has-error': !nombre.isValid }
    );

    const descripcionGroupClass = classNames('form-group',
      { 'has-error': !descripcion.isValid }
    );
    return (
      <div>
      <span>{nombre.message}</span>
            <form className="form-signin" onSubmit={this.onSubmit} >
              <h4>Alta de alojamiento</h4>

              <div class="form-group row col-md-12" className={nombreGroupClass}>
                  <label class="col-sm-2 col-form-label">Nombre</label>
                  <div class="col-sm-6" >
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      placeholder="Nombre"
                      value={nombre.value}
                      onChange={this.onChange}
                      autoFocus
                    />
                    <span className="help-block">{nombre.message}</span>
                  </div>
              </div>

              <div class="form-group row col-md-12" className={descripcionGroupClass}>
                  <label class="col-sm-2 col-form-label">Descripción</label>
                  <div class="col-sm-6" >
                    <input
                      type="text"
                      name="descripcion"
                      className="form-control"
                      placeholder="Descripción"
                      value={descripcion.value}
                      onChange={this.onChange}
                    />
                    <span className="help-block">{descripcion.message}</span>
                  </div>
              </div>

              <div class="form-group row col-md-12">
                  <div class="col-sm-1">
                    <button
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                    >
                      Crear
                    </button>
                </div>
              </div>
            </form>
          </div>
    );
  }
}
 
export default AltaAlojamiento;