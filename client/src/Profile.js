import React from 'react';
import { StyledProfile, Overlay } from './ProfileStyles';
import 'remixicon/fonts/remixicon.css';

export class Profile extends React.Component {
    render () {
        return (
            <Overlay opacity={this.props.overlay}>
                <StyledProfile ref={this.props.innerRef} opacity={this.props.opacity}>
                <div onClick={this.props.onClick} className="close"><i className="ri-close-fill"></i></div>

                <div className="side">
                    <img src={this.props.img} alt="profile img"/>
                    <h1>{this.props.name}</h1>

                    <div className="basics">
                        <span><i className="ri-settings-3-line"></i> McCormick</span> 
                        <span><i className="ri-pencil-line"></i> {this.props.bio.major}</span>
                        <span><i className="ri-star-line"></i> INFJ</span>
                        <span><i className="ri-map-pin-line"></i> {this.props.bio.location}</span>
                    </div>

                    <div className="social-media">
                        <span><i className="ri-instagram-line"></i> <a href=""> {this.props.social.ig}</a></span>
                        <span><i className="ri-snapchat-line"></i> {this.props.social.snap}</span>
                        <span><i className="ri-phone-line"></i> {this.props.social.phone}</span>
                    </div>
                </div>

                <div className="bio-filters">
                    {this.props.filters.map(filter => <span>{filter}</span>)}
                </div>

                <div className="bio">
                    <div className="about">
                        <h1>about</h1>
                        {this.props.bio.about}
                    </div>
                    <div className="looking-for">
                        <h1>looking for</h1>
                        {this.props.bio.looking}
                    </div>
                </div>
                </StyledProfile>
            </Overlay>
        )
    }
}

// school/major icon should depend on their input 
// take school from filters 
