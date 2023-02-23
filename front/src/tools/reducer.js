const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                count: state.count + 1
            };
        // template 
        // case '':
        //     return {
                
        //     };
        case 'LOGIN':
            return {
                ...state, 
                user:{
                    isLogged:true,
                    isAdmin:action.payload.admin,
                    ...action.payload
                }
            }
        default:
            return state;
    }
};

export { reducer };
