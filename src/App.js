import { Route, Routes } from "react-router-dom";
import React, { Suspense } from 'react';
import { Layout } from "./components/Layout";

const MainComponent = React.lazy(() => import("./Pages/Main/Main")); 
const ReposPageComponent = React.lazy(() => import ("./Pages/ReposInfo/ReposInfo"));


function App() {
  return (   
    <div className='container'>
      <Suspense fallback={<h2> loading ... </h2>}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainComponent />} />
          <Route path=':repos/:user' element={<ReposPageComponent />} />
        </Route>
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;

