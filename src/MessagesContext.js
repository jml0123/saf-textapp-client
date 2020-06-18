import React from 'react';

const MessagesContext = React.createContext({
    messages: [],
    deleteMessage: () => {},
    addMessage: () => {},
    editMessage: () => {},
})

export default MessagesContext;