import React, { Component } from "react";
import classNames from 'classnames';
import Select from 'react-select';
import Rating from 'react-rating';
 
const tiposAlojamiento = [
  { value: 'HOTEL', label: 'Hotel' },
  { value: 'POSADA', label: 'Posada' },
  { value: 'CABANA', label: 'Cabaña' },
  { value: 'OTRO', label: 'Otro' }
];

class AltaAlojamiento extends Component {

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeTipoAlojamiento = this.onChangeTipoAlojamiento.bind(this);
  }

  formDefaults = {
    nombre: { value: '', isValid: true, message: '' },
    descripcion: { value:'', isValid: true, message: '' },
    tipoAlojamiento: { value:'', isValid: true, message: '' },
    categoria: { value:'', isValid: true, message: '' },
    provincia: { value:'', isValid: true, message: '' },
    localidad: { value:'', isValid: true, message: '' },
    direccion: { value:'', isValid: true, message: '' }
  }

  state = {
    ...this.formDefaults
  };
  
  onChange = (e) => {
    debugger;
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
    const tipoAlojamiento = { ...this.state.tipoAlojamiento };
    const categoria = { ...this.state.categoria };
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

    if (!tipoAlojamiento.value != ''){
      tipoAlojamiento.isValid = false;
      tipoAlojamiento.message = 'El tipo de alojamiento es requerido';
      isGood = false;
    }
    
    if (!categoria.value != ''){
      categoria.isValid = false;
      categoria.message = 'La categoría es requerida';
      isGood = false;
    }

    if (!isGood){
      this.setState({
        descripcion,
        nombre,
        tipoAlojamiento,
        categoria
      })
    }

    return isGood;
  }

  onChangeRating(v){
    var categoriaState = this.state.categoria;
    categoriaState.value = v;
    this.setState({categoriaState});
  }

  onChangeTipoAlojamiento(v){
    var alojamientoState = this.state.tipoAlojamiento;
    alojamientoState.value = v.value;
    this.setState({alojamientoState});
    console.log(this.state);
  }

  resetValidationStates = () => {
    // make a copy of everything in state
    const state = JSON.parse(JSON.stringify(this.state));
    
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
    const { nombre, descripcion, tipoAlojamiento, categoria, provincia, localidad, direccion } = this.state;

    const nombreGroupClass = classNames('form-control',
      { 'has-error': !nombre.isValid }
    );

    const descripcionGroupClass = classNames('form-control',
      { 'has-error': !descripcion.isValid }
    );

    const tipoAlojamientoGroupClass = classNames('',
      { 'has-error': !tipoAlojamiento.isValid }
    );

    const categoriaGroupClass = classNames('',
      { 'has-error': !categoria.isValid }
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

              <div className="form-group row col-md-12" >
                  <label className="col-sm-2 col-form-label">Tipo de Alojamiento <span className="required">*</span></label>
                  <div className="col-sm-6" >
                    <Select options={tiposAlojamiento}
                      className={tipoAlojamientoGroupClass}
                      name="tipoAlojamiento"
                      id="tipoAlojamiento"
                      placeholder="Tipo de Alojamiento"
                      onChange={this.onChangeTipoAlojamiento} />
                    <span className="required">{tipoAlojamiento.message}</span>
                  </div>
              </div>

              <div className="form-group row col-md-12" >
                  <label className="col-sm-2 col-form-label">Categoría <span className="required">*</span></label>
                  <div className="col-sm-6" >
                    <Rating
                      name = "categoria"
                      initialRating={categoria.value}
                      className = {categoriaGroupClass}
                      onChange={this.onChangeRating}
                    />
                    <span className="required">{categoria.message}</span>
                  </div>
              </div>

              <div className="form-group row col-md-12" >
                  <label className="col-sm-2 col-form-label">Provincia <span className="required">*</span></label>
                  <div className="col-sm-6" >
                    <Select/>
                    <span className="required">{categoria.message}</span>
                  </div>
              </div>

              <div className="form-group row col-md-12" >
                  <label className="col-sm-2 col-form-label">Localidad <span className="required">*</span></label>
                  <div className="col-sm-6" >
                    <Select/>
                    <span className="required">{categoria.message}</span>
                  </div>
              </div>

              <div className="form-group row col-md-12" >
                  <label className="col-sm-2 col-form-label">Direccion <span className="required">*</span></label>
                  <div className="col-sm-6" >
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      className={nombreGroupClass}
                      placeholder="Dirección"
                      value={nombre.value}
                      onChange={this.onChange}
                      autoFocus
                    />
                    <span className="required">{categoria.message}</span>
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