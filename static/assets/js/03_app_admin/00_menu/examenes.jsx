import React, {Fragment} from 'react';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom'


const MenuPermisos = (props) => (

    <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">
            <FontIcon className="fas fa-lock-alt"/>
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">

            <MenuItem
                primaryText="Examenes"
                containerElement={<Link to='/app/admin/examenes/list'/>}
            />
            <MenuItem
                primaryText="Entidades"
                containerElement={<Link to='/app/admin/entidades/entidades/list'/>}
            />
        </div>
    </li>

);
export default MenuPermisos;
