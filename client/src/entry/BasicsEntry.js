import React from 'react';
import 'remixicon/fonts/remixicon.css'

export class BasicsEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    updateData(target, value) {
        this.setState({ [target]: value }, () => {
            let data = this.state;
            this.props.updateData("basics", data);
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
                            onChange={e => this.updateData("firstName", e.target.value)}
                            required/>
                    </div>
                    <div class="form-group">
                        <label for="last-name" className="required">last name</label>
                        <input 
                            type="name" name="last-name" placeholder="Doe" 
                            onChange={e => this.updateData("lastName", e.target.value)}
                            required/>
                    </div>
                </div>

                <div class="section">
                    <div class="form-group">
                        <label for="pronouns" className="required">pronouns</label>
                        <input 
                            type="text" name="pronouns" placeholder="she/her" 
                            onChange={e => this.updateData("pronouns", e.target.value)}
                            required/>
                    </div>
                    <div class="form-group">
                        <label for="mbti">personality</label>
                        <input 
                            type="text" name="mbti" placeholder="INFJ"
                            onChange={e => this.updateData("mbti", e.target.value)}/>
                    </div>
              </div>

              <div class="section">
                    <div class="form-group">
                        <label for="location" className="required">location</label>
                        <input 
                            type="text" name="location" placeholder="NYC"
                            onChange={e => this.updateData("location", e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="major" className="required">major</label>
                        <input 
                            type="text" name="major" placeholder="computer science"
                            onChange={e => this.updateData("major", e.target.value)}/>
                    </div>

                </div>

              <div class="section">
                <div class="form-group">
                    <label for="phone">phone</label>
                    <input 
                        type="text" name="phone" placeholder="phone number"
                        onChange={e => this.updateData("phone", e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="instagram">instagram</label>
                    <input 
                        type="text" name="instagram" placeholder="username only, no @"
                        onChange={e => this.updateData("instagram", e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="snapchat">snapchat</label>
                    <input 
                        type="text" name="snapchat" placeholder="username only, no @"
                        onChange={e => this.updateData("snapchat", e.target.value)}/>
                </div>
              </div>
            </>
        )
    }
}