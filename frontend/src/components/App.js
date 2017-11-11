import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../App.css';
import '../bootstrap.min.css';

import  Categories  from './Categories';
import  Category  from './Category';
import  Post  from './Post';

/**
**  App component sets up 3 routes.
**      1. path "/" - Loads Categories component
**      2. path "/category/:id" - Loads Category component
**      3. path "/category/:category/post/:id" - Loads Post component
**/
function App(props) {
	console.log('app  props: ', props);
	return (
		<div className="App">
			<Route exact path="/" render={({history}) => (
				<Categories/>
			)}/>
			<Route exact path="/category/:id" render={({match}) => {
				return (<Category category={match.params.id}/>)
			}}/>
			<Route path="/category/:category/post/:id" render={({match}) => {
				return (
					<Post postId={match.params.id}/>
				)
			}}/>
		</div>
	);
}

export default withRouter(connect()(App));
