import React, { useContext, useEffect } from "react";
import './App.css';
import { Circle } from './components/Circle'
import { TimesTable } from './components/TimesTable'
import { Result } from './components/Result'

import { GlobalContext } from './context/GlobalState'

function App() {

  const { isRoundOver, startRound } = useContext(GlobalContext)

  useEffect(() => {
    startRound()
  }, [])

  return (
    <div className="App">
      <Circle />
      {isRoundOver ? <Result /> : <TimesTable />}
    </div>
  );
}

export default App;
