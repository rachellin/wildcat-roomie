import React from 'react';

export class Feedback extends React.Component {
    render() {
        return (
            <div>
                <h3><a target="_blank" href="https://forms.gle/NfMPxFaHm31YySf66">feedback form</a></h3>
                <h3>pending changes</h3>
                <ul>
                    <li>fix for long names</li>
                    <li>word count limit or scrollbars in profiles</li>
                    <li>better hosting service? this has been randomly crashing
                        (I've made changes to the way I deployed the API but we'll see if it changes anything.
                        If you get errors, please let me know!)
                    </li>
                    <li>text input for "about you" and "looking for" to allow editing in previous lines
                    </li>
                </ul>
            </div>
        )
    }
}