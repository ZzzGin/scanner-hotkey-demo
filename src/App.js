import logo from './logo.svg';
import BarcodeReader from 'react-barcode-reader';
import { useHotkeys } from 'react-hotkeys-hook';
import './App.css';
// import { useState } from 'react';

function App() {

  const onConsoleScan = (data) => {
    console.log("onConsoleScan: ", data);
  }

  window.$scan = onConsoleScan;

  // useState is not working because state updating is async
  // const [isScanOngoing, setScanOngoing] = useState(false);
  // Not sure if context updating is asycn too. It worth a shot. But plain variable should be working for sure.
  // We need to find a way to maintain a global variable or maybe singleton?
  window.$isScanOngoing = false;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const onScanned = (data) => {
    console.log("setting window.$scanOngoing to true");
    window.$isScanOngoing = true;
    console.log("inside onScanned, window.$isScanOngoing: ", window.$isScanOngoing);
    console.log("onScanned: ", data);
    sleep(1000).then(() => {
      console.log("setting window.$isScanOngoing to false");
      window.$isScanOngoing = false;
    });
  };

  const onError = (error) => {
    console.log("onError: ", error);
  };

  useHotkeys("1", () => {
    sleep(100).then(() => {
      console.log("inside hotkey callback, window.$isScanOngoing: ", window.$isScanOngoing);
      if (!window.$isScanOngoing){
        console.log("hotkey: 1");
      }
    });
  }, {}, [window.$isScanOngoing]);

  return (
    <div className="App">
      <header className="App-header">
        <BarcodeReader onScan={onScanned} onError={onError} minLength={ 3 } />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
