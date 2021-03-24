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

    getFilterIndex (filter) {
        for (let i = 0; i < filterArr; i++) {
            if (filterArr[i] == filter) return i;
        }
    }

    renderDropdowns () {
        let arr = [];
        let dropdown;
        for (let i = 0; i < Object.values(filters).length; i++) {
            //console.log("filterIndex: " + this.props.filterIndex);
            dropdown = <FilterDropdown
                            title={Object.keys(filters)[i]}
                            filterNames={Object.values(filters)[i]} // ??? 
                            filters={this.props.filters}
                            //onClick={() => this.handleClick()}
                            onClick={(filterIndex) => this.props.onClick(filterIndex, i)} // i = dropDown index
                        />
            arr.push(dropdown);
        }
        return arr;
    }
    // make it so that for (most)some of them, user can only choose one filter from dropdown
    // once you click on one of the filters of the dropdown, the other filters are "unclicked"
    // the clicking doesn't work properly 
    // get index of filter in the filterArr

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