import React, { Component } from 'react';
import FileBase64 from 'react-file-base64'
import axios from 'axios'
import logo from './logo.svg';
import Image from './Image.js';
import './App.css';

class App extends Component {


  constructor() {
    super()
    this.state = {
      files1: [],
      files2: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.result = Object;
  }



  getFiles1 = (files1) => {
    this.setState({ files1: files1 })
  }

  getFiles2 = (files2) => {
    this.setState({ files2: files2 })
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  activateLasers = () => {
    axios.post('https://ez2rmb-backend.azurewebsites.net/api/Face', {
      File1Base64: this.state.files1[0].base64,
      File2Base64: this.state.files2[0].base64
    })
      .then(function (response) {
        console.log(response);
        this.result = response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img style={{ float: 'left' }} src={logo} className="App-logo" alt="logo" />
          <h1 style={{ float: 'left' }} className="App-title">Partner Tracker</h1>
        </header>
        <div className={'img-outer-container'}>
          <div className={'img-container'}>

            <Image src={this.state.files1[0] ? this.state.files1[0].base64 : null} />
            <FileBase64 style={{ float: 'left' }}
              multiple={true}
              onDone={this.getFiles1.bind(this)} />
            {/* { this.state.files1.length != 0 ?
          <div style={{float:'left'}}>
            <h3 className="text-center mt-25">Callback Object</h3>
            <div className="pre-container" style={{float:'left',width:100}}>
              <pre>{ JSON.stringify(this.state.files1, null, 2) }</pre>
            </div>
          </div>
        : null } */}
          </div>

          <div className={'img-container'}>

            <Image src={this.state.files2[0] ? this.state.files2[0].base64 : null} />
            <FileBase64 style={{ float: 'left' }}
              multiple={true}
              onDone={this.getFiles2.bind(this)} />

            {/* { this.state.files2.length != 0 ?
          <div style={{float:'left'}}>
            <h3 className="text-center mt-25">Callback Object</h3>
            <div className="pre-container">
              <pre>{ JSON.stringify(this.state.files2, null, 2) }</pre>
            </div>
          </div>
        : null } */}
          </div>
        </div>
        <row>
          <button onClick={this.activateLasers}>
            Find match
          </button>
        </row>
        <div className='app-result'>
          <h1 className="App-title">Compatibility: {this.result['Confidence']}</h1>
        </div>



      </div>
    );
  }
}


export default App;
