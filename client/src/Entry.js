import React from 'react';

import { Login } from './account/Login';
import { Register } from './account/Register';
import { StyledContainer } from './ProfileStyles';

/*
click on entry button
open this component
enter info
submit 
call api to insert data into database if user not present
but user account????
*/

export default class Home extends React.Component {
    constructor() {
      super();
      this.state = {
        message: 'Loading...',
        status: 0
      }
    }

    componentDidMount() {
      this.callAPI();
    }

    callAPI = async () => {
        const res = await fetch(`http://localhost:9000/api/login`);
        const text = await res.text();
        const status = await res.status;
        this.setState({ 
            message: text,
            status: status
        });
    }
    
    render() {
      if (this.state.status == 401) {
          return (
              <StyledContainer>
                  <div class="authenticate">
                    <Login/>
                    <Register/>
                  </div>
              </StyledContainer>
          )
      }

      return (
        <StyledContainer>
            submit new entry
        </StyledContainer>
      );
    }
  }