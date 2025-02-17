import React from 'react';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';


const PdfProjectClaim = () => {
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  const [checkId, setCheckId] = React. useState(0);
  const [ POId, setPOId ]=  React. useState(0);
  const [gTotal, setGtotal] = React. useState(0);
  const [grandPrev, setGrandPrev] = React. useState(0);
  const [grandThis, setGrandThis] = React. useState(0);
  const [grandCum, setGrandCum] = React. useState(0);

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };
  // Gettind data from Job By Id
  const getInvoiceById = () => {
    api
      .post('/project/getClaimPaymentBYId', { project_id: id,claim_payment_id:id })
      .then((res) => {
        setCheckId(res.data.data[0]);
     //grand total
     let prevTotal = 0;
     let thisTotal = 0;
     res.data.data.forEach((elem) => {
      prevTotal += elem.amount;
      thisTotal += elem.cum_amount;
     });
     setGrandThis(prevTotal);
     setGrandCum(thisTotal);
        })
        .catch(() => {
          message('Invoice Data Not Found', 'info');
        });
    };
  const getInvoiceItemById = () => {
    api
      .post('/project/getClaimPaymentBYId',{project_id: id,claim_payment_id:id })
      .then((res) => {
        setPOId(res.data.data);
    //grand total
    let grandTotal = 0;
   let prev = 0;
   res.data.data.forEach((elem) => {
     grandTotal += elem.contractAmount;
     prev += elem.prev_amount;
    //  grand += elem.actual_value;
   });
   setGtotal(grandTotal);
   setGrandPrev(prev);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };
  React.useEffect(() => {
    getInvoiceItemById();
    getInvoiceById();
  }, []);

  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'Item',
          style: 'tableHead',
        },
        {
          text: 'Description of work',
          style: 'tableHead',
        },
        {
          text: 'Contract Amount',
          style: 'tableHead',
        },
        {
          text: 'Previous Claim Amount',
          style: 'tableHead',
        },
        {
          text: 'This Month Amount',
          style: 'tableHead',
        },
        {
          text: 'Cumulative Claim',
          style: 'tableHead',
        },
        {
          text: 'Remarks',
          style: 'tableHead',
        },
        
      ],
    ];
    POId.forEach((element, index) => {
      console.log(element);
      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
        },
        {
          text: `${element.title? element.title : ''}\n${element.description? element.description : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
      
        },
              
        {
          text: `${element.contractAmount? element.contractAmount : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.prev_amount ? element.prev_amount : ''}`,
          border: [false, false, false, true],
          style: 'tableBody2',
        },
        {
          text: `${element.amount ? element.amount : ''}`,
          border: [false, false, false, true],
          style: 'tableBody2',
        },
        {
          text: `${element.cum_amount ? element.cum_amount : ''}`,
          border: [false, false, false, true],
          style: 'tableBody2',
        },
        {
          text: `${element.remarks ? element.remarks : ''}`,
          border: [false, false, false, true],
          style: 'tableBody2',
        },
       
      ]);
    });

    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 150, 40, 80],
      footer: PdfFooter,
      content: [
       
        {
          columns: [
            {
              stack: [
                {
                  text: `PROJECT :${
                    checkId.claim_seq
                      ? checkId.claim_seq
                      : ''
                  }`,
                  style: ['textSize'],
                  margin: [0, 0, 0, 0],
                },
                '\n',

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
            widths: [30, 100,'*' , '*', 40, 60,40],

            body: productItems,
          },
        },
        '\n\n',
        {
          columns: [    
    {text:'Total',margin :[70,0,0,0]},
    {text:` ${(gTotal.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, style: [ 'textSize'], margin :[45,0,0,0] },
     {text:` ${(grandPrev.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, style: [ 'textSize'], margin :[35,0,0,0]  },
     {text:` ${(grandThis.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, style: [ 'textSize'],  margin :[-5,0,0,0]   },
      {text:` ${(grandCum.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, style: [ 'textSize'], margin :[-74,0,0,0] },  
          ],
        },
        '\n',
    
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
      <Button type="button" className="btn btn-dark mr-2" onClick={GetPdf}>
        Print PC
      </Button>
    </>
  );
};

export default PdfProjectClaim;
