import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import message from '../Message';
import api from '../../constants/api';

function AddNote({ recordId,roomName }) {
  AddNote.propTypes = {
    recordId: PropTypes.string,
    roomName:PropTypes.string
  };

  const [addNoteData, setAddNoteData] = useState({
    comments: '',
    room_name:roomName,
    record_id: recordId,
    creation_date: moment().format('DD-MM-YYYY'),
  });

  const handleData = (e) => {
    setAddNoteData({ ...addNoteData, [e.target.name]: e.target.value });
  };

  const SubmitNote = () => {
    //setAddNoteData(console.log(addNoteData))
    api.post('/note/addNote', addNoteData).then(() => {
      message('Add Note Successfully', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 400);
    });
  };

  return (
    <>
        <Row>
          <textarea id="note" name="comments" rows="4" cols="50" onChange={handleData} />
        </Row>
        <Row className="mb-2"></Row>
        <Row className="mb-1">
          <Col md="1">
            <button
              type="button"
              className="btn btn-primary btn-sm shadow-none"
              onClick={SubmitNote}
            >
              Submit
            </button>
          </Col>
          <Col md="1">
            <button type="button" className="btn btn-dark btn-sm shadow-none">
              Cancel
            </button>
          </Col>
        </Row>
    </>
  );
}

export default AddNote;
