import React from 'react';

export class Login extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        email : '',
        password: ''
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
      fetch('http://localhost:9000/api/login', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
    }
    
    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            placeholder="enter email"
            //value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="enter password"
            //value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
         <input type="submit" value="submit"/>
        </form>
      );
    }
  }