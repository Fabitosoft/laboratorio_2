import React, {Component} from 'react';
import CambiarContrasenaForm from './forms/cambiar_contrasena_form'
import {connect} from "react-redux";
import * as actions from "../../../../01_actions/01_index";

class Seguridad extends Component {
    constructor(props) {
        super(props);
        this.onCambiarPin = this.onCambiarPin.bind(this);
        this.onCambiarPassword = this.onCambiarPassword.bind(this);
    }

    onCambiarPin(values, callback) {
        const mi_cuenta = JSON.parse(localStorage.getItem("mi_cuenta"));
        const {
            cargando,
            noCargando,
            notificarAction,
            notificarErrorAjaxAction,
            cambiarPinUsuario
        } = this.props;
        cargando();
        cambiarPinUsuario(
            mi_cuenta.id,
            values.pin,
            values.password,
            (response) => {
                if (response && response.result) {
                    notificarAction(response.result)
                }
                noCargando();
                callback();
            },
            (response) => {
                noCargando();
                notificarErrorAjaxAction(response)
            }
        )
    }

    onCambiarPassword(values, callback) {
        const mi_cuenta = JSON.parse(localStorage.getItem("mi_cuenta"));
        const {
            cargando,
            noCargando,
            notificarAction,
            notificarErrorAjaxAction,
            cambiarContrasenaUsuario
        } = this.props;
        cargando();
        cambiarContrasenaUsuario(
            mi_cuenta.id,
            values.password_old,
            values.password,
            values.password_2,
            (response) => {
                if (response && response.result) {
                    notificarAction(response.result)
                }
                noCargando();
                callback();
            },
            (response) => {
                noCargando();
                notificarErrorAjaxAction(response)
            }
        )
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 mt-3">
                    <h4>Cambiar Contraseña</h4>
                    <CambiarContrasenaForm onSubmit={this.onCambiarPassword}/>
                </div>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        mis_permisos: state.mis_permisos
    }
}

export default connect(mapPropsToState, actions)(Seguridad)