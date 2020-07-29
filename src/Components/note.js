/* eslint-disable react/no-danger */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      iconString: 'fa fa-pencil',
      text: props.note.text,
      title: props.note.title,
      x: props.note.x,
      y: props.note.y,

    };

    this.width = '250px';
    this.height = '350px';
    this.id = props.id;
  }

  deleteNote = () => {
    this.props.deleteNote(this.id);
  }

  handleDrag = (e, data) => {
    const noteProps = {
      title: this.state.title,
      text: this.state.text,
      x: data.x,
      y: data.y,
    };
    this.props.updateNote(this.id, noteProps);
    this.setState({ x: data.x });
    this.setState({ y: data.y });
  }

  startEdits = () => {
    if (this.state.isEditing) {
      this.setState({ iconString: 'fa fa-pencil' });
      this.setState({ isEditing: false });

      const noteProps = {
        title: this.state.title,
        text: this.state.text,
        x: this.state.x,
        y: this.state.y,
      };
      this.props.updateNote(this.id, noteProps);
    } else {
      this.setState({ iconString: 'fa fa-check' });
      this.setState({ isEditing: true });
    }
  }

  editNote = (event) => {
    if (this.state.isEditing) {
      this.setState({ text: event.target.value });
    }
  }

  renderText = () => {
    if (this.state.isEditing) {
      return <textarea onChange={this.editNote} className="textarea-container">{this.state.text}</textarea>;
    } else {
      return <div className="text-container" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />;
    }
  }

  render() {
    return (
      <Draggable
        handle=".drag-icon"
        grid={[25, 25]}
        position={{
          x: this.props.note.x, y: this.props.note.y, width: this.width, height: this.height,
        }}
        onDrag={this.handleDrag}
      >
        <div id="note">
          <div className="note-header">
            <div className="note-title">
              {this.props.note.title}
            </div>
            <div id="buttons">
              <button type="button" onClick={this.deleteNote}><i className="fa fa-trash" /></button>
              <button type="button" onClick={this.startEdits}><i className={this.state.iconString} /></button>
              <button type="button" className="drag-icon"><i className="fa fa-arrows" /></button>
            </div>
          </div>
          <div>{this.renderText()}</div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
