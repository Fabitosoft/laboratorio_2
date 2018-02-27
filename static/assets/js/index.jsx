import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import App from './App';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.querySelector('.app')
    )
};
render(App);
if (module.hot) {
    module.hot.accept(render(App))
}