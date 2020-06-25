import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList';

describe('MessageList Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MessageList />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
})

