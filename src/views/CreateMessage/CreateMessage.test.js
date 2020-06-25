import React from 'react';
import ReactDOM from 'react-dom';
import CreateMessage from './CreateMessage';
import {BrowserRouter as Router} from 'react-router-dom';

describe('CreateMessage Page', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router>
                <CreateMessage />
            </Router>, 
            div);
        ReactDOM.unmountComponentAtNode(div);
      });
})

