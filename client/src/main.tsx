import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'


import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './view/login'
import Home from './view/home'


const routes = createBrowserRouter([
  {
    path:"/",
    element:<LoginPage/>
  },
  {
    path:"/home",
    element:<Home/>
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={routes}/>
  </StrictMode>,
)
