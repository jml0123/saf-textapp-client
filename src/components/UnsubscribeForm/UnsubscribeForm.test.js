import React from 'react';
import ReactDOM from 'react-dom';
import UnsubscribeForm from './UnsubscribeForm';

describe('UnsubscribeForm Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UnsubscribeForm />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
})

