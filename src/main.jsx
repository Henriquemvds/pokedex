import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './assets/pages/Home'
import DetailsPokemons from './assets/pages/DetailsPokemons'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/DetailsPokemons/:number",
    element: <DetailsPokemons />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

)
