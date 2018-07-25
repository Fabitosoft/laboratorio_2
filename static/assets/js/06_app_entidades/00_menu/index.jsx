import React, {Fragment} from 'react';
import MenuBase from '../../00_utilities/components/ui/menu/menu';
import {Link} from 'react-router-dom'
import Icon from '@material-ui/core/Icon';

const iconStyles = {
    padding: 8,
};

const Menu = () => {
    return (
        <MenuBase>
            {mis_permisos => {
                return (
                    <Fragment>
                        <Link to='/app/entidades'>
                            <div style={iconStyles}>
                                <Icon style={iconStyles} className="fas fa-vial"/>
                            </div>
                        </Link>
                        <Link to='/app/mi_cuenta'>
                            <div style={iconStyles}>
                                <Icon style={iconStyles} className="fas fa-lock"/>
                            </div>
                        </Link>
                    </Fragment>
                )
            }}
        </MenuBase>
    )
};

export default Menu;