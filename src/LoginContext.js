import React from 'react';

const LoginContext = React.createContext({
    activeUser: [],
    toggleEditView: () => {},
    editUser: () => {},
    deleteUser: () => {}
})

export default LoginContext;