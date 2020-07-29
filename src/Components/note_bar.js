import React, { Component } from 'react';

class NoteBar extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
    this.createNote = this.createNote.bind(this);
  }

  OnInputChange = (event) => {
    this.setState({ title: event.target.value });
  }

  createNote() {
    this.props.onSubmitNote(this.state.title);
    this.setState({ title: '' });
  }

  render() {
    return (
      <div className="noteBar">
        <input onChange={this.OnInputChange} value={this.state.title} placeholder="Note Title" />
        <button onClick={this.createNote} value={this.state.title} type="submit">Submit</button>
      </div>
    );
  }
}

export default NoteBar;
