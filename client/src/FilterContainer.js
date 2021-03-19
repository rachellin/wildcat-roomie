import React from 'react';
import { StyledFilters } from './HeaderStyles';
import { Filter } from './Filter';
import { FilterDropdown } from './FilterDropdown';

import { filters, filterArr } from './FilterData';

export class FilterContainer extends React.Component {

    // renderFilters (filterNames) {
    //     let arr = [];
    //     let filter;
    //     for (let i = 0; i < filterNames.length; i++) {
    //         filter = <Filter 
    //             onClick={() => this.props.onClick(i)}
    //             //index={i}
    //             name={filterNames[i]} 
    //             // on={this.props.filters[i] ? 1 : 0}
    //             color={this.props.filters[i] ? "#b3a2d3" : "#dad2ea"}/>
    //         arr.push(filter);
    //     }
    //     return arr;
    // }

    renderDropdowns () {
        let arr = [];
        let dropdown;
        for (let i = 0; i < Object.values(filters).length; i++) {
            dropdown = <FilterDropdown
                            title={Object.keys(filters)[i]}
                            filterNames={Object.values(filters)[i]}
                            filters={this.props.filters}
                            onClick={(i) => this.props.onClick(i)}
                        />
            arr.push(dropdown);
        }
        return arr;
    }
    // make it so that for (most)some of them, user can only choose one filter from dropdown

    render () {
        return (
            <>
            {/* <FilterDropdown filterNames={Object.values(filters)[0]} filters={this.props.filters}/> */}
            {this.renderDropdowns()}
            {/* <StyledFilters>
                {this.renderFilters(this.props.filterNames)}
            </StyledFilters> */}
            </>
        )
    }
}

FilterContainer.defaultProps = {
    filterArr: filterArr
}
  
/* CHANGES
filterNames should still be all the filters 
filterContainer contains each filterDropdown
filterDropdwon contains its respective filters 
*/