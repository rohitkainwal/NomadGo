import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Homepage from '../Pages/Homepage'

export const myRoute = createBrowserRouter([
    {
        path: "/",
        element:<Homepage/>
    }
]);