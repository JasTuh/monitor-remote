import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="container">
      <div>
          <h1 className="now-playing">Watching: </h1>
          <br/>
          <ul className="list-group series-select" style={{height: '20vh', overflow: 'auto'}}>
          </ul>
      </div>
      <br/>
      <div>
          <h1>Season: </h1>
          <br/>
          <ul className="list-group season-select" style={{height: '20vh', overflow: 'auto'}}>
          </ul>
      </div>
      <br/>
      <div>
          <h1 for="episode">Episode: </h1>
          <ul className="list-group episode-select" style={{height: '20vh', overflow: 'auto'}}/>
      </div>
      <br/><br/>
      <div className="row center">
          <div className="col prev">
              <i className="fa fa-arrow-left"></i>
          </div>
          <div className="col pause center">
              <i className="fa fa-play-circle"></i>
          </div>
          <div className="col next">
              <i className="fa fa-arrow-right"></i>
          </div>
      </div>
      <br/><br/>
      <div className="row center">
          <div className="col fullscreen">
              <i className="fa fa-compress"></i>
          </div>
          <div className="col close">
              <i className="fa fa-times-circle"></i>
          </div>
          <div className="col new-tab">
              <i className="fa fa-plus"></i>
          </div>
      </div>
  </div>
  );
}

export default App;
