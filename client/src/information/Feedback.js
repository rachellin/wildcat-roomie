import React from 'react';

import { StyledFeedback } from '../style/Style';

export function Feedback() {
    return(
        <StyledFeedback>
            <h3 style={{ marginBottom: "0.5rem" }}><a target="_blank" href="https://forms.gle/NfMPxFaHm31YySf66">feedback form</a></h3>
                Use the form linked above to provide feedback! Changes/bugs (including those that are not from feedback)
                that I've taken into account and will address ASAP are listed below. <br/>
                Striked through points = fixed/implemented

            <h3>bugs</h3>
            <ol>
                <li><del>fix API crashing</del></li>
                <li><del>fix for text input for "about you" and "looking for" making cursor jump to last line</del></li>
            </ol>

            <h3>other pending changes</h3>
            <ol>
                <li><del>fix for long names</del></li>
                <li><del>word count limit or scrollbars in profiles</del></li>
                <li>move "international" to "regions"</li>
            </ol>

            <h3>updates</h3>
            <ul>
                <li>
                    <i>4/18/21:</i> &nbsp;bug #1 fix<br/>I've made changes to the way I deployed the API and it hasn't been crashing for me but
                    let me know if it does for you. If the page takes a while to load, that likely means that
                    the page hasn't been visited for a while, so Heroku (where I'm hosting my API) unloaded my 
                    thing from its servers. If the page loads for long enough that it's an issue, the home page will say so. 
                    (In other words, as long as it says "loading..." it's probably just taking a while to reload
                    everything)
                </li>
                <li>
                    <i>4/20/21:</i> &nbsp;"looking for" section is now optional, show applied filters
                </li>
                <li>
                    <i>4/21/21:</i> &nbsp;home page made a bit more mobile-friendly/responsive, mobile warning message added
                </li>
                <li>
                    <i>4/23/21:</i> &nbsp;scrollbar in about/looking for sections, truncate long names
                </li>
            </ul>
        </StyledFeedback>
    )
}