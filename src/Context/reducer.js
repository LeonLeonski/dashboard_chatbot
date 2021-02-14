import React, { useReducer } from "react";

let tokenId = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "";

export const initialState = {
    tokenId: tokenId,
    errorMessage: null
};

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
            };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                tokenId: action.payload.tokenId
            };
        case "LOGOUT":
            return {
                ...initialState,
                tokenId: "",
            };

        case "LOGIN_ERROR":
            return {
                ...initialState,
                errorMessage: action.error
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
