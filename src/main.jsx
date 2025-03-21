import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Auth from './Pages/Auth/Auth.jsx'
import Products from './Pages/Products.jsx'
import Root from './Pages/Root/Root.jsx'
import AddProduct from './Pages/AddProduct.jsx'
import EditProduct from './Pages/EditProduct.jsx'



const routes = createBrowserRouter([
  {
    path : "/",
    element : <Auth/>,
    children : [
      {
        path : "",
        element : <Login/>
      },
      {
        path : "signup",
        element : <SignUp/>
      }
    ]
  },
  {
    path: "/dashboard",
    element : <Root/>,
    children : [
      {
        path: "",
        element : <Products/>
      },
      {
        path: "product/addproduct",
        element : <AddProduct/>
      },
      {
        path: "product/editproduct/:id",
        element : <EditProduct/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
