import React, {Fragment} from 'react';
import MenuBase from '../../00_utilities/components/ui/menu/menu';
import {Link} from 'react-router-dom'
import Icon from '@material-ui/core/Icon';

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
                        <Link to='/app/ordenes/ordenes/list'>
                            <div style={iconStyles}>
                                <Icon style={iconStyles} className="fab fa-wpforms"/>
                            </div>
                        </Link>
                        <Link to='/app/ordenes/medicos/dashboard'>
                            <div style={iconStyles}>
                                <Icon style={iconStyles} className="fas fa-user-md"/>
                            </div>
                        </Link>
                        <Link to='/app/ordenes/pacientes/pacientes/list'>
                            <div style={iconStyles}>
                                <Icon style={iconStyles} className="fas fa-user"/>
                            </div>
                        </Link>
                    </Fragment>
                )
            }}
        </MenuBase>
    )
};

export default Menu;