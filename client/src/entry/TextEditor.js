import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';

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

  render() {
    return (
      <StyledEditor>
        <div className="utils">
          <button onClick={(e) => this.onStyleClick('BOLD', e)}><b>B</b></button>
          <button onClick={(e) => this.onStyleClick('ITALIC', e)}><i>I</i></button>
          <button onClick={(e) => this.onStyleClick('UNDERLINE', e)}><u>U</u></button>
        </div>

        <Editor 
          editorState={this.state.editorState} 
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange} />
      </StyledEditor>
    );
  }
}
