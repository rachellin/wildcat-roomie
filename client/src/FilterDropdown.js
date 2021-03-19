import React from 'react';

import { Filter } from './Filter';
import { StyledDropdown } from './HeaderStyles';

export class FilterDropdown extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            overflow: "hidden"
        }
    }

    renderFilters (filterNames) {
        let arr = [];
        let filter;
        for (let i = 0; i < filterNames.length; i++) {
            filter = <Filter 
                onClick={() => this.props.onClick(i)}
                name={filterNames[i]} 
                color={this.props.filters[i] ? "#b3a2d3" : "#dad2ea"}/>
            arr.push(filter);
        }
        return arr;
    }

    handleClick () {
        if (this.state.overflow == "hidden") this.setState({ overflow: "show" });
        else this.setState({ overflow: "hidden" });
    }
    // changing overflow not the ideal way bc it moves all the other elements up/down.. i mean it's fine..

    render () {
        return (
            <StyledDropdown onClick={() => this.handleClick()} overflow={this.state.overflow}>
                <span>{this.props.title}</span>
                {this.renderFilters(this.props.filterNames)}
            </StyledDropdown>
        )
    }
}

// TODO: change color when opened
// each section has its own arr and the arrs are .concat() together 
// how does the filter arr (true, true, false, etc.) work then - maybe i can combine the arrays in FilterContainer ?