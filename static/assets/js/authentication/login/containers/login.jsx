import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';

import {Redirect} from "react-router-dom";
import * as actions from "../../../01_actions/01_index";
import {MyTextFieldSimple} from '../../../00_utilities/components/ui/forms/fields';
import {FlatIconModal} from '../../../00_utilities/components/ui/icon/iconos_base';
import validate from '../components/forms/validate';
import TablaResultadoConsultaWeb from '../components/resultados_examenes_web_tabla';

//import asyncValidate from "../components/forms/asyncValidate";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            acceso_a_consulta_resultados: false,
            errores_consulta: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onCerrarConsulta = this.onCerrarConsulta.bind(this);
    }

    handleChange = (event, value) => {
        this.setState({
            slideIndex: value,
        });
    };

    onCerrarConsulta = () => {
        this.props.reset();
        this.props.clearOrdenesExamenes();
        this.setState({errores_consulta: null, acceso_a_consulta_resultados: false})
    };


    onConsultarResultados(e) {
        const {
            fetchOrdenesExamenes_por_nro_identidad_codigo_consulta_web,
            cargando,
            noCargando
        } = this.props;
        cargando();
        fetchOrdenesExamenes_por_nro_identidad_codigo_consulta_web(
            e.nro_identificacion,
            e.codigo_consulta_web,
            () => {
                this.setState({errores_consulta: null, acceso_a_consulta_resultados: true})
                noCargando();
            },
            e => {
                if (e.response && e.response.data) {
                    this.setState({errores_consulta: e.response.data.error, acceso_a_consulta_resultados: false})
                    noCargando();
                }
            }
        )
    }


    onSubmit(e) {
        const {username, password, punto_venta = null} = e;
        const {
            login,
            cargando,
            noCargando
        } = this.props;
        cargando();
        login(username, password, punto_venta, () => noCargando(), () => noCargando());
    }

    render() {
        const {
            handleSubmit,
            pristine,
            submitting,
            reset,
            auth,
            ordenes_examenes,
            esta_cargando
        } = this.props;

        const {
            slideIndex,
            acceso_a_consulta_resultados,
            errores_consulta
        } = this.state;

        if (auth.isAuthenticated) {
            return <Redirect to="/"/>
        }

        if (acceso_a_consulta_resultados && _.size(ordenes_examenes) > 0) {
            return <TablaResultadoConsultaWeb
                {...this.props}
                ordenes_examenes={ordenes_examenes}
                onCerrarConsulta={this.onCerrarConsulta}
            />
        }
        const error_login = auth && auth.errors ? auth.errors : null;
        const mensaje_error = error_login && error_login.error ? error_login.error[0] : null;
        return (
            <div className="container form-signin pt-3 text-center" style={{width: '300px'}}>
                <div className='text-center'>
                    <img style={{width: '300px'}} className='img-fluid' src={`${img_static_url}/logo.png`} alt="logo"/>
                </div>


                <ul className="nav nav-tabs pt-3">
                    <li className="nav-item">
                        <a
                            className={`nav-link${slideIndex === 0 ? ' active' : ''}`}
                            href="#"
                            onClick={() => this.setState({slideIndex: 0})}
                        >
                            Resultados
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link${slideIndex === 1 ? ' active' : ''}`}
                            href="#"
                            onClick={() => this.setState({slideIndex: 1})}
                        >
                            Entidades
                        </a>
                    </li>
                </ul>
                {
                    this.state.slideIndex === 0 &&
                    <form onSubmit={handleSubmit((e) => {
                        this.onConsultarResultados(e);
                    })}>
                        <h5>Consulta de Resultados</h5>
                        <MyTextFieldSimple
                            name='nro_identificacion'
                            nombre='Número de Identificación'
                            className='col-12'
                            disabled={esta_cargando}
                        />
                        <MyTextFieldSimple
                            name='codigo_consulta_web'
                            nombre='Codigo consulta'
                            className='col-12'
                            helperText='Código de 8 dígitos entregados en el recibo'
                            disabled={esta_cargando}
                        />
                        <div className="col-12">
                            <span style={{color: 'red'}}>{errores_consulta}</span>
                        </div>
                        <FlatIconModal
                            text='Consultar'
                            disabled={submitting || pristine || esta_cargando}
                            type='submit'
                        />
                    </form>
                }

                {
                    this.state.slideIndex === 1 &&
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <MyTextFieldSimple
                            name='username'
                            nombre='Nombre de Usuario'
                            className='col-12'
                            disabled={esta_cargando}
                        />
                        <MyTextFieldSimple
                            disabled={esta_cargando}
                            name='password'
                            nombre='Contraseña'
                            className='col-12'
                            type='password'
                            autoFocus={true}
                            onChange={() => {
                                this.props.clear_authentication_errors();
                            }}
                        />
                        {
                            mensaje_error &&
                            <div className='mt-3'>
                                <strong className='form-field-error'>{mensaje_error}</strong>
                            </div>

                        }
                        {/*<p>*/}
                        {/*Don't have an account? <Link to="/register">Register</Link>*/}
                        {/*</p>*/}

                        <FlatIconModal
                            text='Ingresar'
                            disabled={submitting || pristine || esta_cargando}
                            type='submit'
                        />

                        <FlatIconModal
                            text="Limpiar"
                            disabled={submitting || pristine || esta_cargando}
                            onClick={reset}
                        />
                    </form>
                }
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        esta_cargando: state.esta_cargando,
        auth: state.auth,
        ordenes_examenes: state.ordenes_examenes,
    }
}

Login = reduxForm({
    form: "loginForm",
    validate,
    //asyncValidate,
    //asyncBlurFields: ['username'],
    enableReinitialize: true
})(Login);

Login = (connect(mapPropsToState, actions)(Login));

export default Login;