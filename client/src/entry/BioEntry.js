import React from 'react';

export class BioEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            about: this.props.about
        }
    }

    updateData(category, target, value) {
        let copy = this.state[category];
        copy[target] = value;
        this.setState({ [category]: copy }, () => {
          let data = this.state[category];
          this.props.updateData(category, data);
        });
    }

    render() {
        return (
            <div class="bio">

                <label for="quote"><b>quote</b></label>
                <small>a short tagline about you and/or what you're looking for in a roommate <i>(max 50 chars)</i></small>
                <textarea
                    maxLength="50"
                    style={{marginBottom: "3rem", height: "50px", overflow: "hidden"}}
                    name="quote" 
                    onChange={e => this.updateData("about", "quote", e.target.value)} 
                    value={this.props.about.quote}/>

                <label className="required" for="about"><b>about you</b></label>
                <textarea
                    style={{marginBottom: "3rem"}}
                    name="about" 
                    onChange={e => this.updateData("about", "bio", e.target.value)} 
                    value={this.props.about.bio}
                    required/>

                <label for="looking-for"><b>what you're looking for in a roommate</b></label>
                <small style={{display: "block", marginLeft: "2rem"}}>not required, but highly recommended if you're looking for a roommate</small>
                <textarea 
                    name="looking-for" 
                    onChange={e => this.updateData("about", "looking", e.target.value)} 
                    value={this.props.about.looking}/> 

            </div>
        )
    }
}

