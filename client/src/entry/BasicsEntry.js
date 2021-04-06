import React from 'react';
import 'remixicon/fonts/remixicon.css'
//import DropdownButton from 'react-bootstrap/DropdownButton';

export class BasicsEntry extends React.Component {
    render() {
        return (
            <>
                <div class="section">
                    <div class="form-group">
                        <label for="first-name" className="required">first name</label>
                        <input type="name" name="first-name" placeholder="Jane" required/>
                    </div>
                    <div class="form-group">
                        <label for="last-name" className="required">last name</label>
                        <input type="name" name="last-name" placeholder="Doe" required/>
                    </div>
                </div>

                <div class="section">
                    <div class="form-group">
                        <label for="pronouns" className="required">pronouns</label>
                        <input type="text" name="pronouns" placeholder="she/her" required/>
                    </div>
                    <div class="form-group">
                        <label for="mbti">personality</label>
                        <input type="text" name="mbti" placeholder="INFJ"/>
                    </div>
              </div>

              <div class="section">
                    <div class="form-group">
                        <label for="location" className="required">location</label>
                        <input type="text" name="location" placeholder="NYC"/>
                    </div>
                    <div class="form-group">
                        <label for="major" className="required">major</label>
                        <input type="text" name="major" placeholder="computer science"/>
                    </div>

                </div>

              <div class="section">
                <div class="form-group">
                    <label for="phone">phone</label>
                    <input type="text" name="phone" placeholder="phone number"/>
                </div>
                <div class="form-group">
                    <label for="instagram">instagram</label>
                    <input type="text" name="instagram" placeholder="username only, no @"/>
                </div>
                <div class="form-group">
                    <label for="snapchat">snapchat</label>
                    <input type="text" name="snapchat" placeholder="username only, no @"/>
                </div>
              </div>
            </>
        )
    }
}