import { useState } from 'react'
import Homepage from './Pages/Homepage'
import { RouterProvider } from 'react-router-dom'
import { myRoute } from './routes/Routing'
import WhatsAppFloat from './components/WhatsAppFloat'


function App() {
  

  

  return (
    <>
   
    <RouterProvider router={myRoute}/>
    <WhatsAppFloat/>
       
    </>
  )
}

export default App
