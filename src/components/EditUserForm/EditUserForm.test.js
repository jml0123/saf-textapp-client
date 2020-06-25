import React from 'react';
import ReactDOM from 'react-dom';
import EditUserForm from './EditUserForm';

const testProps = {
    id: 1
}
describe('EditUserForm Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<EditUserForm user={testProps}/>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
})

