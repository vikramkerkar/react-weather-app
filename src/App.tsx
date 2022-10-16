import React from 'react';
import './App.css';
import WeatherReport from './container/WeatherReport';
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
      <WeatherReport/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
