import React from 'react';
import { StyledProfile, Overlay } from './style/ProfileStyles';
import 'remixicon/fonts/remixicon.css';

import {filters} from './FilterData';

const schoolIcons = {
    "Weinberg": "ri-test-tube-line",
    "McCormick": "ri-settings-3-line",
    "School of Communication": "ri-wechat-2-line",
    "Medill": "ri-newspaper-line",
    "Bienen": "ri-music-2-line",
    "SESP": "ri-government-fil"
}

export class Profile extends React.Component {
    matchIcon(school) {
        let keys = Object.keys(schoolIcons);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] == school) {
                return schoolIcons[keys[i]];
            }
        }
    }

    render () {
        let schools = this.props.filters.filter(val => filters["school"].includes(val));
        return (
            <Overlay opacity={this.props.overlay}>
                <StyledProfile ref={this.props.innerRef} opacity={this.props.opacity}>
                <div onClick={this.props.onClick} className="close"><i className="ri-close-fill"></i></div>

                <div className="side">
                    <img src={this.props.img ? this.props.img : "/wildcat-roomie/pfp.jpg"} alt="profile img"/>
                    <h1>{this.props.name}</h1>

                    <div className="basics">
                        <span><i className="ri-user-line"></i> {this.props.basics.pronouns}</span>
                        {schools.map(school => <span><i className={this.matchIcon(school)}></i> {school}</span>)}
                        <span><i className="ri-pencil-line"></i> {this.props.basics.major}</span>
                        <span><i className="ri-star-line"></i> {this.props.filters.filter(val => filters["mbti"].includes(val))}</span>
                        <span><i className="ri-map-pin-line"></i> {this.props.basics.location}</span>
                    </div>

                    <div className="social-media">

                        {this.props.social.ig ? 
                            <span><i className="ri-instagram-line"></i> <a target="_blank" href={`https://instagram.com/${this.props.social.ig}`}> {this.props.social.ig}</a></span>
                        :   ""}
                        {this.props.social.snap ?
                            <span><i className="ri-snapchat-line"></i> {this.props.social.snap}</span> 
                        :   ""}
                        {this.props.social.phone ?
                            <span><i className="ri-phone-line"></i> {this.props.social.phone}</span>
                        :   ""}

                    </div>

                    <div className="roommate-label">
                        {this.props.roommate ? <><b>looking</b> for roommate</> :<><b>not looking</b> for roommate</>}
                    </div>
                </div>

                <div className="bio-filters">
                    {this.props.filters.map(filter => {
                        if (filter == "none" || filter == "both/neither") {
                            return;
                        } 
                        return <span>{filter}</span>;
                    })}
                </div>

                <div className="bio">
                    <div className="about" style={{whiteSpace: "pre-wrap"}}>
                        <h1>about</h1>
                        <p>{this.props.about.bio}</p>
                    </div>
                    
                    {this.props.about.looking && this.props.about.looking.trim().length > 0 ? 
                        <div className="looking-for" style={{whiteSpace: "pre-wrap"}}>
                            <h1>looking for</h1>
                            <p>{this.props.about.looking}</p>
                        </div> :
                    null}

                </div>
                </StyledProfile>
            </Overlay>
        )
    }
}


