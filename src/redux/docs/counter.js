
const LOGIN = 'login'; 
const REGISTER = 'register'; 

export const login = (data) => ({
    type: LOGIN,
    payload: {
        data,
    }
}) 

export const register = (data) => ({
    type: REGISTER,
    payload: {
        data,
    }
}) 

const initailState = {
    count: 0,
    url: 'https://quantumleaptech.org/getFit/api/v1/',
    userDetails: {},
    token: '',
    registerError: '',
}

export default ( state = initailState, action ) =>{
    switch(action.type){
        case LOGIN:
            console.log(action.payload);
            // return { ...state, count: state.count + 1} 
        case REGISTER:
            console.log(action.payload);
            

            // return { ...state, count: state.count + 1} 
        default:
            return state;
    }
}