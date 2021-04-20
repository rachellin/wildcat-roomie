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

                    <li><del>fix API crashing</del>
                        <ul>
                            <li>
                                I've made changes to the way I deployed the API and it hasn't been crashing for me but
                                let me know if it does for you. If the page takes a while to load, that likely means that
                                the page hasn't been visited for a while, so Heroku (where I'm hosting my API) unloaded my 
                                thing from its servers. If the page loads for long enough that it's an issue, the home page will say so. 
                                (In other words, as long as it says "loading..." it's probably just taking a while to reload
                                everything)
                            </li>
                        </ul>
                    </li>

                    <li>text input for "about you" and "looking for" to allow editing in previous lines</li>
                </ul>
            </div>
        )
    }
}