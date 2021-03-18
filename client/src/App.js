import logo from './logo.svg';
import './App.css';
import './animations.css';
import Container from './Container'; 
import React from 'react';

// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Footer from './Components/Layout/Footer';
// import Home from './Components/Layout/Home';
// import Social from './Components/social/Social';

// function App() {
//   return (
//     <div className="App">
//       <Container/>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}

  //callAPI() {
    // fetch("http://localhost:9000/testAPI")
    //   //.then(res => res.text())
    //   .then(res => await res.json())
    //   .then(res => this.setState({ apiResponse: res }));
  //}

  callAPI = async () => {
    const res = await fetch(`http://localhost:9000/testAPI`);
    const resjson = await res.json();
    this.setState({ apiResponse: resjson });
  }

  componentWillMount() {
    this.callAPI();
  }

  render () {
    const data = JSON.stringify(this.state.apiResponse);

    return (
      <div className="App">
        <Container apiResponse={data}/>
     </div>
    )
  }
}

export default App;
