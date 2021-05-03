import React from 'react';
import { StyledProfile, Overlay } from '../style/ProfileStyles';
import 'remixicon/fonts/remixicon.css';

import {filters} from '../filters/FilterData';

const schoolIcons = {
    "Weinberg": "ri-test-tube-line",
    "McCormick": "ri-settings-3-line",
    "School of Communication": "ri-wechat-2-line",
    "Medill": "ri-newspaper-line",
    "Bienen": "ri-music-2-line",
    "SESP": "ri-government-fil"
}

export function Profile(props) {
    function matchIcon(school) {
        let keys = Object.keys(schoolIcons);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] == school) {
                return schoolIcons[keys[i]];
            }
        }
    }

    let schools = props.filters.filter(val => filters["school"].includes(val));

    return (
        <Overlay opacity={props.overlay}>
            <StyledProfile ref={props.innerRef} opacity={props.opacity}>
            <div onClick={props.onClick} className="close"><i className="ri-close-fill"></i></div>

            <div className="side">
                <img src={props.img ? props.img : "/wildcat-roomie/pfp.jpg"} alt="profile img"/>
                <h1>{props.name}</h1>

                <div className="basics">
                    <span><i className="ri-user-line"></i> {props.basics.pronouns}</span>
                    {schools.map(school => <span><i className={matchIcon(school)}></i> {school}</span>)}
                    <span><i className="ri-pencil-line"></i> {props.basics.major}</span>

                    {props.basics.mbti ? 
                        <span><i className="ri-star-line"></i> {props.filters.filter(val => filters["mbti"].includes(val))}</span>
                    : null}

                    <span><i className="ri-map-pin-line"></i> {props.basics.location}</span>
                </div>

                <div className="social-media">

                    {props.social.ig ? 
                        <span><i className="ri-instagram-line"></i> <a target="_blank" href={`https://instagram.com/${props.social.ig}`}> {props.social.ig}</a></span>
                    :   ""}
                    {props.social.snap ?
                        <span><i className="ri-snapchat-line"></i> {props.social.snap}</span> 
                    :   ""}
                    {props.social.phone ?
                        <span><i className="ri-phone-line"></i> {props.social.phone}</span>
                    :   ""}

                </div>

                <div className="roommate-label">
                    {props.roommate ? <><b>looking</b> for roommate</> :<><b>not looking</b> for roommate</>}
                </div>
            </div>

            <div className="bio-filters">
                {props.filters.map(filter => {
                    if (filter == "none" || filter == "both/neither") {
                        return;
                    } 
                    return <span>{filter}</span>;
                })}
            </div>

            <div className="bio">
                <div className="about" style={{whiteSpace: "pre-wrap"}}>
                    <h1>about</h1>
                    <p>{props.about.bio}</p>
                </div>
                
                {props.about.looking && props.about.looking.trim().length > 0 ? 
                    <div className="looking-for" style={{whiteSpace: "pre-wrap"}}>
                        <h1>looking for</h1>
                        <p>{props.about.looking}</p>
                    </div> :
                null}

            </div>
            </StyledProfile>
        </Overlay>
    )
}