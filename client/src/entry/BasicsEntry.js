import React from 'react';
import 'remixicon/fonts/remixicon.css'

export class BasicsEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    updateData(category, target, value) {
        this.setState({ [target]: value }, () => {
            let data = this.state;
            this.props.updateData(category, data);
        });
    }

    render() {
        return (
            <>
                <div class="section">
                    <div class="form-group">
                        <label for="first-name" className="required">first name</label>
                        <input 
                            type="name" name="first-name" placeholder="Jane" 
                            onChange={e => this.updateData("basics", "firstName", e.target.value)}
                            value={this.props.basics.firstName}
                            required/>
                    </div>
                    <div class="form-group">
                        <label for="last-name" className="required">last name</label>
                        <input 
                            type="name" name="last-name" placeholder="Doe" 
                            onChange={e => this.updateData("basics", "lastName", e.target.value)}
                            value={this.props.basics.lastName}
                            required/>
                    </div>
                </div>

                <div class="section">
                    <div class="form-group">
                        <label for="pronouns" className="required">pronouns</label>
                        <input 
                            type="text" name="pronouns" placeholder="she/her" 
                            onChange={e => this.updateData("basics", "pronouns", e.target.value)}
                            value={this.props.basics.pronouns}
                            required/>
                    </div>
                    <div class="form-group">
                        <label for="mbti">MBTI</label>
                        <input 
                            type="text" name="mbti" placeholder="INFJ"
                            onChange={e => this.updateData("basics", "mbti", e.target.value)}
                            value={this.props.basics.mbti}/>
                    </div>
              </div>

              <div class="section">
                    <div class="form-group">
                        <label for="location" className="required">location</label>
                        <input 
                            type="text" name="location" placeholder="NYC"
                            onChange={e => this.updateData("basics", "location", e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="major" className="required">major</label>
                        <input 
                            type="text" name="major" placeholder="computer science"
                            onChange={e => this.updateData("basics", "major", e.target.value)}
                            value={this.props.basics.major}/>
                    </div>

                </div>

              <div class="section">
                <div class="form-group">
                    <label for="phone">phone</label>
                    <input 
                        type="text" name="phone" placeholder="phone number"
                        onChange={e => this.updateData("social", "phone", e.target.value)}
                        value={this.props.social.phone}/>
                </div>
                <div class="form-group">
                    <label for="instagram">instagram</label>
                    <input 
                        type="text" name="instagram" placeholder="username only, no @"
                        onChange={e => this.updateData("social", "instagram", e.target.value)}
                        value={this.props.social.instagram}/>
                </div>
                <div class="form-group">
                    <label for="snapchat">snapchat</label>
                    <input 
                        type="text" name="snapchat" placeholder="username only, no @"
                        onChange={e => this.updateData("social", "snapchat", e.target.value)}
                        value={this.props.social.snapchat}/>
                </div>
              </div>
            </>
        )
    }
}