import React, {Fragment} from 'react';
import {tengoPermiso} from '../../00_utilities/common';
import MenuBase from '../../00_utilities/components/ui/menu/menu';
import {
    PERMISO_LIST_USER,
    PERMISO_LIST_PERMISSION,
    PERMISO_LIST_GROUP
} from '../../00_utilities/permisos/types';
import MenuTerceros from './terceros';
import MenuPermisos from './permisos';
import MenuExamenes from './examenes';
import MenuMedicos from './medicos';
import MenuEntidades from './entidades';

const Menu = () => {
    return (
        <MenuBase>
            {mis_permisos => {
                const listar_usuarios = tengoPermiso(mis_permisos, [PERMISO_LIST_USER]);
                const menu_terceros = listar_usuarios;
                const listar_permisos = tengoPermiso(mis_permisos, [PERMISO_LIST_PERMISSION]);
                const listar_groups = tengoPermiso(mis_permisos, [PERMISO_LIST_GROUP]);
                const menu_permisos = listar_permisos || listar_groups;
                return (
                    <Fragment>
                        <MenuExamenes/>
                        <MenuTerceros listar_usuarios={listar_usuarios}/>
                        <MenuMedicos/>
                        <MenuEntidades/>
                        <MenuPermisos
                            listar_permisos={listar_permisos}
                            listar_groups={listar_groups}
                        />
                    </Fragment>
                )
            }}
        </MenuBase>
    )
};

export default Menu;