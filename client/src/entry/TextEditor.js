import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';

import { StyledEditor } from '../style/Style';

export class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
        this.onChange(newState);
        return 'handled';
    }
    return 'not-handled';
  }

  onStyleClick(style, e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }

  toggleBlockType(style, e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
  }

  render() {
    return (
      <StyledEditor>
        <div className="utils">
          <button onClick={(e) => this.onStyleClick('BOLD', e)}><b>B</b></button>
          <button onClick={(e) => this.onStyleClick('ITALIC', e)}><i>I</i></button>
          <button onClick={(e) => this.onStyleClick('UNDERLINE', e)}><u>U</u></button>
          <button onClick={(e) => this.toggleBlockType('unordered-list-item', e)}>UL</button>
          <button onClick={(e) => this.toggleBlockType('ordered-list-item', e)}>OL</button>
        </div>

        <div className="editor">
          <Editor 
            editorState={this.state.editorState} 
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange} />
        </div>
      </StyledEditor>
    );
  }
}
