import React, {Fragment} from 'react';
import MenuBase from '../../00_utilities/components/ui/menu/menu';
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
                        <Link to='/app/ordenes/ordenes/list'>
                            <FontIcon className="fab fa-wpforms" style={iconStyles}/>
                        </Link>
                        <Link to='/app/ordenes/medicos/dashboard'>
                            <FontIcon className="fas fa-user-md" style={iconStyles}/>
                        </Link>
                        <Link to='/app/ordenes/pacientes/pacientes/list'>
                            <FontIcon className="fas fa-user" style={iconStyles}/>
                        </Link>
                    </Fragment>
                )
            }}
        </MenuBase>
    )
};

export default Menu;