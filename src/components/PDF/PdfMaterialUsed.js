import React from 'react';
import pdfMake from 'pdfmake';
import { useParams } from 'react-router-dom';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import { Button } from 'reactstrap';
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfMaterialUsed = () => {
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  const [materialusedportal, setMaterialusedportal] = React.useState();
  const [ addMaterialsUsed, setAddMaterialsUsed ] = React. useState();

  // console.log(hfdata);
  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
      // console.log(res.data);
    });
  }, []);
 

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };
  const getPurchaseOrderPrice = () => {
    api
      .post('/purchaseorder/getProjectMaterialUsedByPdf', { project_id: id })
      .then((res) => {
        setMaterialusedportal(res.data.data[0]);
        
      })
      .catch(() => {
        message('PurchaseOrder Data Not Found', 'info');
      });
  };


  const getMeterialUsedId = () => {
    api
      .post('/purchaseorder/getProjectMaterialUsedByPdf', { project_id: id })
      .then((res) => {
        setAddMaterialsUsed(res.data.data);
      })
      .catch(() => {
        message('PurchaseOrder Data Not Found', 'info');
      });
  };
  React.useEffect(() => {
    getMeterialUsedId();
    getPurchaseOrderPrice();
  }, []);


  const GetPdf = () => {
    const productItems = [
    [
      {
        text: 'Sn',
        style: 'tableHead',
      },
      {
        text: 'Date',
        style: 'tableHead',
      },
      {
        text: 'Description',
        style: 'tableHead',
      },
      {
        text: 'Uom',
        style: 'tableHead',
      },
      {
        text: 'Qty',
        style: 'tableHead',
      },
      {
        text: 'Remarks',
        style: 'tableHead',
      },
    ],
  ];
  addMaterialsUsed.forEach((element, index) => {
      console.log(element);
      productItems.push([
  
      {
        text: `${index + 1}`,
        style: 'tableBody',
        border: [false, false, false, true],
      },
      {
        text: `${(element.material_used_date)? moment(element.material_used_date).format('DD-MM-YYYY'):''}`,
        border: [false, false, false, true],
        style: 'tableBody',
      },
      
      {
        text: `${element.title ? element.title:''}`,
        border: [false, false, false, true],
        style: 'tableBody',
      },
      {
        text: `${element.unit ? element.unit:''}`,
        border: [false, false, false, true],
        style: 'tableBody',
      },
      {
        text: `${element.quantity?element.quantity:''}`,
        border: [false, false, false, true],
        style: 'tableBody',
      },
    
      {
        text: `${element.remark? element.remark:''}`,
        border: [false, false, false, true],
        style: 'tableBody',
      },
    ]);
  });
    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 120, 40, 80],
      footer: PdfFooter,
      content: [
        {text:`QUOTATION`,style: [ 'textSize'],alignment:'center',color:'grey', },'\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
            },
            hLineStyle: () => {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['101%'],

            body: [
              [
                {
                  text: '~MATERIALS~',
                  alignment: 'center',
                  style: 'tableHead',
                },
              ],
            ],
          },
        },
        '\n',
        {
          columns: [
            {
              stack: [
                {
                  text: `TO: ${materialusedportal.company_name ?materialusedportal.company_name:''}\n ${materialusedportal.billing_address_flat?materialusedportal.billing_address_flat:''}\n${materialusedportal.billing_address_street?materialusedportal.billing_address_street:''}\n ${materialusedportal.billing_address_po_code? materialusedportal.billing_address_po_code:''}\n ${materialusedportal.billing_address_country?materialusedportal.billing_address_country:''}  `,
                  style: ['textSize','address'],margin:[20,0,0,0]
                },
                '\n',


                { text: `ATTN :`, style: ['textSize'],margin:[20,0,0,0] },
              ],
            },
          ],
        },
        '\n',

        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
            },
            hLineStyle: () => {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: [20, 75, 75, 75, 75, 75],

            body: productItems,
          },
        },
        '\n',
        '\n\n',
        '\n\n',
        '\n\n',
        '\n\n', 
        

        {
          columns: [
            {
              text: 'Requested By :',
              alignment: 'left',
              margin: [20, 0, 0, 0],
              fontSize: 10,
              bold:true,
              style: ['invoiceAdd', 'textSize'],
            },
            {
              stack: [
                { text: `Approved By :`, fontSize: 10, style: ['textSize'],bold:true, margin: [120, 0, 0, 0] },
                '\n\n\n',
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 225, y2: 0, lineWidth: 1 }] },
                {
                  text: `Authorised Signature`,
                  fontSize: 10,
                  style: ['textSize'],
                  margin: [0, 0, 0, 0],
                },
              ],
            },
          ],
          columnGap: 60,
        },
        '\n\n\n\n\n',
      ],
      margin: [0, 50, 50, 50],

      styles: {
        logo: {
          margin: [-20, 20, 0, 0],
        },
        address: {
          margin: [-10, 20, 0, 0],
        },
        invoice: {
          margin: [0, 30, 0, 10],
          alignment: 'right',
        },
        invoiceAdd: {
          alignment: 'right',
        },
        textSize: {
          fontSize: 10,
        },
        notesTitle: {
          bold: true,
          margin: [0, 50, 0, 3],
        },
        tableHead: {
          border: [false, true, false, true],
          fillColor: '#eaf2f5',
          margin: [0, 5, 0, 5],
          fontSize: 10,
          bold: 'true',
        },
        tableBody: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };

  return (
    <>
      <Button type="submit" className="btn btn-dark mr-2" onClick={GetPdf}>
        Print Material Used
      </Button>
    </>
  );
};

export default PdfMaterialUsed;
