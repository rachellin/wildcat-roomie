import React from 'react';
import { StyledCard } from '../style/ProfileStyles';
import { Profile } from './Profile';

export class Card extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            profileOpen: false,
            overlay: 0,
            opacity: 0
        }
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    openProfile () {
        this.setState({
            profileOpen: true,
            overlay: 0.5,
            opacity: 1
        });
    }

    closeProfile () {
        this.setState({
            profileOpen: false,
            opacity: 0
        });
    }

    handleClickOutside (event) {
        if (this.state.profileOpen && this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.closeProfile();
        }
    }
    
    render () {
        return (
            <>
            {this.state.profileOpen ? 
                <Profile
                    innerRef={this.wrapperRef} 
                    onClick={() => this.closeProfile()} 
                    img={this.props.img} 
                    name={this.props.name}
                    about={this.props.about}
                    filters={this.props.filters}
                    social={this.props.social}
                    basics={this.props.basics}
                    roommate={this.props.roommate}
                    overlay={this.state.overlay}
                    opacity={this.state.opacity}/> 
                : null
            } 
            {this.props.display ? 
                <StyledCard onClick={() => this.openProfile()}>
                    <img src={this.props.img ? this.props.img : "/wildcat-roomie/pfp.jpg"} alt="profile image"></img>
                    <h1 style={{
                        marginBottom: 0, 
                        fontSize: "1.8rem",
                        whiteSpace: "nowrap",
                        overflowX: "hidden",
                        textOverflow: "ellipsis"
                    }}>{this.props.name}</h1>
                    <i style={{wordWrap: "break-word", fontSize: "0.9rem"}}>{this.props.about.quote}</i>
                </StyledCard>
                : null
            }
            </>
        )
    }
}

