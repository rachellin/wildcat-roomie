import React from 'react';

export class Feedback extends React.Component {
    render() {
        return (
            <div>
                <h3 style={{ marginBottom: "0.5rem" }}><a target="_blank" href="https://forms.gle/NfMPxFaHm31YySf66">feedback form</a></h3>
                Use the form linked above to provide feedback! Changes/bugs (including those that are not from feedback)
                that I've taken into account and will address ASAP are listed below. <br/>
                Striked through points = fixed/implemented

                <h3 style={{ margin: "2rem 0 0.5rem 0" }}>pending changes</h3>
                <ul style={{ marginTop: "0.5rem" }}>
                    <li>fix for long names</li>

                    <li>word count limit or scrollbars in profiles</li>

                    <li><del>fix API crashing</del> 
                        <ul>
                            <li>
                                <i>4/18/21:</i> I've made changes to the way I deployed the API and it hasn't been crashing for me but
                                let me know if it does for you. If the page takes a while to load, that likely means that
                                the page hasn't been visited for a while, so Heroku (where I'm hosting my API) unloaded my 
                                thing from its servers. If the page loads for long enough that it's an issue, the home page will say so. 
                                (In other words, as long as it says "loading..." it's probably just taking a while to reload
                                everything)
                            </li>
                        </ul>
                    </li>

                    <li><del>fix for text input for "about you" and "looking for" making cursor jump to last line</del>
                    <i>&nbsp;fixed 4/20/21</i></li>

                    <li><del>make "looking for" section optional</del> <i>updated 4/20/21</i></li> 
                </ul>
            </div>
        )
    }
}