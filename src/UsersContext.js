import React from "react";

const UsersContext = React.createContext({
  users: [],
  updateUserList: () => {},
});

export default UsersContext;
