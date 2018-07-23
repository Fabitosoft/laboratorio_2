import React, {Component} from "react";
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';

import {Redirect} from "react-router-dom";
import * as actions from "../../../01_actions/01_index";
import {MyTextFieldSimple} from '../../../00_utilities/components/ui/forms/fields';
import {FlatIconModal} from '../../../00_utilities/components/ui/icon/iconos_base';
import validate from '../components/forms/validate';

//import asyncValidate from "../components/forms/asyncValidate";

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        const {username, password, punto_venta = null} = e;
        this.props.login(username, password, punto_venta);
    }

    render() {
        const {
            handleSubmit,
            pristine,
            submitting,
            reset,
            auth,
        } = this.props;

        if (auth.isAuthenticated) {
            return <Redirect to="/"/>
        }

        const error_login = auth && auth.errors ? auth.errors : null;
        const mensaje_error = error_login && error_login.error ? error_login.error[0] : null;
        return (
            <div className="container form-signin pt-3 text-center" style={{width: '300px'}}>
                <div className='text-center'>
                    <img style={{width: '300px'}} className='img-fluid' src={`${img_static_url}/logo.png`} alt="logo"/>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <MyTextFieldSimple
                        name='username'
                        nombre='Nombre de Usuario'
                        className='col-12'
                    />
                    <MyTextFieldSimple
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
                        disabled={submitting || pristine}
                        type='submit'
                    />

                    <FlatIconModal
                        text="Limpiar"
                        disabled={submitting || pristine}
                        onClick={reset}
                    />
                </form>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        auth: state.auth
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