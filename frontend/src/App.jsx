// App.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Risultati from './components/Risultati.jsx';
import FormComponent from './components/FormComponent.jsx';

function App() {
  return (
    <>
      <Risultati />    
      <FormComponent />
    </>
  );
}

export default App;
