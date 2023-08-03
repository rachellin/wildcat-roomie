import React from 'react';
import { Card } from './Card';
import { StyledProfileCont } from '../style/ProfileStyles';
import { FilterContainer } from '../filters/FilterContainer';
import { StyledTabs } from '../style/Style';

import { filters, filterArr, possibleYears } from '../filters/FilterData';

//const url = "http://localhost:9000";
const url = "https://wildcat-roomie.fly.dev";

export class ProfileContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            filterNames: filterArr, 
            filters: new Array(filterArr.length).fill(false), 
            roommateOnly: false,
            class: "2026",
            onFilters: [], 
            showCard: new Array(1).fill(true), 
            cardInfo: [],
            loading: true,
            loadingMsg: "loading...",
            maintenance: false
        }
    }

    componentDidMount () {
        if (this.state.maintenance) {
            //this.setState({ loadingMsg: "website currently under maintenance. please check back later."});
            this.setState({ loadingMsg: <a href="https://rachellin.github.io/wildcat-roomie-static/#/">
                currently under maintenance, click here to redirect to static version of this app</a> })
            return;
        }
        this.callAPI();
        setTimeout(() => {
            if (this.state.loading) {
                this.setState({ loadingMsg: "loading... this might take a few seconds if this site has been unvisited for a while (see 'feedback' tab)"});
            }
        }, 2.5*1000);
        setTimeout(() => {
            if (this.state.loading) {
                this.setState({ loadingMsg: "timed out: the API most likely crashed (thanks Heroku). try again later or contact me"});
            }
        }, 15*1000);
    }

    callAPI = async () => {
        const res = await fetch(`${url}/api/profiles/all`);
        const resjson = await res.json();
        const profiles = resjson.data;
        this.setState({ 
            cardInfo: [...profiles],
            loading: false,
            showCard: new Array(profiles.length).fill(true),
        });

       this.handleClick(this.state.filters[0], this.state.filterNames[0], 0); // set default selected filter to 2026

    }

    addFilter (f) {
        this.state.onFilters.push(f);
    }

    removeFilter (f) {
        for (let i = 0; i < this.state.onFilters.length; i++) {
            if (this.state.onFilters[i] == f) {
                this.state.onFilters.splice(i, 1);
            }
        }
    }

    // on = filter clicked (from state filter array)
    // f = filter name
    // index = index of filter in filter array
    handleClick (on, f, index) {
        if (on) {
            this.state.filters[index] = false;
            this.removeFilter(f);
        } else {
            this.state.filters[index] = true;
            this.addFilter(f);
        }
        console.log(this.state.filters);
        console.log(this.state.onFilters);
        console.log("\n");
        let show = this.state.showCard.slice();

        if (this.state.onFilters.length == 0) show.fill(true);
        
        for (let i = 0; i < this.state.cardInfo.length; i++) {
            if (!this.includesFilter(this.state.onFilters, this.state.cardInfo[i].filters)) {
                show[i] = false;
            } else {
                show[i] = true;
            }
            if (this.state.roommateOnly && show[i] && !this.state.cardInfo[i].roommate) {
                show[i] = false;
            }
        }
        console.log("showCard: "+show);
        this.setState({ showCard: [...show] });
        setTimeout(() => {
            console.log("state.showCard: "+this.state.showCard);
        }, 1000);
    }

    // if array cardFilters has ALL of the items in array filters
    includesFilter (filters, cardFilters) {
        let counter = 0;
        for (let i = 0; i < filters.length; i++) {
            if (cardFilters.includes(filters[i])) {
                counter++;
            }
        }
        if (counter == filters.length) return true;
        return false;
    }

    renderCards (info) {
        let arr = [];
        let card;
        for (let i = 0; i < info.length; i++) {
            card = (
                <Card 
                    key={info[i].name}
                    name={`${info[i].firstName} ${info[i].lastName}`} 
                    img={info[i].img} 
                    filters={info[i].filters} 
                    display={this.state.showCard[i]}
                    basics={info[i].basics}
                    social={info[i].social}
                    about={info[i].about}
                    roommate={info[i].roommate}
                    />
            )
            arr.push(card);
        }
        console.log(arr);
        return(arr);
    }

    getFilterIndex (filterIndex, dropdownIndex) {
        let keys = Object.keys(filters);
        let filter = filters[keys[dropdownIndex]][filterIndex];
        for (let i = 0; i < filterArr.length; i++) {
          if (filterArr[i] == filter) return i;
        }
        return null;
    }

    filterClick (filterIndex, dropdownIndex) {
        let i = this.getFilterIndex(filterIndex, dropdownIndex);
        this.handleClick(this.state.filters[i], this.state.filterNames[i], i);
    }

    toggleRoommate() {
        let showCardCopy = this.state.showCard.slice();
        let cards = this.state.cardInfo.slice();
        // loop through filters array and set to false if that profile roommate property is false
        // roommateOnly state is the opposite of the intention when it's used in the loop
        for (let i = 0; i < cards.length; i++) {
            if (!cards[i].roommate) {
                showCardCopy[i] = this.state.roommateOnly; 
            }
        }
        
        // make sure profiles still shown according to applied filters
        for (let i = 0; i < this.state.cardInfo.length; i++) {
            if (!this.includesFilter(this.state.onFilters, this.state.cardInfo[i].filters)) {
                showCardCopy[i] = false;
            } else {
                showCardCopy[i] = true;
            }
        }

        this.setState({ showCard: showCardCopy, roommateOnly: !this.state.roommateOnly });
    }

    // function currently not in use
    toggleClass(year) {
        let showCardCopy = this.state.showCard.slice();
        let cards = this.state.cardInfo.slice();
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].year != year) {
                showCardCopy[i] = false;
            }
            if (cards[i].year == year) {
                showCardCopy[i] = true;
            }
        }
        // only add filter if not already in onFilters
        if (!this.state.onFilters.includes(year)) {
            this.addFilter(year);
        }
        // remove all other years 
        possibleYears.forEach(y => {
            if (y != year) this.removeFilter(y)
        })
        this.setState({ showCard: showCardCopy, class: year })
    }

    render () {
        if (this.state.loading) return (
            <>
            <FilterContainer 
                onClick={(filterIndex, dropdownIndex) => this.filterClick(filterIndex, dropdownIndex)}
                filterNames={this.state.filterNames} 
                filters={this.state.filters} 
                colors={this.state.filterColors}
            /> 
            <h1>{this.state.loadingMsg}</h1>
            </>
        );

        return (
            <> 
            <FilterContainer 
                onClick={(filterIndex, dropdownIndex) => this.filterClick(filterIndex, dropdownIndex)}
                filterNames={this.state.filterNames} 
                filters={this.state.filters} 
                colors={this.state.filterColors}
            /> 

            <div style={{ marginBottom: "1rem" }}>
                <b>applied filters: </b>
                {this.state.onFilters.length == 0 ? "none" : 
                    this.state.onFilters.map((filter, index) => {
                        if (index == this.state.onFilters.length-1) {
                            return filter;
                        } else {
                            return filter + ", ";
                        }
                    })}

            </div>

            <div style={{display: "flex"}}>
                <input 
                    type="checkbox" id="roommate"
                    onChange={() => this.toggleRoommate()}/>
                <label for="roommate">show only those looking for roommate</label>
            </div>

            {/* <StyledTabs>
                    <button onClick={() => this.toggleClass(2026)}
                            >2026</button>
                    <button onClick={() => this.toggleClass(2025)}>2025</button>
            </StyledTabs> */}
            
            <StyledProfileCont>
                {this.renderCards(this.state.cardInfo)}
                {/* {this.renderCards(this.state.cardInfo, this.state.class)} or
                {this.renderCards(this.state.cardInfo, this.props.class)} */}
            </StyledProfileCont>
            </> 
        )
    }
}
