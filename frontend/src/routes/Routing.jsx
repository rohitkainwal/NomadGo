import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import Booking from '../Pages/Booking';

export const myRoute = createBrowserRouter([
    {
        path: "/",
        element:<Homepage/>
    },
     {
        path: "/booking",
        element:<Booking/>
    },
]);