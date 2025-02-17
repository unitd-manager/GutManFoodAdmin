import React, { useEffect, useState } from 'react';
import { Row, Media } from 'reactstrap';
import Swal from 'sweetalert2';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import img1 from '../../assets/images/users/user1.jpg';
import img2 from '../../assets/images/users/user2.jpg';
import message from '../Message';
import api from '../../constants/api';

function ViewNote({ roomName, recordId }) {
  ViewNote.propTypes = {
    roomName: PropTypes.string,
    recordId: PropTypes.string,
  };
  const body = {
    width: '100%',
    marginBottom: '10px',
  };
  // const tableStyle = {
  //   borderColor: 'black',
  // };

  const [getNote, setGetNote] = useState(null);

  const getNotes = () => {
    api
      .post('/note/getNotes', {
        record_id: recordId,
        room_name: roomName,
      })
      .then((res) => {
        setGetNote(res.data.data);
      });
  };

  const deleteNotes = (commentId) => {
    // console.log(commentId);

    Swal.fire({
      title: `Are you sure?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/note/deleteNotes', { comment_id: commentId })
          .then((res) => {
            console.log(res);
            Swal.fire('Deleted!', 'Media has been deleted.', 'success');
            window.location.reload();
          })
          .catch(() => {
            message('Unable to Delete Media', 'info');
          });
      }
    });
  };

  useEffect(() => {
    getNotes();
  }, [recordId]);

  return (
    <>
      <Row style={{ marginTop: 20 }}>
          {getNote &&
            getNote.map((e, i) => {
              return (
                <>
                  {i % 2 === 0 ? (
                    <Media  className="d-flex" key={e.comment_id.toString()}>
                      <Media left href="#">
                        <Media
                          object
                          src={img1}
                          alt="Generic placeholder image"
                          width="40"
                          style={{ borderRadius: 50 }}
                        />
                      </Media>

                      <Media body className="ms-3" style={body}>
                        <Media heading>
                          <div style={{ position: 'relative' }}>
                            Hello {e.name}
                            <p style={{ position: 'absolute', top: 0, right: 0, fontSize: 12 }}>
                              {e.creation_date}
                              <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                  deleteNotes(e.comment_id);
                                }}
                              >
                                <Icon.Trash2 style={{ width: 20 }} />{' '}
                              </button>
                            </p>
                          </div>
                        </Media>
                        {e.comments}
                      </Media>
                    </Media>
                  ) : (
                    <Media  className="ms-3" key={e.comment_id.toString()}>
                      <Media className="d-flex my-4" >
                        <Media left href="#">
                          <Media
                            object
                            src={img2}
                            alt="Generic placeholder image"
                            width="40"
                            style={{ borderRadius: 50 }}
                          />
                        </Media>
                        <Media body className="ms-3" style={{ width: '100%' }}>
                          <Media heading>
                            <div style={{ position: 'relative' }}>
                              Hello {e.name}
                              <p
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  fontSize: 12,
                                }}
                              >
                                {e.creation_date}
                                <button
                                  type="button"
                                  className="btn"
                                  onClick={() => {
                                    deleteNotes(e.comment_id);
                                  }}
                                >
                                  <Icon.Trash2 style={{ width: 20 }} />{' '}
                                </button>
                              </p>
                            </div>
                          </Media>
                          {e.comments}
                        </Media>
                      </Media>
                    </Media>
                  )}
                </>
              )
            })}

        {/* { getNote &&  getNote.map((e) => {
                return  <>
                <tr>
                    <td style={tableStyle}> <p style={{marginBottom:0,fontSize:12}}>{e.name}{e.creation_date}</p> {e.comments} </td>
                    <td width="5%" style={tableStyle}> <button type="button" className="btn" onClick={() => { deleteNotes(e.comment_id) }}><Icon.Trash2/> </button> </td>
                </tr>
            </>
                })} */}
      </Row>
    </>
  );
}

export default ViewNote;
