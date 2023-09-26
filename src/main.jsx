import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './HomePage.jsx'
import Top from './Top-rated.jsx'
import TopRated from './Top-rated.jsx'
import MovieDetails from './MovieDetails.jsx'
import UpcomingPage from './UpcomingPage.jsx'
import SearchPage from './SearchPage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<App/>
    },
    {
      path:"/top-rated",
      element:<TopRated/>
    },
    {
      path:"/upcoming",
      element:<UpcomingPage/>
    },
    {
      path:"/movie?",
      element:<SearchPage/>
    },
    {
      path:"/movie/:movieid",
      element:<MovieDetails/>
    }
    
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='927101979653-fii42tcqs8ekebh2pui71a129dvdrckg.apps.googleusercontent.com'>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
  </GoogleOAuthProvider>
)
