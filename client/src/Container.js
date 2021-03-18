import React from 'react';
import { ProfileContainer } from './ProfileContainer';
import { StyledContainer } from './ProfileStyles';
import { FilterContainer } from './FilterContainer';

function Container (props) {
    return (
        <StyledContainer>
            <h1>wildcat roomie</h1>
            <ProfileContainer apiResponse={props.apiResponse}/>
        </StyledContainer>
    );
}

export default Container;