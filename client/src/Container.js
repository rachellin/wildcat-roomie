import React from 'react';
import { ProfileContainer } from './ProfileContainer';
import { StyledContainer } from './style/ProfileStyles';
import { FilterContainer } from './FilterContainer';

function Container (props) {
    return (
        <StyledContainer>
            <h1>wildcat roomie</h1>
            <div className="header">
                <button>instructions</button>
                <button>new entry</button>
                <button><a href="">view dorms</a></button>
            </div>
            <ProfileContainer/>
        </StyledContainer>
    );
}

/* header
- instructions (popup)
- new entry (popup)
- view dorms (external link)
- groupme (external link)
- questions to ask (popup)
*/

export default Container;