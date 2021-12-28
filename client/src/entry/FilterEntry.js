import React from 'react';

import { filters } from '../filters/FilterData';
import { StyledFilterEntry } from '../style/Style';

export class FilterEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            school: this.props.filters.filter(val => filters.school.includes(val)),
            dorm: this.props.filters.filter(val => filters.dorm.includes(val)),
            other: this.props.filters.filter(val => filters.other.includes(val))
        }
    }

    componentDidMount() {
        Object.keys(filters).map(category => this.state[category] = this.props.filters.filter(val => filters[category].includes(val)));
    }

    updateData(type, target, value) {
        if (type == "radio") {
            this.setState({ [target]: value }, () => {
                let data = this.state;
                let filterArr = [].concat.apply([], Object.values(data));
                this.props.updateData("filters", filterArr);
            });
        } else if (type == "checkbox") {
            let arrCopy = this.state[target].slice(); 
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
        if (this.props.filters.includes(val)) return true;
        return false;
    }

    // check if at least one option in checkbox group is checked
    required(type, category) {
        if (type == "radio") {
            if (category == "sleep" || category == "mbti") {
                return false;
            }
            return true;
        }
        if (type == "checkbox") {
            if (category == "other" || category == "dorm") {
                return false;
            }
            if (this.state[category].length == 0) {
                return true;
            } 
            return false;
        } 
    }

    showRequired(type, category) {
        if (category == "school"|| this.required(type, category)) {
            return true;
        };
        return false;
    }

    renderGroup(category, type) {
        let arr = [];
        let option;
        for (let i = 0; i < filters[category].length; i++) {
            option = (
                <div className="option">
                    <input 
                        type={type} id={filters[category][i]} name={category} value={filters[category][i]} 
                        onChange={e => this.updateData(type, category, e.target.value)} 
                        required={this.required(type, category)}
                        checked={this.isChecked(filters[category][i])}/>
                    <label for={filters[category][i]}>{filters[category][i]}</label>
                </div>
            );
            arr.push(option);
        }
        return (
            <div className="group">   
                <b className={this.showRequired(type, category) ? "required" : ""}>{category}</b>
                {arr}
            </div>
        )
    }

    render() {
        return (
            <StyledFilterEntry>
                {this.renderGroup("year", "radio")}
                {this.renderGroup("identity", "radio")}
                {this.renderGroup("sleep", "radio")}
                {this.renderGroup("school", "checkbox")}
                {this.renderGroup("region", "radio")}
                {this.renderGroup("campus", "radio")}
                {this.renderGroup("other", "checkbox")}
                {this.renderGroup("mbti", "radio")}
                {this.renderGroup("dorm", "checkbox")}
            </StyledFilterEntry>
        )
    }
}
