import React from 'react';
import Form from 'react-bootstrap/Form';

import { filters } from '../FilterData';
import { StyledFilterEntry } from '../style/Style';

export class FilterEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // set to those items in the props.filters that are in the category in filters 
            school: this.props.filters.filter(val => filters.school.includes(val)),
            dorm: this.props.filters.filter(val => filters.dorm.includes(val)),
            other: this.props.filters.filter(val => filters.other.includes(val))
        }
    }

    /*
    let data = this.state;
                let filterArr = [].concat.apply([], Object.values(data));
                this.props.updateData("filters", filterArr);
                */

    updateData(type, target, value) {
        if (type == "radio") {
            this.setState({ [target]: value }, () => {
                let data = this.state;
                let filterArr = [].concat.apply([], Object.values(data));
                this.props.updateData("filters", filterArr);
            });
        } else if (type == "checkbox") {
            let arrCopy = this.state[target].slice(); // do i need them in individual arrays?
            // let filterArr = [].concat.apply([], Object.values(this.props.filters)); 
            // let arrCopy = filterArr.slice();
            if (!arrCopy.includes(value)) {
                arrCopy.push(value);
            } else {
                arrCopy = arrCopy.filter((val) => { 
                    return val != value;
                });
            }
            this.setState({ [target]: arrCopy }, () => {
                let data = this.state;
                let filterArr = [].concat.apply([], Object.values(data));
                this.props.updateData("filters", filterArr);
            });
        }
    }

    isChecked(val) {
        //let filterArr = [].concat.apply([], Object.values(this.props.filters));
        //console.log(filterArr);
        if (this.props.filters.includes(val)) return true;
        return false;
    }
    // after clicking diff tab and returning, when you select item in any group, the prev gropu clears?

    // check if at least one option in checkbox group is checked
    checkboxRequired(category) {
        if (this.state[category].length == 0) {
            return true;
        }
        return false;
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
                        required={type == "radio" ? true : this.checkboxRequired(category)}
                        checked={this.isChecked(filters[category][i])}/>
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