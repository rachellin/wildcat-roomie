import React from 'react';
import { Card } from './Card';
import { StyledProfileCont } from './style/ProfileStyles';
import { FilterContainer } from './FilterContainer';
//import {Animated} from "react-animated-css";

import { filters, filterArr } from './FilterData';
//const filters = ["morning", "STEM"];

export class ProfileContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            filterNames: filterArr, // do i just put the long array of filters here 
            filters: new Array(filterArr.length).fill(false), // length: 23 + # of dorms + # of schools 
            onFilters: [], // what the hell is this for 
            showCard: new Array(1).fill(true), 
            cardInfo: [],
            loading: true,
        }
    }

    componentDidMount () {
        this.callAPI();
        //this.testAPI();
        //this.state.filters.fill(false);
        //console.log(this.state.filters);
        //this.state.showCard.fill(true);
    }

    componentDidUpdate () {
        console.log(this.state.filters);
    }

    callAPI = async () => {
        const res = await fetch(`http://localhost:9000/api/profiles`);
        const resjson = await res.json();
        const parsed = JSON.parse(resjson);
        console.log(parsed);
        this.setState({ 
            cardInfo: [...parsed],
            //cardInfo: [...cardInfoLocal],
            loading: false,
            showCard: new Array(parsed.length).fill(true),
        });
    }

    testAPI = async () => {
        const res = await fetch(`http://localhost:9000/testAPI/test`);
        const resjson = await res.json();
        //console.log(resjson);
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
            // if (this.state.showCard[i] == false) {
            //     card = null;
            // } else {
            //     card = <Card name={info[i].name} img={info[i].img} filters={info[i].filters}/>
            // }
            card = (
                <Card 
                    key={info[i].name}
                    name={info[i].name} 
                    img={info[i].img} 
                    filters={info[i].filters} 
                    display={this.state.showCard[i]}
                    bio={info[i].bio}
                    social={info[i].social}
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

    render () {
        // const data = JSON.parse(this.props.apiResponse);
        // let dataArr = [data];
        // console.log(dataArr);
        //let cardInfo = [data];
        if (this.state.loading) return <h1>loading...</h1>;

        return (
            <>
            <FilterContainer 
                //onClick={(i) => this.handleClick(this.state.filters[i], this.state.filterNames[i], i, this.state.cardInfo)}
                onClick={(filterIndex, dropdownIndex) => this.filterClick(filterIndex, dropdownIndex)}
                filterNames={this.state.filterNames} 
                filters={this.state.filters} 
                colors={this.state.filterColors}
            />  
            <StyledProfileCont>
                {this.renderCards(this.state.cardInfo)}
            </StyledProfileCont>
            </>
        )
    }
}

let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let lorem2 = lorem + lorem;
let basics = {
    school: "McCormick",
    major: "computer science",
    personality: "INFJ",
    location: "NYC",
}
let social = {
    ig: "dklarachel",
    snap: "lechar.mai",
    phone: "917 392 1992"
}
let cardInfoLocal = [
    {
        name: "helene aquilla",
        img: "/pfp.jpg",
        filters: ["morning"],
        bio: {
            about: lorem,
            looking: lorem2,
            location: "NYC"
        }
    },
    {
        name: "maven calore",
        img: "https://i.imgur.com/8NOcnwx.png",
        filters: ["STEM"],
        bio: {
            about: lorem,
            looking: lorem2,
            location: "NYC"
        }
    },
    {
        name: "lila bard",
        img: "https://i.imgur.com/8d3uzkw.png",
        filters: ["morning", "STEM"],
        bio: {
            about: lorem,
            looking: lorem2,
            location: "NYC"
        }
    },
    {
        name: "inej ghafa",
        img: "https://i.imgur.com/qTiWjPw.png",
        filters: ["night"],
        bio: {
            about: lorem,
            looking: lorem2,
            location: "NYC"
        }
    },
    {
        name: "nina zenik",
        img: "https://i.pinimg.com/564x/0b/2e/88/0b2e888de375655b6f929d5004eeef02.jpg",
        filters: ["night", "STEM"],
        bio: {
            about: lorem,
            looking: lorem2,
            location: "NYC"
        }
    }
];

/* ALL FILTERS

one or the other:
- sleep: morning person, night person, both/neither
- campus preference: north, south, both/neither
- dorm preference: [dorm], none (or just "none"  in list of dorms)
- personality 
- location (region)

has filter or doesn't have filter:
- QB/low-income
- international 

multiple: (optional)
- dorm preference: [dorm...]

scale 0 to 5: (can filter multiple)
- cleanliness
- partying 

*/

let demo = {
    name: "name",
    img: "url",
    filters: [
        "morning",
        "both/neither",
        "INFJ",
        "Mid-Atlantic",
        "Questbridge",
        "cleanliness: 5",
        "partying: 1"
    ],
    bio: {
        about: "about",
        looking: "looking for",
        location: "location"
    },
    social: {
        ig: "dklarachel",
        snap: "lechar.mai",
        phone: "917 392 1992"
    }
}



// here, have a boolean for whether that card should be shown? 
// this component needs to know the array of turn on filters
// each Card can have a prop with that array

// function to get the onFilters array on mount?

// component updates --> onFilter changes --> if filters doesnt have any in onFilters, hide card
// array showCard 
// should prob have renderCards method 
// re-render with renderCards 

// the cards aren't re-rendering by themselves 
// but it starts doing that weird thing again