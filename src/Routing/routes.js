import React from "react";
import Login from '../Components/Login'
import Users from '../Components/Users'
import {Broadcast} from '../Components/Broadcast'
//import PageNotFound from '../Components/PageNotFound'

const routes =[
    {
        path:'/',
        component: Login
    },
    {
        path:'/users',
        component: Users,
        isPrivate: true
    },
    {
        path:'/broadcast',
        component: Broadcast,
        isPrivate: true
    }
]

export default routes;
