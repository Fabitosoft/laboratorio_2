import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loading from '../00_utilities/components/system/loading_overlay';

import Menu from './00_menu/index';
import AppIndex from './index';
import OrdenesExamenesList from './examenes/examenes_resultados_dashboard/containers/examenes_resultados_dashboard';

const App = (props) => {
    return (
        <Loading>
            <Fragment>
                <Menu/>
                <div className="p-3">
                    <Switch>
                        <Route exact path='/app/resultados/' component={OrdenesExamenesList}/>
                        <Route exact path='/app/resultados/examenes/list' component={OrdenesExamenesList}/>
                    </Switch>
                </div>
            </Fragment>
        </Loading>
    )
};

export default App;