import React from 'react';
import { Card } from './Card';
import { StyledProfileCont } from './style/ProfileStyles';
import { FilterContainer } from './FilterContainer';

import { filters, filterArr } from './FilterData';

export class ProfileContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            filterNames: filterArr, 
            filters: new Array(filterArr.length).fill(false), 
            roommateOnly: false,
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
            this.setState({ loadingMsg: "website currently under maintenance. please check back later."});
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
        const res = await fetch(`https://wildcat-roomie.herokuapp.com/api/profiles/all`);
        const resjson = await res.json();
        const profiles = resjson.data;
        console.log(profiles)
        this.setState({ 
            cardInfo: [...profiles],
            loading: false,
            showCard: new Array(profiles.length).fill(true),
        });
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

    handleClick (on, f, index, cardInfo) {
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
        for (let i = 0; i < this.state.cardInfo.length; i++) {
            if (!this.includesFilter(this.state.onFilters, this.state.cardInfo[i].filters)) {
                show[i] = false;
            } else {
                show[i] = true;
            }
        }
        console.log("showCard: "+show);
        if (this.state.onFilters.length == 0) show.fill(true);
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
        this.handleClick(this.state.filters[i], this.state.filterNames[i], i, this.state.cardInfo);
    }

    toggleRoommate() {
        let showCardCopy = this.state.showCard.slice();
        let cards = this.state.cardInfo.slice();
        // loop through filters array and set to false if that profile roommate property is false
        for (let i = 0; i < cards.length; i++) {
            if (!cards[i].roommate) {
                showCardCopy[i] = this.state.roommateOnly; 
            }
        }
        this.setState({ showCard: showCardCopy, roommateOnly: !this.state.roommateOnly });
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
            
            <StyledProfileCont>
                {this.renderCards(this.state.cardInfo)}
            </StyledProfileCont>
            </>
        )
    }
}
