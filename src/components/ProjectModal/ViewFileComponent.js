import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import message from '../Message';
import api from '../../constants/api';

function ViewFileComponent({ opportunityId }) {
  ViewFileComponent.propTypes = {
    opportunityId: PropTypes.string,
  };

  const [getFile, setGetFile] = useState(null);

  const getFiles = () => {
    api.post('/file/getFileList', { record_id: opportunityId }).then((res) => {
      setGetFile(res.data.data);
    });
  };

  const deleteFile = (fileId) => {
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
          .post('/file/deleteFile', { media_id: fileId })
          .then((res) => {
            console.log(res);
            Swal.fire('Deleted!', 'Media has been deleted.', 'success');
            //setViewLineModal(false)

            window.location.reload();
          })
          .catch(() => {
            message('Unable to Delete Media', 'info');
          });
      }
    });
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <>
      <table>
        <tbody>
          {getFile ? (
            getFile.map((res) => {
              return (
                  <tr key={res.media_id}>
                    <th>
                      <p>
                        <a
                          href={`http://43.228.126.245/smartco-api/storage/uploads/${res.file_name}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {res.file_name}
                        </a>{' '}
                      </p>
                    </th>
                    <th width="5%"></th>
                    <th>
                      {' '}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          deleteFile(res.media_id);
                        }}
                      >
                        {' '}
                        X{' '}
                      </button>
                    </th>
                  </tr>
              );
            })
          ) : (
            <tr><td>no files uploaded yet</td></tr> 
          )}
        </tbody>
      </table>
    </>
  );
}

export default ViewFileComponent;
