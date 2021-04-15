import React from 'react';
import { ProfileContainer } from './ProfileContainer';
import { StyledContainer } from './style/ProfileStyles';
import { FilterContainer } from './FilterContainer';

function Container (props) {
    return (
        <div>
            <ProfileContainer/>
        </div>
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