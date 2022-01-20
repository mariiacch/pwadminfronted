

export const loginStart=(userCredentials)=>({
    type:"LOGIN_START"
})

export const logOut=(userCredentials)=>({
    type:"LOG_OUT"
})
export const loginSuccess=(user)=>({
    type:"LOGIN_SUCCESS",
    payload: user
})
export const loginFailure=(error)=>({
    type:"LOGIN_FAILURE",
    payload: error
})

//put user action:
export const CURRENT_USER=(currentUser)=>({
    type:"CURRENT_USER",
    payload: currentUser
})