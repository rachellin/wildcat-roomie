import React from 'react';

export class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          error: "",
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
        fetch('http://localhost:9000/api/register', {
          method: 'POST',
          body: JSON.stringify(this.state),
          // body: JSON.stringify({
          //   firstName: this.state.firstName,
          //   lastName: this.state.lastName,
          //   email: this.state.email,
          //   password: this.state.password,
          //   confirmPassword: this.state.confirmPassword
          // }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          console.log(res.status)
          if (res.status === 200) {
            console.log("registered")
            return res.json();
            //this.props.history.push('/');
          } else {
            console.log("error")
            return res.json();
          }
        })
        .then(data => {
          console.log("here")
          console.log(data);
          if (data.error) this.setState({ message: data.error });
          else if (data.message) this.setState({ message: data.message });
        })
        .catch(err => {
          console.log("catch")
          console.log(err);
        });
      }

    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <input 
                        type="name" 
                        name="firstName" 
                        placeholder="enter first name" 
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input 
                        type="name" 
                        name="lastName" 
                        placeholder="enter last name" 
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        required
                    />
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
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        value={this.state.confirmPassword}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input type="submit" value="submit"/>
                </form>
                {this.state.error}
                {this.state.message}
            </div>
        );
    }
}