import React from 'react';

import { EntryForm } from '../style/Style';

export class BioEntry extends React.Component {
    render() {
        return (
            <div class="bio">
                <textarea name="about" placeholder="write about yourself..." required/>
                <textarea name="looking-for" placeholder="what are you looking for in a roommate?" required/> 
            </div>
        )
    }
}