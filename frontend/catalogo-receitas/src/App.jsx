// eslint-disable-next-line no-unused-vars
import React from 'react';
import AppRoutes from './routes/Routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider >
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
