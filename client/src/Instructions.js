import React from 'react';

export class Instructions extends React.Component {
    render() {
        return (
            <div>
                <p>hey there! welcome!!</p>

                <p>
                    I created this as a way to more easily view and filter profiles. 
                    Click the filter categories ("sleep", "school", etc.) to see the filters. Click on filter to add filter.
                    Click on filter again to remove filter. 
                </p>

                <p>
                    Click on a card to see more about the person!
                    Their profile displays their tags, basic info about them, contact info, a bio, and what they're looking for in a roommate.
                </p>

                <p>
                    This is not only for those looking for roommates! Also if you're looking for friends / people with similar interests.
                    You can indicate whether or not you're looking for a roommate; you can un/check "show only those looking for roommate."
                </p>

                <br/>
                <h3>get started</h3>

                <p>
                    Create your profile by clicking "new profile," entering an email, then filling out the form.
                    You must click "save" for each part of the profile form to save the info you input. 
                    <br/>Your profile won't be posted on the home page until you click "post"! 
                </p>

                <p>
                    There is a singular "save" button for each part of the form, but you must save your profile image with "save profile picture."
                    <br/>Yes, the "about you" and "what you're looking for in a roommate" sections preserve line breaks you make. 
                </p>

                <p>
                    Click on "edit profile" to edit your profile. You'll be prompted to enter the email you used to create the profile.
                    <i>What kind of authentication is that?</i> you say. It's not authentication. 
                    I mean, you can edit anyone's info on the roommate doc and none of the info you input is private; just be nice and don't try to edit someone else's profile thank you xx.
                </p>

                <p>
                    Please provide feedback in the form that I linked! 
                    Let me know about any bugs, comments, concerns, anything you'd liked added, etc.
                    If there is a bug, please do your best to detail the steps with which you reached the bug, so I can reproduce the issue.
                </p>


            </div>
        )
    }
}