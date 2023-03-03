const reducer = (state, action) => {
    switch (action.type) {

        // USERS
        case 'LOGIN':
            return {
                ...state,
                user: {
                    isLogged: true,
                    isAdmin: action.payload.admin,
                    ...action.payload
                },
            };
        case 'LOGOUT':
            return {
                ...state,
                user: {
                    isLogged: false,
                    admin: false,
                    id: null
                }
            };

            // TOPICS
        case 'CREATE_TOPIC':
            return {
                ...state,
                ...state.topics.push(action.payload)
            };
        case 'READ_ALL_TOPICS':
            return {
                ...state,
                topics: [
                    ...action.payload
                ]
            };
        case 'DELETE_TOPIC':
            return {
                ...state,
                topics: action.payload
            };

            // THREADS
        case 'CREATE_THREAD':
            return {
                ...state,
                ...state.threads.push(action.payload)
            };
        case 'READ_ALL_THREADS':
            return {
                ...state,
                threads: [
                    ...action.payload
                ]
            };
        case 'DELETE_THREAD':
            return {
                ...state,
                threads: action.payload
            };

        default:
            return state;
    }
};

export { reducer };
