export async function loginUserSuccess(dispatch, loginPayload) {
    try {
        let payload = loginPayload.tokenId;
        dispatch({ type: 'LOGIN_SUCCESS', payload: {tokenId: payload} });
        localStorage.setItem('token', JSON.stringify(payload));
        return {tokenId: payload};
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
}

export async function loginUserFailure(dispatch, loginPayload) {
    dispatch({ type: 'LOGIN_ERROR', error: loginPayload.errors[0] });
    return;
}
