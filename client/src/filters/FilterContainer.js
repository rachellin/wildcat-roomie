import React from 'react';
import { StyledFilterContainer } from '../style/HeaderStyles';
import { FilterDropdown } from './FilterDropdown';

import { filters, filterArr } from './FilterData';

export class FilterContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            dropdowns: Array(Object.keys(filters).length).fill(false)
        }
    }

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
                            filterNames={Object.values(filters)[i]} 
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

    openDropdown(i) {
        let dropdownCopy = this.state.dropdowns.slice();
        for (let x = 0; x < dropdownCopy.length; x++) {
            if (x !== i) {
              dropdownCopy[x] = false;
            }
        }          
        if (!dropdownCopy[i]) {
            dropdownCopy[i] = true;
        } else {
            dropdownCopy[i] = false;
        }
        this.setState({ dropdowns: dropdownCopy });
    }

    render () {
        return (
            <StyledFilterContainer>
                {this.renderDropdowns()}
            </StyledFilterContainer>
        )
    } 
}


  