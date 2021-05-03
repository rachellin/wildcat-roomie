import React from 'react';

export function Instructions() {
    return (
        <div>
            <h3>wtf is this?</h3>
            <p>Hey there! Welcome!!</p>

            <p>
                I'm Rachel Lin, an incoming computer science and MMSS double major, and I worked on this instead of paying attention in class :)
                Here's my <a target="_blank" href="https://instagram.com/dklarachel">instagram</a>, my email is rachlin232@gmail.com, and you can CTRL/CMD+F "Rachel Lin" to find out more about me!
            </p>

            <p>
                I created this as a way to more easily view and filter profiles to find roommates!
                However, this also doubles as a friend-finder sort of thing - you can easily find people with similar interests. 
                You can indicate whether or not you're looking for a roommate; you can un/check "show only those looking for roommate."
            </p>

            <p>
                Click the filter categories ("sleep", "school", etc.) to see the filters. Click on filter to add filter.
                Click on filter again to remove filter. <br/>
                *This is a <b>web</b> app, so please view on web.
            </p>

            <p>
                Click on a card to see more about the person!
                Their profile displays their tags, basic info about them, contact info, a bio, and what they're looking for in a roommate.
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
                <br/>Try to limit your pictures to nothing much bigger than 200px x 200px and preferably JPG as opposed to PNG but it's not a requirement. 
                <br/>Yes, the "about you" and "what you're looking for in a roommate" sections preserve line breaks you make. 
            </p>

            <p>
                Click on "edit profile" to edit your profile. You'll be prompted to enter the email you used to create the profile.
                &nbps;<i>What kind of authentication is that?</i>&nbsp; you say. It's not authentication. 
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