import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Routes.jsx'
import { ApolloProvider } from '@apollo/client'
import { Client } from './apollo/apolloClient.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ApolloProvider client={Client}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </ApolloProvider>
    
  </StrictMode>
)
