import React from "react";
import {Login} from '../Components/Login'
import {Dashboard} from '../Components/Dashboard'
import {Broadcast} from '../Components/Broadcast'
//import PageNotFound from '../Components/PageNotFound'

const routes =[
    {
        path:'/',
        component: Login
    },
    {
        path:'/dashboard',
        component: Dashboard,
        isPrivate: true
    },
    {
        path:'/broadcast',
        component: Broadcast,
        isPrivate: true
    }
]

export default routes;
