import React  from 'react';
import createReactClass from 'create-react-class';
import Header from './components/Header';

import './App.css';

const App = createReactClass({
	render() {
		return (
      <div>
        <Header />

				{this.props.children}
      </div>
		)
	}
});

export default App;
