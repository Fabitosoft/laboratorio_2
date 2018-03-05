import React, {Fragment} from 'react';
import MenuBase from '../../00_utilities/components/ui/menu/menu';
import MenuTerceros from './terceros';
import MenuPermisos from './permisos';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom'

const iconStyles = {
    padding: 8,
};

const Menu = () => {
    return (
        <MenuBase>
            {mis_permisos => {
                return (
                    <Fragment>
                        <MenuPermisos/>
                        <MenuTerceros/>
                        <Link to='/app/admin/examenes/list'>
                            <FontIcon className="fas fa-syringe" style={iconStyles}/>
                        </Link>
                        <Link to='/app/admin/medicos/list'>
                            <FontIcon className="fas fa-user-md" style={iconStyles}/>
                        </Link>
                        <Link to='/app/admin/entidades/entidades/list'>
                            <FontIcon className="fas fa-hospital" style={iconStyles}/>
                        </Link>
                    </Fragment>
                )
            }}
        </MenuBase>
    )
};

export default Menu;