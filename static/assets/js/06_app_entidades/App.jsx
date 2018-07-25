import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loading from '../00_utilities/components/system/loading_overlay';

import Menu from './00_menu/index';
import AppIndex from './resultados_examenes/examenes/containers/resultados_examenes_list_container';

const App = (props) => {
    return (
        <Loading>
            <Fragment>
                <Menu/>
                <div className="p-3">
                    <Switch>
                        <Route exact path='/app/entidades/' component={AppIndex}/>
                    </Switch>
                </div>
            </Fragment>
        </Loading>
    )
};

export default App;