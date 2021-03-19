import React from 'react';
import { StyledFilters } from './HeaderStyles';
import { Filter } from './Filter';
import { FilterDropdown } from './FilterDropdown';

export class FilterContainer extends React.Component {

    renderFilters (filterNames) {
        let arr = [];
        let filter;
        for (let i = 0; i < filterNames.length; i++) {
            filter = <Filter 
                onClick={() => this.props.onClick(i)}
                //index={i}
                name={filterNames[i]} 
                // on={this.props.filters[i] ? 1 : 0}
                color={this.props.filters[i] ? "#b3a2d3" : "#dad2ea"}/>
            arr.push(filter);
        }
        return arr;
    }

    render () {
        return (
            <>
            <FilterDropdown/>
            <StyledFilters>
                {this.renderFilters(this.props.filterNames)}
            </StyledFilters>
            </>
        )
    }
}
  
/* CHANGES
filterNames should still be all the filters 
filterContainer contains each filterDropdown
filterDropdwon contains its respective filters 
*/