import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root';

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
