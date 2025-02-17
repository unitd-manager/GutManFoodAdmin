import React from 'react';
import * as Icon from 'react-feather';
import { Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PdfHeader from '../PDF/PdfHeader';
import PdfFooter from '../PDF/PdfFooter';
import api from '../../constants/api';

const ExportReport = ({ data, columns }) => {
  ExportReport.propTypes = {
    data: PropTypes.any,
    columns: PropTypes.array,
  };

  const [hfdata, setHeaderFooterData] = React.useState();

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = [];
    const selectors = [];
    columns.forEach((singleColumn) => {
      keys.push(singleColumn.name);
      selectors.push(singleColumn.selector);
    });

    console.log(keys);
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item,index) => {
      let ctr = 0;
      selectors.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += key === 's_no' ?  index + 1 : (item[key] ? item[key] : '');

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV() {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(data);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }
  //Pdf
  function buildTableBody() {
    const body = [];

    const selectors = [];
    const header = [];
    columns.forEach((singleColumn) => {
      selectors.push(singleColumn.selector);
      header.push( {
        text: singleColumn.name,
        style:'tableHead',
      })
    });
    body.push(header);

    data.forEach((row, index) => {
      const dataRow = [];

      selectors.forEach((column) => {

        dataRow.push({text:column === 's_no' ? index + 1 : (row[column] !== undefined ? row[column] : ''),style:'tableBody',});
      });

      body.push(dataRow);
    });

    return body;
  }
  const getWidthOfColumns = () => {
    const columnWidth = 100 / columns.length;
    const LEN = columns.length;
    const arry = [];
    for (let i = 0; i < LEN; i++) {
      arry.push(`${columnWidth}%`);
    }
    console.log(arry);
    return arry;
  };
  function table() {
    return {
      table: {
        headerRows: 1,
        dontBreakRows: true,
        widths: getWidthOfColumns(),
        body: buildTableBody(),
      },
      layout: 'lightHorizontalLines'
    };
  }
  const downloadPdf = () => {
    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 110, 40, 80],
      footer: PdfFooter,
      content: [
      //   { canvas: [
      //         { type: 'line', x1: 0, y1: -35, x2: 510, y2: -35, lineWidth: 1 }, //Bottom line
      //     ],
      // },
      table()],
      styles:{
        tableHead:{
          border: [false, true, false, true],
          fillColor: '#eaf2f5',
          margin: [0, 5, 0, 5],
          fontSize: 10,
          bold:'true',
    },
    tableBody:{
      border: [false, true, false, true],
      margin: [0, 5, 0, 5],
      fontSize: 10,
},
      }
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };
  return (
    <>
      <Row >
        <Col style={{display:'flex',justifyContent:'flex-end'}}>
          <Button style={{background:'green',border:'none',marginRight:'10px'}} className="shadow-none" onClick={downloadCSV}>
          <Icon.Table /> Excel
          </Button>
          <Button style={{background:'#D11606',border:'none'}} className="shadow-none" onClick={downloadPdf}>
          <Icon.File /> PDF
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ExportReport;
