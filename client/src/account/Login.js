import React from 'react';

export class Login extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        email : "",
        password: "",
        message: ""
      };
    }

    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }

    onSubmit = (event) => {
      event.preventDefault();
      //alert('Authentication coming soon!');
      const user = JSON.parse(localStorage.getItem('user'));
      fetch('http://localhost:9000/api/login', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.accessToken
        }
      })
      .then(res => {
        // if (res.status === 200) {
        //   this.props.history.push('/');
        // } else {
        //   const error = new Error(res.error);
        //   throw error;
        // }
        console.log(res.status)
        if (res.status === 200) {
          console.log("logged in");
          return res.json();
        } else {
          console.log("error")
          return res.json();
        }
      })
      .then(data => {
        if (data.error) {
          this.setState({ message: data.error });
          console.log("display msg");
        } else {
          this.props.history.push("/entry");
          //console.log("pushed")
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ message: "an unknown error has occured" });
      });
    }
    
    render() {
      return (
        <div>
        <form onSubmit={this.onSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            placeholder="enter email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="enter password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
         <input type="submit" value="submit"/>
        </form>
        {this.state.message}
        </div>
      );
    }
  }