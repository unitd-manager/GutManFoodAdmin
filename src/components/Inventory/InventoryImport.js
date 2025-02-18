import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import message from '../Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../views/form-editor/editor.scss';

// import api from '../../constants/api';

const InventoryImport = ({importModal, setImportModal }) => {
  InventoryImport.propTypes = {
    importModal: PropTypes.bool,
    setImportModal: PropTypes.func,
  };

  const [selectedFile, setSelectedFile] = useState({
    project_planning_id:'',
    planning_cpanel_id:'',
    item_number: '', 
    product_name:'',
    bom_unit:'',
    qty:''
  });
  
  const handleFileChange = (e) => {
   
    const file = e.target.files[0];
    if (!file) return; // No file selected
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Assuming there is only one sheet in the Excel file
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      // Convert the sheet data to an array of objects
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
      // Assuming the first row contains headers, skip it
      const headers = jsonData[0];
      const rows = jsonData.slice(1);
  
      // Map each row to an object using headers
      const mappedData = rows.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
  
      setSelectedFile(mappedData);
    };
  
    reader.readAsArrayBuffer(file);
  };
  
  console.log('exel',selectedFile)
  const handleFileUpload = async () => {
    try {
      if (!selectedFile || selectedFile.length === 0) {
        // Handle no file selected
        console.error('No file selected.');
        return;
      }
  
      const formData = new FormData();

    // Convert the selectedFile to JSON string
    const jsonData = JSON.stringify(selectedFile);
const arr=JSON.parse(jsonData);

    // Append the JSON data to the FormData object
    formData.append('json', jsonData);

    console.log('eeee',formData)
    console.log('arr',arr)
    arr.forEach(async(element) => { 
      console.log('elem',element)

      const response = await axios.post('http://43.228.126.245:5001/planning/insertPlanningBom', element, {
        headers: {
          item_number: 1, 
          product_name:2,
          bom_unit:3,
          qty:4// Set the content type to 'multipart/form-data'
        },
      });
  
      if (response.status === 200) {
        message('File uploaded and data inserted successfully.');
        // You may want to add code to handle success here
      } else {
        message('File upload and data insertion failed.');
        // You may want to add code to handle failure here
      }
    });
     
    } catch (error) {
      message('Error uploading file and inserting data:', error);
      // You may want to add code to handle the error here
    }
  };

  return (
    <>
      <Modal size="lg" isOpen={importModal}>
        <ModalHeader>
          CpanelDetails
          <Button
            color="secondary"
            onClick={() => {
              setImportModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="3" className="mb-4 d-flex justify-content-between"></Col>
          </Row>
          <Row>
                           <Col md="4">
                              <FormGroup>
                                <Label>FG Code</Label>
                                <Input
                        type="file"
                        name="file"
                        accept=".xlsx, .xls" // Specify allowed file types
                        onChange={handleFileChange}
                      />
                              </FormGroup>
                            </Col>
                            </Row>
        </ModalBody>

        <ModalFooter>
        
              <Button
                color="primary"
                onClick={() => {
                  handleFileUpload();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setImportModal(false);
                }}
              >
                Cancel
              </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default InventoryImport;
