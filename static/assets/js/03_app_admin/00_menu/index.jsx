import React, {Fragment} from 'react';
import MenuBase from '../../00_utilities/components/ui/menu/menu';
import {Link} from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import MenuTerceros from './terceros';
import MenuPermisos from './permisos';

const iconStyles = {
    paddingTop: 8,
    paddingRight: 8
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
                            <div style={iconStyles}>
                                <Icon style={iconStyles} className="fas fa-syringe"/>
                            </div>
                        </Link>
                        <Link to='/app/admin/medicos/list'>
                            <div style={iconStyles}>
                                <Icon style={iconStyles} className="fas fa-user-md"/>
                            </div>
                        </Link>
                        <Link to='/app/admin/entidades/entidades/list'>
                            <div style={iconStyles}>
                                <Icon style={iconStyles} className="fas fa-hospital"/>
                            </div>
                        </Link>
                    </Fragment>
                )
            }}
        </MenuBase>
    )
};

export default Menu;