import React from 'react';

const StoreContext = React.createContext([]);

const initialState = {
    user: {
        isLogged: false,
        admin: false,
        id: null
    }
};

export {StoreContext, initialState};