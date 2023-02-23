import React from 'react';

const StoreContext = React.createContext([]);

const initialState = {
    user: {
        isLogged: false,
        isAdmin: false,
        id: null
    }
};

export {StoreContext, initialState};