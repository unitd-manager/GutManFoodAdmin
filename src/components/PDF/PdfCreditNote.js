import React from 'react';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types'
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfCreditNote = ({creditId}) => {
  PdfCreditNote.propTypes = {
    creditId: PropTypes.any
  }
    const [hfdata, setHeaderFooterData] = React.useState()
    const [note, setNote] = React.useState();
    const [notes, setNotes] = React.useState();
    
  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
        setHeaderFooterData(res.data.data);
    });
  }, [0]);

  const findCompany = (key) => {
      const filteredResult = hfdata.find((e) => e.key_text === key);
      return filteredResult.value
  }
  const getCreditNote = () => {
    api
      .post('/finance/getCreditNoteById', { credit_note_id :creditId  })
      .then((res) => {
        setNotes(res.data.data[0]);
      })
      .catch(() => {
        message('Finance Data Not Found', 'info');
      });
  };
  const getCreditNoteId = () => {
    api
      .post('/finance/getCreditNoteById', { credit_note_id :creditId  })
      .then((res) => {
        setNote(res.data.data);
      })
      .catch(() => {
        message('Finance Data Not Found', 'info');
      });
  };
  React.useEffect(() => {
    getCreditNoteId();
    getCreditNote();
  }, []);

  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'Sn',
          style: 'tableHead',
        },
        {
          text: 'Credit Note Code',
          style: 'tableHead',
        },
        {
          text: 'Title',
          style: 'tableHead',
        },
        {
          text: 'Amount',
          style: 'tableHead',
        },
        
      ],
    ];
    note.forEach((element, index) => {
      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
        },
        {
          text: `${element.credit_note_code? element.credit_note_code : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.item_title? element.item_title : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.amount ? element.amount : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        
      ]);
    });
    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 150, 40, 80],
      footer: PdfFooter,
     
      content: [
        {columns: [
            {
              text: 'To \n ABC New company Pte,\n 1 Coleman Street #10-05,The Adelphi \nSingapore - 6259 9911',
              style: 'textSize',
              bold:true
            },
            {
              text: `Date :${notes.from_date ? notes.from_date : ''} `,
              style: 'textSize',
              margin:[110,0,0,0],
              bold:true
            },
              ],},
              '\n',
              
           {columns: [
            {
              text:` Dear Sir,\n Title :${notes.item_title ? notes.item_title : ''} ,\n Description: ${notes.desription ? notes.desription : ''}`,
              style: 'textSize',
              bold: true
            },
            
              ],},
              '\n',
  
      
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
                widths: ['40%','20%', '30%', '20%', '20%','20%', ],
                
    
                  body: productItems,
               
                  
                },
            },
        '\n',
        '\n\n',
         '\n\n',
      {
              text: 'Terms and conditions : ',
              style: 'textSize',
              bold: true
          },
      {
              text: ' \n\n 1.The above rates are in Singapore Dollars. \n\n 2. Payment Terms 30 days from the date of Invoice \n\n  3.Payment should be made in favor of " CUBOSALE ENGINEERING PTE LTD " \n\n 4.Any discrepancies please write to us within 3 days from the date of invoice  \n\n\n 5. For Account transfer \n\n \n\n',
              style: 'textSize',
              // margin: [0, 5, 0, 10],
            },
      {
              text: 'UNITED OVERSEAS BANK \n ACCT NAME: CUBOSALE ENGINEERING PTE LTD \n ACCT NO.:- 3923023427 \n Paynow By UEN : 201222688M   \n\n',
              style: 'textSize',
              bold: true
            },
             
            
      '\n\n',
      {
                width: '100%',
                alignment: 'center',
                text: 'Thank you for your Business',
                bold: true,
                margin: [0, 0, 0, 0],
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
       <Button type="button" className="btn btn-dark mr-2" onClick={GetPdf}>
        Print CreditNote
      </Button>
    </>
  );
};


export default PdfCreditNote;
