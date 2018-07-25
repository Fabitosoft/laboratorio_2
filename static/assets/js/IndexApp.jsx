import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "./01_actions/01_index";
import Loading from "./00_utilities/components/system/loading_overlay";
import CargarDatos from "./00_utilities/components/system/cargar_datos";
import {Link, Redirect} from 'react-router-dom'

const Boton = (props) => {
    const {nombre, icono, link} = props;
    return (
        <div className='col-6 col-md-4 mt-3 boton-index'>
            <Link to={link}>
                <div className='icono'>
                    <div className="row">
                        <div className="col-12"><i className={`${icono} fa-3x`}></i></div>
                        <div className="col-12">{nombre}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
};

class IndexApp extends Component {
    constructor(props) {
        super(props);
        this.cargarDatos = this.cargarDatos.bind(this);
        this.error_callback = this.error_callback.bind(this);
    }

    componentDidMount() {
        this.cargarDatos()
    }

    error_callback(error) {
        this.props.notificarErrorAjaxAction(error);
    }

    notificar(mensaje) {
        this.props.notificarAction(mensaje);
    }


    cargarDatos() {
        this.props.cargando();
        this.props.fetchMiCuenta(() => this.props.noCargando(), this.error_callback);
    }

    render() {
        const mi_cuenta = JSON.parse(localStorage.getItem('mi_cuenta'));
        if (mi_cuenta.es_entidad) {
            return <Redirect to='/app/entidades/'/>
        } else {
            const {is_staff, is_superuser} = mi_cuenta;
            return <Loading>
                <div className="mt-3">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-12 p-5">
                                <img className='img-fluid' width='300px' src={`${img_static_url}/logo.png`} alt=""/>
                            </div>
                            <Boton
                                nombre='Mi Cuenta'
                                link='/app/mi_cuenta/'
                                icono='fas fa-sliders-h'
                            />
                            {
                                (is_staff || is_superuser) &&
                                <Boton
                                    nombre='Admin'
                                    link='/app/admin/'
                                    icono='fas fa-cogs'
                                />
                            }
                            <Boton
                                nombre='Ordenes'
                                link='/app/ordenes/'
                                icono='fab fa-wpforms'
                            />
                            <Boton
                                nombre='Resultados'
                                link='/app/resultados/'
                                icono='fas fa-vial'
                            />
                            <div className="col-4"></div>
                            <div className="col-4 boton-index mt-4">
                                <div className='icono puntero' onClick={() => this.props.logout()}>
                                    <div className="row">
                                        <div className="col-12"><i className={`fas fa-sign-out-alt`}></i></div>
                                        <div className="col-12">Salir</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4"></div>
                            <CargarDatos cargarDatos={this.cargarDatos}/>
                        </div>
                    </div>

                </div>
            </Loading>
        }
    }
}

function mapPropsToState(state, ownProps) {
    return {
        mis_permisos: state.mis_permisos,
        mi_cuenta: state.mi_cuenta
    }
}

export default connect(mapPropsToState, actions)(IndexApp);