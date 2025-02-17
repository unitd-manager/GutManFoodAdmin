import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import api from '../constants/api';
import message from './Message';

const DeleteButton = ({
  id,
  columnname,
  tablename,
  ifpiture = false,
  ifAttachment = false,
  pictureroom,
  attachmentroom,
}) => {
  const navigate = useNavigate();
  DeleteButton.propTypes = {
    id: PropTypes.string,
    columnname: PropTypes.string,
    tablename: PropTypes.string,
    ifpiture: PropTypes.bool,
    ifAttachment: PropTypes.bool,
    pictureroom: PropTypes.string,
    attachmentroom: PropTypes.string,
    //onSuccess:PropTypes.any
  };
  const deletePicture = (formalId, roomName) => {
    api
      .post('/file/deleteFileByRoomNameAndId', {
        room_name: roomName,
        record_id: formalId,
      })
      .then((res) => {
        if (res.status === 200) {
         
            message('Media and Records files deleted.', 'error');
            navigate(-1);
          
        } else {
          message('Unable to delete record.', 'error');
        }
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  const deleteApi = () => {
    api
      .post('/commonApi/deleteRecord', {
        idvalue: id,
        columnname,
        tablename,
      })
      .then((res) => {
        if (res.status === 200) {
          if (ifpiture) {
            deletePicture(id, pictureroom);
          } else {
            /* eslint-disable */
            if (ifAttachment) {
              deletePicture(id, attachmentroom);
            } else {
              message('Record deleted successfully.');
              navigate(-1);
            }
          }
        } else {
          message('Unable to delete record.', 'error');
        }
      })
      .catch(() => {
        message('Network connection error.');
      });
  };

  const deleteRecord = () => {
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
        deleteApi();
      }
    });
  };

  return (
    <Button
      color="danger"
      onClick={() => {
        deleteRecord();
      }}
    >
      Delete <Icon.Trash2 size={20} />
    </Button>
  );
};

export default DeleteButton;
