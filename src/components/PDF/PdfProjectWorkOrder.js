import React from 'react';
import pdfMake from 'pdfmake';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types'
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';


const PdfProjectWorkOrder = ({subConWorkOrderId}) => {
  PdfProjectWorkOrder.propTypes = {
   
    subConWorkOrderId: PropTypes.any
  }

  const [hfdata, setHeaderFooterData] = React.useState();
  const [subConWorkOrdeData, setSubConWorkOrdeData ] = React. useState();
  const [workOrderViewLineItem, setWorkOrderViewLineItem] =React. useState();
   const [gTotal, setGtotal] = React. useState(0);

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

 const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };
  const getPurchaseOrderPrice = () => {
    api
      .post('/purchaseorder/getPurchaseWorkOrderByPdf', { sub_con_work_order_id: subConWorkOrderId })
      .then((res) => {
        setSubConWorkOrdeData(res.data.data[0]);
        
      })
      .catch(() => {
        message('PurchaseOrder Data Not Found', 'info');
      });
  };

  const getPurchaseOrderId = () => {
    api
      .post('/purchaseorder/getPurchaseWorkOrderByPdf', { sub_con_work_order_id: subConWorkOrderId })
      .then((res) => {
        setWorkOrderViewLineItem(res.data.data);
        //  //grand total
         let grandTotal = 0;
        // //  let grand = 0;
         res.data.data.forEach((elem) => {
            grandTotal += elem.amount;
        //   //  grand += elem.actual_value;
          });
          setGtotal(grandTotal);
        // //  setGrTotal(grand);
      })
      .catch(() => {
        message('PurchaseOrder Data Not Found', 'info');
      });
  };

  React.useEffect(() => {
    getPurchaseOrderPrice();
    getPurchaseOrderId();
  }, []);


  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'S.N',
          style: 'tableHead',
        },
        {
          text: 'DESCRIPTION ',
          style: 'tableHead',
        },
        {
          text: 'QUANTITY',
          style: 'tableHead',
        },
        {
          text: 'UNIT RATE($)',
          style: 'tableHead',
        },
        {
          text: 'AMOUNT($)',
          style: 'tableHead',
        },
      ],

    ];
    workOrderViewLineItem.forEach((element, index) => {
      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
        },
        {
          text: `${element.description ? element.description : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
       
        {
          text: `${element.quantity ? element.quantity : ''}`,
          border: [false, false, false, true],
          style: 'tableBody2',
        },
        {
          text: `${(element.unit_rate.toLocaleString('en-IN', {  minimumFractionDigits: 2 })) }`,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          style: 'tableBody1',
        },
        {
          border: [false, false, false, true],
          text: `${(element.amount.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`,
          fillColor: '#f5f5f5',
          style: 'tableBody1',
        },
      ]);
    });

    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 120, 40, 80],
      footer: PdfFooter,
      content: [
    
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
            widths: ['101%',],

            body: [
              [
                {
                  text: `Work Order`,
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
                {text:` Co Name :   ${subConWorkOrdeData.company_name?subConWorkOrdeData.company_name:''} `,style: [ 'textSize'], },
                {text:` Address   :   ${subConWorkOrdeData.address_flat?subConWorkOrdeData.address_flat:''} `,style: [ 'textSize'],   },
                {text:` Email        :   ${subConWorkOrdeData.email?subConWorkOrdeData.email:''} `,style: [ 'textSize'],  },
                {text:` Tel.            :   ${subConWorkOrdeData.mobile?subConWorkOrdeData.mobile:''}`,style: [ 'textSize'],  },
              ],
            },
            {
              stack: [
                {text:` Date                   :  ${(subConWorkOrdeData.work_order_date)? moment(subConWorkOrdeData.work_order_date).format('DD-MM-YYYY'):''} `,style: [ 'textSize'],margin:[51,0,0,0]  },
                {text:` WO No               :  ${subConWorkOrdeData.sub_con_worker_code?subConWorkOrdeData.sub_con_worker_code:''} `,style: [ 'textSize'],margin:[51,0,0,0]   },
                {text:` Quotation Ref   :  ${subConWorkOrdeData.quote_reference?subConWorkOrdeData.quote_reference:''} `,style: [ 'textSize'], margin:[51,0,0,0]  },
                {text:`Quotation Date :  ${(subConWorkOrdeData.quote_date)? moment(subConWorkOrdeData.quote_date).format('DD-MM-YYYY'):''}`,style: [ 'textSize'],margin:[50,0,0,0]   },
              
              ],
            },
          ],
        },
        '\n',
        {
          stack: [
            {text:`Project Location    : ${subConWorkOrdeData.project_location?subConWorkOrdeData.project_location:''} `,style: [ 'textSize'], },
            {text:`Project Reference : ${subConWorkOrdeData.project_reference?subConWorkOrdeData.project_reference:''} `,style: [ 'textSize'],  },
    
          ],
        },'\n',
     
      

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
            widths: [22, 160, 60, 85, 85],

            body: productItems,
          },
        },
        '\n',
        '\n',
      
        {
          text: `TOTAL AMOUNT : ${(gTotal.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))} `,
          alignment: 'right',
          margin: [0, 0, 8, 0],
          bold: true,
          fontSize: 10,
        }, '\n\n',

        {
          width: '100%',
          alignment: 'left',
          text: 'Terms And Conditions',
          color:'grey',
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 10,
        },
        {
          width: '100%',
          alignment: 'left',
          text: '1. All works must be carried out under your supervisor staff & site staff instruction.',
          fontSize: 8,
        },
        {
          width: '100%',
          alignment: 'left',
          text: '2. All foreign workers must posses valid work permit and SOC in accfordance to Employ of foreign Workers Act. All fines, losses and expenses in',
          fontSize: 8,
        },
        {
          width: '100%',
          alignment: 'left',
          text: 'connection shall be deduted from progress payments accordingly.',
          fontSize: 8,
        },
        {
          width: '100%',
          alignment: 'left',
          text: '3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any',
          fontSize: 8,
        },
        {
          width: '100%',
          alignment: 'left',
          text: 'monetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any',
          fontSize: 8,
        },
        {
          width: '100%',
          alignment: 'left',
          text: 'monies due or which may become due under this work order.',
          fontSize: 8,
        },
        '\n\n\n',
        
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 520, y2: 0, lineWidth: 1 }] },
        {
          columns: [
            {
              text: 'for Viresco Singapore Pte Ltd ',
              alignment: 'left',
              bold: true,
              fontSize: 10,
              style: ['invoiceAdd', 'textSize'],
            },
            {
              stack: [
                { text: `I hereby confirm my acceptance of this Work`, fontSize: 10, style: ['textSize'], bold: true,},
                {
                  text: `Order and shall comply fully to the above terms`,
                  fontSize: 10,
                  style: ['textSize'],bold: true,
                },
                {
                  text: `and conditions.`,
                  fontSize: 10,
                  bold: true,
                  style: ['textSize'],
                },
              ],
            },
          ],
          columnGap: 60,
        },
        '\n\n',
        '\n\n',
        '\n\n',
        {
          columns: [
            {
              stack: [
          
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 230, y2: 0, lineWidth: 1 }] },
                {
                  text: `(Name / Designation / Signature) `,
                  fontSize: 10,
                  style: ['textSize'],
                  margin: [0, 0, 0, 0],
                },
              ],
            },
            {
              stack: [
          
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 230, y2: 0, lineWidth: 1 }] },
                {
                  text: `(Name /Signature/ Company Stamp/ Date)`,
                  fontSize: 10,
                  style: ['textSize'],
                  margin: [0, 0, 0, 0],
                },
              ],
            },
          ],
          columnGap: 60,
        },
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
          alignment: 'center',
          fontSize: 10,
          bold: 'true',
        },
        tableBody: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
          fontSize: 10,
        },
        tableBody1: {
          border: [false, false, false, true],
          margin: [10, 5, 0, 5],
          alignment: 'right',
          fontSize: 10,
        },
        tableBody2: {
          border: [false, false, false, true],
          margin: [15, 5, 0, 5],
          alignment: 'center',
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
     <span onClick={GetPdf}><Icon.Printer/></span>
    </>
    
  );
};

export default PdfProjectWorkOrder;
