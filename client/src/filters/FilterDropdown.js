import React from 'react';

import { Filter } from './Filter';
import { StyledDropdown, StyledFilters } from '../style/HeaderStyles';
import { filterArr } from './FilterData';

export class FilterDropdown extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            overflow: "hidden"
        }
    }

    getFilterIndex (filter) {
        for (let i = 0; i < filterArr.length; i++) {
            if (filterArr[i] === filter) return i;
        }
    }

    handleColor (filterName) {
        let index = this.getFilterIndex(filterName);
        console.log(index)
        return (this.props.filters[index] ? "#b3a2d3" : "#dad2ea");
    }

    renderFilters (filterNames) {
        let arr = [];
        let filter, filterIndex;
        for (let i = 0; i < filterNames.length; i++) {
            filterIndex = this.getFilterIndex(filterNames[i]);
            filter = <Filter 
                className="filter"
                filterIndex={filterIndex}
                onClick={() => this.props.onClick(i)} 
                name={filterNames[i]} 
                color={this.props.filters[filterIndex] ? "#7863AE" : "#C7BBE3"}/>
            arr.push(filter);
        }
        return arr;
    }

    handleClick () {
        if (this.state.overflow == "hidden") {
            this.setState({ overflow: "show" });
        }
        else {
            this.setState({ overflow: "hidden" });
        }
    }

    render () {
        return (
            <StyledDropdown onClick={() => this.props.openDropdown()} overflow={this.props.overflow}>
                <span>{this.props.title}</span>
                <StyledFilters>
                    {this.renderFilters(this.props.filterNames)}
                </StyledFilters>
            </StyledDropdown>
        )
    }
}
