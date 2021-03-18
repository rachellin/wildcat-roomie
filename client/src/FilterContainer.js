import React from 'react';
import { StyledFilters } from './HeaderStyles';
import { Filter } from './Filter';

export class FilterContainer extends React.Component {

    renderFilters (filterNames) {
        let arr = [];
        let filter;
        for (let i = 0; i < filterNames.length; i++) {
            filter = <Filter 
                onClick={() => this.props.onClick(i)}
                index={i}
                name={filterNames[i]} 
                // on={this.props.filters[i] ? 1 : 0}
                color={this.props.filters[i] ? "#b3a2d3" : "#dad2ea"}/>
            arr.push(filter);
        }
        return arr;
    }

    render () {
        return (
            <StyledFilters>
                {this.renderFilters(this.props.filterNames)}
            </StyledFilters>
        )
    }
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         filterNames: ["morning", "night", "STEM"],
    //         filters: ["morning", "night", "STEM"],
    //         onFilters: []
    //     }
    // }

    // componentDidMount () {
    //     this.state.filters.fill(false);
    // }

    // componentDidUpdate () {
    //     this.props.onFilters = this.state.onFilters;
    // }

    // addFilter (f) {
    //     this.state.onFilters.push(f);
    // }

    // removeFilter (f) {
    //     for (let i = 0; i < this.state.onFilters.length; i++) {
    //         if (this.state.onFilters[i] == f) {
    //             this.state.onFilters.splice(i, 1);
    //         }
    //     }
    // }

    // handleClick (on, f, index) {
    //     if (on) {
    //         this.state.filters[index] = false;
    //         this.removeFilter(f);
    //     } else {
    //         this.state.filters[index] = true;
    //         this.addFilter(f);
    //     }
    //     // console.log(this.state.filters);
    //     // console.log(this.state.onFilters);
    //     // console.log("\n");
    // }

    // renderFilters (filterNames) {
    //     let arr = [];
    //     let filter;
    //     for (let i = 0; i < filterNames.length; i++) {
    //         filter = <Filter 
    //             index={i}
    //             name={filterNames[i]} 
    //             onClick={() => this.handleClick(this.state.filters[i], filterNames[i], i)}
    //             on={this.state.filters[i] ? 1 : 0}/>
    //         arr.push(filter);
    //     }
    //     return arr;
    // }

    // render () {
    //     return (
    //         <StyledFilters>
    //             {this.renderFilters(this.state.filterNames)}
    //         </StyledFilters>
    //     )
    // }
}

// if on becomes true, add to array
// if becomes false, remove

// FilterContainer.defaultProps = {
//     filterNames: ["morning", "night", "STEM"],
//     filters: ["morning", "night", "STEM"],
//     onFilters: []
// }