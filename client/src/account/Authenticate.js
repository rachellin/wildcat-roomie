import React from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { StyledContainer } from '../style/ProfileStyles';

export default class Authenticate extends React.Component {
    render () {
        return (
            <StyledContainer>
                <div class="authenticate">
                <Login/>
                <Register history={this.props.history}/>
                </div>
            </StyledContainer>
        )
    }
}