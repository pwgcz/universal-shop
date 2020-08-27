import React, { createContext, Component } from 'react';

export const UserContext = createContext({user: {}});

class UserContextProvider extends Component {
  state = {};
  render() {
    return (
        <UserContext.Provider value={{...this.state }}>
          {this.props.children}
        </UserContext.Provider>
    )
  }
}

export default UserContextProvider;
