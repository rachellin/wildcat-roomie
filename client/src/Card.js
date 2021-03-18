import React from 'react';
//import FlipMove from 'react-flip-move';
import { StyledCard } from './ProfileStyles';
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
                    bio={this.props.bio}
                    lookingFor={this.props.lookingFor}
                    filters={this.props.filters}
                    social={this.props.social}
                    basics={this.props.basics}
                    overlay={this.state.overlay}
                    opacity={this.state.opacity}/> 
                : null
            } 
            {this.props.display ? 
                <StyledCard onClick={() => this.openProfile()}>
                    <img src={this.props.img} alt="profile image"></img>
                    <h1>{this.props.name}</h1>
                </StyledCard>
                : null
            }
            </>
        )
    }
}

// animation works when showing it but not hidnig it