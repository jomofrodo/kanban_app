import './css/main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';


if (document.querySelectorAll('div#app').length){
	require.ensure([], () =>{
		const App  = require('./components/App.jsx');
		persist(alt, storage, 'app');
		ReactDOM.render(<App />, document.getElementById('app'));
	},'kanban');
}


