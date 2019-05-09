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

    if (!isGood){
      this.setState({
        descripcion,
        nombre
      })
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

    const nombreGroupClass = classNames('form-control',
      { 'has-error': !nombre.isValid }
    );

    const descripcionGroupClass = classNames('form-control',
      { 'has-error': !descripcion.isValid }
    );
    return (
      <div>
            <form className="form-signin" onSubmit={this.onSubmit} >
              <h4>Alta de alojamiento</h4>

              <div className="form-group row col-md-12" >
                  <label className="col-sm-2 col-form-label">Nombre <span className="required">*</span></label>
                  <div className="col-sm-6" >
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      className={nombreGroupClass}
                      placeholder="Nombre"
                      value={nombre.value}
                      onChange={this.onChange}
                      autoFocus
                    />
                    <span className="required">{nombre.message}</span>
                  </div>
              </div>

              <div className="form-group row col-md-12" >
                  <label className="col-sm-2 col-form-label">Descripción <span className="required">*</span></label>
                  <div className="col-sm-6" >
                    <input
                      type="text"
                      name="descripcion"
                      className="form-control"
                      className={descripcionGroupClass}
                      placeholder="Descripción"
                      value={descripcion.value}
                      onChange={this.onChange}
                    />
                    <span className="required">{descripcion.message}</span>
                  </div>
              </div>

              <div className="form-group row col-md-12">
                  <div className="col-sm-1">
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