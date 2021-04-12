import React from 'react';
import { StyledProfile, Overlay } from './style/ProfileStyles';
import 'remixicon/fonts/remixicon.css';

import {filters} from './FilterData';

export class Profile extends React.Component {
    render () {
        return (
            <Overlay opacity={this.props.overlay}>
                <StyledProfile ref={this.props.innerRef} opacity={this.props.opacity}>
                <div onClick={this.props.onClick} className="close"><i className="ri-close-fill"></i></div>

                <div className="side">
                    <img src={this.props.img ? this.props.img : "/pfp.jpg"} alt="profile img"/>
                    <h1>{this.props.name}</h1>

                    <div className="basics">
                        <span><i className="ri-settings-3-line"></i> {this.props.filters.filter(val => filters["school"].includes(val))}</span> 
                        <span><i className="ri-pencil-line"></i> {this.props.basics.major}</span>
                        <span><i className="ri-star-line"></i> {this.props.filters.filter(val => filters["mbti"].includes(val))}</span>
                        <span><i className="ri-map-pin-line"></i> {this.props.basics.location}</span>
                    </div>

                    <div className="social-media">
                        <span><i className="ri-instagram-line"></i> <a href=""> {this.props.social.ig ? this.props.social.ig : ""}</a></span>
                        <span><i className="ri-snapchat-line"></i> {this.props.social.snap ? this.props.social.snap : ""}</span>
                        <span><i className="ri-phone-line"></i> {this.props.social.phone ? this.props.social.phone : ""}</span>
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
                    <div className="about">
                        <h1>about</h1>
                        {this.props.about.bio}
                    </div>
                    <div className="looking-for">
                        <h1>looking for</h1>
                        {this.props.about.looking}
                    </div>
                </div>
                </StyledProfile>
            </Overlay>
        )
    }
}


// school/major icon should depend on their input 
// take school from filters 
