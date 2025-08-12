import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router";
import { router } from './Router/Router.jsx';
import AuthProvider from './Components/Context/AuthProvider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
    
  </StrictMode>,
)
