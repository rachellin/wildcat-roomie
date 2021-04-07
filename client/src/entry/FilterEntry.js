import React from 'react';
import Form from 'react-bootstrap/Form';

import { filters } from '../FilterData';
import { StyledFilterEntry } from '../style/Style';

export class FilterEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            school: [],
            dorm: [],
            other: []
        }
    }

    updateData(type, target, value) {
        if (type == "radio") {
            this.setState({ [target]: value });
        } else if (type == "checkbox") {
            let arrCopy = this.state[target];
            if (!arrCopy.includes(value)) {
                arrCopy.push(value);
            } else {
                arrCopy = arrCopy.filter((val) => { 
                    return val != value;
                });
            }
            this.setState({ [target]: arrCopy });
        }
    }

    renderGroup(category, type) {
        let arr = [];
        let option;
        for (let i = 0; i < filters[category].length; i++) {
            option = (
                <div class="option">
                    <input 
                        type={type} id={filters[category][i]} name={category} value={filters[category][i]} 
                        onChange={e => this.updateData(type, category, e.target.value)} 
                        required/>
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
// store every radio button selected (for other, we need to know what "none" means tho)
// onChange has to be different for radio and checkbox