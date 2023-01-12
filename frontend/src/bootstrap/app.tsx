
import React from 'react';
import ContextProvider from './providers';
import Routes from './routers';



const App = (): JSX.Element  => {
  return (
    <ContextProvider>
     <Routes/>
    </ContextProvider>
  );
}

export default App;