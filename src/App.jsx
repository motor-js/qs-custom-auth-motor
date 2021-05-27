import React from 'react';
import useConnect from './useConnect'
import NewApp from './NewApp'
import { Motor } from '@motor-js/engine'

function App() {

 const { engine } = useConnect()
 
  return (
    <div>
      { engine && (
        <Motor engine={engine}>
          <NewApp />
        </Motor>
      )}
      </div>
  );
}

export default App;
