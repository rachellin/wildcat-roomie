import React from 'react';
import Form from 'react-bootstrap/Form';

import { filters } from '../FilterData';
import { StyledFilterEntry } from '../style/Style';

export class FilterEntry extends React.Component {
    renderGroup(category, type) {
        let arr = [];
        let option;
        for (let i = 0; i < filters[category].length; i++) {
            option = (
                <div class="option">
                    <input type={type} id={filters[category][i]} name={category} value={filters[category][i]} required/>
                    <label for={filters[category][i]}>{filters[category][i]}</label>
                </div>
            );
            arr.push(option);
        }
        return (
            <div className="group">   
                <b className="required">{category}</b>
                {arr}
            </div>
        )
    }

    render() {
        return (
            <StyledFilterEntry>
                {this.renderGroup("sleep", "radio")}
                {this.renderGroup("campus", "radio")}
                {this.renderGroup("region", "radio")}
                {this.renderGroup("school", "checkbox")}
                {this.renderGroup("personality", "radio")}
                {this.renderGroup("dorm", "checkbox")}
                {this.renderGroup("other", "checkbox")}
            </StyledFilterEntry>
        )
    }
}

// value should be from the db if they are editing - also, the other tabs should stay there bc??