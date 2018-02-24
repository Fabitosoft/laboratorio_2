import React, {Fragment} from 'react';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom'


const MenuPermisos = (props) => (

    <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">
            <FontIcon className="fas fa-user-md"/>
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <MenuItem
                primaryText="Especialidades"
                containerElement={<Link to='/app/admin/medicos/especialidades/list'/>}
            />
            <MenuItem
                primaryText="Médicos Remitentes"
                containerElement={<Link to='/app/admin/medicos/medicos_remitentes/list'/>}
            />
        </div>
    </li>

);
export default MenuPermisos;
