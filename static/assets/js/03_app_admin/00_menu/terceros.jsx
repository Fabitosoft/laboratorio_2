import React from 'react';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom'


const MenuTerceros = (props) => (
    <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">
            <Icon className="fas fa-users"/>
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link to='/app/admin/usuarios/list'>
                <span className="dropdown-item">Usuarios</span>
            </Link>
            <Link to='/app/admin/pacientes/pacientes/list'>
                <span className="dropdown-item">Pacientes</span>
            </Link>
        </div>
    </li>
);


export default MenuTerceros;