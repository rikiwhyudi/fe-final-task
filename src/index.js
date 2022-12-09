import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { UserContextProvider } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/style.css"
import { QueryClient, QueryClientProvider } from 'react-query'

const newQueryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <UserContextProvider>
    <QueryClientProvider client={newQueryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </UserContextProvider>
</React.StrictMode>
  );