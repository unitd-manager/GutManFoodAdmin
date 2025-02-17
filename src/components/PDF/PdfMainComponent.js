import React from 'react';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import api from '../../constants/api'
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfMainComponent = () => {
    const [hfdata, setHeaderFooterData] = React.useState()
    
  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
        setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
      const filteredResult = hfdata.find((e) => e.key_text === key);
      return filteredResult.value
  }
  const GetPdf = () => {
    const dd = {
      pageSize: 'A4',
      header: PdfHeader({findCompany}),
      pageMargins: [ 40, 150, 40,80 ],
      footer:PdfFooter,
      content: [
        {columns: [
            {
              text: 'To',
              style: 'textSize',
            },
              ],},
        {
          columns: [
            {
              text: 'A M N Construction Company Pvt, \n  57, ram nager, tirunelveli town, \n tamil nadu, \n India - 627001 \n www,amnconstructi \n oncompany.com',
              style: ['notesText', 'textSize']
            },
            {
              text: 'Date: 06-10-2022 \n QT_ME_171',
              style: ['invoiceAdd', 'textSize']
            }
          ],
        },
        '\n\n',
        {
          text: 'Att John, \n\n\n Project:- Construction work \n Dear Sir, \n\n With reference to the above captions, we would like to thank you for inviting us to quote for the above mentioned works and we are pleased to submit herewith our Value Quotation for you kind persual. \n\n',
          style: 'textSize'
      },
        {
              layout: {
                defaultBorder: false,
                hLineWidth: ()=> {
                  return 1;
                },
                vLineWidth: ()=> {
                  return 1;
                },
                hLineColor: (i)=> {
                  if (i === 1 || i === 0) {
                    return '#bfdde8';
                  }
                  return '#eaeaea';
                },
                vLineColor: ()=> {
                  return '#eaeaea';
                },
                hLineStyle: ()=> {
                  // if (i === 0 || i === node.table.body.length) {
                  return null;
                  //}
                },
                // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
                paddingLeft: ()=> {
                  return 10;
                },
                paddingRight: ()=> {
                  return 10;
                },
                paddingTop: ()=> {
                  return 2;
                },
                paddingBottom: ()=> {
                  return 2;
                },
                fillColor: ()=> {
                  return '#fff';
                },
              },
              table: {
                headerRows: 1,
                widths: ['8%','20%', '14%', '14%', '14%','14%', '14%'],
                
                body: [
                  [
                  {
                      text: 'Sn',
                      style:'tableHead',
                    },
                    {
                      text: 'Description',
                      style:'tableHead',
                    },
                    {
                      text: 'EA',
                      style:'tableHead',
                    },
                    {
                      text: 'Qty',
                      style:'tableHead',
                    },
                    {
                      text: 'U/R(S$)',
                      style:'tableHead',
                    },
                    {
                      text: 'Amt(S$)',
                      style:'tableHead',
                    },
                    {
                      text: 'Remarks',
                      style:'tableHead',
                    },
                  ],
                  
                  [
                      {
                          text: '1',
                          style:'tableBody',
                          border: [false, false, false, true],
                        },
                    {
                      text: 'Item 1',
                      border: [false, false, false, true],
                      style:'tableBody',
                    },
                    {
                      text: 'Item',
                      border: [false, false, false, true],
                      style:'tableBody',
                    },
                    {
                      text: 'Item',
                      border: [false, false, false, true],
                      style:'tableBody',
                    },
                    {
                      text: 'Item',
                      border: [false, false, false, true],
                      margin: [0, 5, 0, 5],
                      style:'tableBody',
                    },
                    {
                      text: 'Item',
                      border: [false, false, false, true],
                      style:'tableBody',
                    },
                    {
                      border: [false, false, false, true],
                      text: '$999.99',
                      fillColor: '#f5f5f5',
                      style:'tableBody',
                    },
                  ],

                  [
                      {
                          text: '2',
                          border: [false, false, false, true],
                          style:'tableBody',
                        },
                    {
                      text: 'Item 2',
                      border: [false, false, false, true],
                      style:'tableBody',
                    },
                    {
                      text: 'Item',
                      border: [false, false, false, true],
                      style:'tableBody',
                    },
                    {
                      text: 'Item',
                      border: [false, false, false, true],
                      style:'tableBody',
                    },
                    {
                      text: 'Item',
                      border: [false, false, false, true],
                      style:'tableBody',
                    },{
                      text: 'Item',
                      border: [false, false, false, true],
                      style:'tableBody',
                    },
                    {
                      text: '$999.99',
                      border: [false, false, false, true],
                      fillColor: '#f5f5f5',
                      style:'tableBody',
                    },
                  ],
                ],
              },
            },
        '\n',
        '\n\n',
      {
              text: 'TOTAL : TWENTY FIVE THOUSAND THREE HUNDRED SIXTEEN & TWENTY CENTS ONLY \n\n',
              style: 'textSize',
          },
      {
              text: 'Terms and Condition:-',
              style: 'textSize',
              margin: [0, 5, 0, 10],
            },
      {
              text: '- Payment : COD \n\n - The above quote does not cover replacement of any parts unless expressly stated above \n\n - We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.',
              style: 'textSize',
            },
      '\n\n',
      {
        width: '100%',
        alignment: 'center',
        text: 'Thank You Very Much for your Business!',
        bold: true,
        margin: [0, 10, 0, 10],
        fontSize: 12,
      },
        
      ],
      margin:[0,50,50,50],
      styles: {
        logo:{
            margin:[-20,20,0,0],
        },
        address:{
          margin:[-10,20,0,0],
        },
        invoice:{
           margin:[0,30,0,10],
           alignment:'right',
        },
        invoiceAdd:{
           alignment:'right',
        },
        textSize: {
           fontSize: 10
        },
        notesTitle: {
       bold: true,
       margin: [0, 50, 0, 3],
     },
       tableHead:{
           border: [false, true, false, true],
           fillColor: '#eaf2f5',
           margin: [0, 5, 0, 5],
           fontSize: 10,
           bold:'true',
     },
       tableBody:{
         border: [false, false, false, true],
           margin: [0, 5, 0, 5],
           alignment: 'left',
           fontSize:10
       }
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };

  return (
    <>
      <Button type="submit" className="btn btn-dark mr-2" onClick={GetPdf}>
        Print Payslip
      </Button>
    </>
  );
};

export default PdfMainComponent;
