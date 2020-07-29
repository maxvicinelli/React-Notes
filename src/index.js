/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-object-spread */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
import NoteBar from './Components/note_bar';
import Note from './Components/note';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IDcounter: 0,
      // eslint-disable-next-line new-cap
      notes: Map(),
    };

    // this.createNote = this.createNote.bind(this);
    // this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({
        notes: Map(notes),
      });
    });
    console.log(this.state.map);
  }

  createNote = (noteTitle) => {
    const noteEntries = {
      title: noteTitle,
      text: '',
      x: 10,
      y: 10,
    };

    db.addNote(noteEntries);

    // this.setState((prevState) => ({
    //   notes: prevState.notes.set(prevState.IDcounter, noteEntries),
    // }));
    this.setState((state) => {
      return { IDcounter: state.IDcounter + 1 };
    });
  }

  deleteNote = (id) => {
    // this.setState((prevState) => ({
    //   notes: prevState.notes.delete(id),
    // }));
    db.removeNote(id);
  }

  updateNote = (id, noteProps) => {
    // this.setState((prevState) => ({
    //   notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, noteProps); }),
    // }));
    db.updateNote(id, noteProps);
  }

  render() {
    return (
      <div className="mainDiv">
        <NoteBar onSubmitNote={this.createNote} />
        <div id="notes">
          {this.state.notes.entrySeq().map(([id, note]) => {
            return <Note key={id} id={id} note={note} updateNote={this.updateNote} deleteNote={this.deleteNote} />;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
