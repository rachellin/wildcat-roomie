import React from 'react';
import { StyledFilters } from './style/HeaderStyles';
import { Filter } from './Filter';
import { FilterDropdown } from './FilterDropdown';

import { filters, filterArr } from './FilterData';

export class FilterContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            dropdowns: Array(Object.keys(filters).length).fill(false)
        }
    }

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
            dropdown = <FilterDropdown
                            title={Object.keys(filters)[i]}
                            filterNames={Object.values(filters)[i]} // ??? 
                            filters={this.props.filters}
                            dropdownIndex={i}
                            onClick={(filterIndex) => this.props.onClick(filterIndex, i)} // i = dropDown index
                            openDropdown={() => this.openDropdown(i)}
                            overflow={this.state.dropdowns[i] ? "overflow" : "hidden"}
                        />
            arr.push(dropdown);
        }
        return arr;
    }
    // make it so that for (most)some of them, user can only choose one filter from dropdown
    // once you click on one of the filters of the dropdown, the other filters are "unclicked"
    // the clicking doesn't work properly 
    // get index of filter in the filterArr

    openDropdown(i) {
        let dropdownCopy = this.state.dropdowns.slice()
        if (!dropdownCopy[i]) {
            dropdownCopy[i] = true;
        } else {
            dropdownCopy[i] = false;
        }
        this.setState({ dropdowns: dropdownCopy });
    }

    render () {
        return (
            <div style={{
                position: 'relative', 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: 'center', 
            }}>
                {this.renderDropdowns()}
            </div>
        )
    } // increase zindex only when opened?
}

FilterContainer.defaultProps = {
    filterArr: filterArr
}
  
/* CHANGES
filterNames should still be all the filters 
filterContainer contains each filterDropdown
filterDropdwon contains its respective filters 
*/