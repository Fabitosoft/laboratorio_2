import React, {Fragment} from 'react';
import MenuBase from '../../00_utilities/components/ui/menu/menu';
import MenuTerceros from './terceros';
import MenuPermisos from './permisos';
import MenuExamenes from './examenes';
import MenuMedicos from './medicos';
import MenuEntidades from './entidades';

const Menu = () => {
    return (
        <MenuBase>
            {mis_permisos => {
                return (
                    <Fragment>
                        <MenuExamenes/>
                        <MenuTerceros/>
                        <MenuMedicos/>
                        <MenuEntidades/>
                        <MenuPermisos/>
                    </Fragment>
                )
            }}
        </MenuBase>
    )
};

export default Menu;