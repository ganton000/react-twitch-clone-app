import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from "./components/App";
import reducers from './reducers';

const container = document.getElementById('root');
const root = createRoot(container);

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

root.render(
    <Provider store={store}>
        <App tab="home" />
    </Provider>
);