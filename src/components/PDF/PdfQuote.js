import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Converter from 'number-to-words';
import * as Icon from 'react-feather';
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';


const PdfQuote = () => {
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  //const [products, setProducts] = React.useState([]);
  const [quote, setQuote] = useState(null);
  const [lineItem, setLineItem] = useState([]);
  const [gTotal, setGtotal] = React. useState(0);
  const [gstTotal, setGsttotal] = React. useState(0);
  const [Total, setTotal] = React. useState(0);
  //const [lineItem, setLineItem] = useState(null);
  

  
  
  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
      console.log(res.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;//
  };
 
  const getQuote = () => {
    api
      .post('/tender/getQuoteById', { opportunity_id: id })
      .then((res) => {
        setQuote(res.data.data[0]);
        console.log(res);
      })
      .catch(() => {
        message('Quote not found', 'info');
      });
  };
  const getQuoteById = () => {
    api
      .post('/tender/getQuoteLineItemsById', { quote_id: id})
      .then((res) => {
        setLineItem(res.data.data);
        let grandTotal = 0;
          let grand = 0;
         let gst = 0;
         res.data.data.forEach((elem) => {
           grandTotal += elem.amount;
          //  grand += elem.actual_value;
        });
        setGtotal(grandTotal);
        gst=grandTotal*0.07
        setGsttotal(gst);
        grand=grandTotal+gst
        setTotal(grand);
        //setViewLineModal(true);
      })
      .catch(() => {
        message('Quote not found', 'info');
      });
  };
  React.useEffect(() => {
    getQuote();
    getQuoteById();
  }, []);

  const GetPdf = () => {
   const lineItemBody =  [
    [
    {
        text: 'SN',
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
        text: 'U/R(S$) ',
        style:'tableHead',
      },
      {
        text:  'Amt S$',
        style:'tableHead',
      },
      {
        text:  'Remarks',
        style:'tableHead',
      },
    ]
  ]
  lineItem.forEach(element => {
    lineItemBody.push(  [
      {
          text: '1',
          style:'tableBody',
          border: [false, false, false, true],
        },
    {
      text: `${element.title}`,
      border: [false, false, false, true],
      style:'tableBody',
    },
    {
      text: `${element.unit}`,
      border: [false, false, false, true],
      style:'tableBody',
    },
    {
      text: `${element.quantity}`,
      border: [false, false, false, true],
      style:'tableBody',
    },
    {
      text: `${(element.unit_price .toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`,
      border: [false, false, false, true],
      margin: [0, 5, 0, 5],
      style:'tableBody',
    },
    {
      text: `${(element.amount .toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`,
      border: [false, false, false, true],
      style:'tableBody',
    },
    {
      border: [false, false, false, true],
      text: `${element.remarks}`,
      fillColor: '#f5f5f5',
      style:'tableBody',
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
            widths: ['105%','51%'],
            
            body: [
              [
              {
                  text: 'QUOTATION',
                   alignment: 'center',
                  style:'tableHead',
                },
               
              
              ],
              
            

             
            ],
          },
        },'\n',
    {columns: [
         {text:`TO:${quote.company_name ?quote.company_name:''}`, style: ['notesText', 'textSize']},
  
       {text:`Date :${quote.quote_date ?quote.quote_date:''}\n  Quote Code : ${quote.quote_code ?quote.quote_code:''}\n \n  `,style: ['invoiceAdd', 'textSize']  },
  
         ],},
          '\n',
          {text:`Att :${quote.first_name ?quote.first_name:''}`,style: ['notesText', 'textSize']},
          
          '\n',
          
       {
           text:`Project:- ${quote.title ?quote.title:''}
           Dear Sir,

           With reference to the above captions, we would like to thank you for inviting us to quote for the above mentioned works and we are pleased to submit herewith our Value Quotation for you kind persual.`,
          
          style: ['notesText', 'textSize']
        },
        '\n',
         '\n',
         
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
        widths: ['8%','15%', '14%', '14%', '17%','18%', '14%'],
        
        body:lineItemBody
      },
    },
'\n',
{   stack:[
  {text:`SubTotal $ :    ${(gTotal.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, style: [ 'textSize'], margin :[300,0,0,0] },
   '\n',
    {text:`GST:       ${(gstTotal.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, style: [ 'textSize'], margin :[330,0,0,0]  },
   '\n',
    {text:`Total $ :     ${(Total.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, style: [ 'textSize'], margin :[320,0,0,0] },
    '\n\n\n',
    {text:`TOTAL : ${Converter.toWords(Total)}`,style:'bold', margin:[40,0,0,0]}
    ]},
'\n\n',
 '\n',

       
{columns: [
{
   text:`Terms and Condition:- \n
:- Payment : COD \n
:- The above quote does not cover replacement of any parts unless expressly stated above. \n
:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule`,
  
  style: ['notesText', 'textSize']
}, 

],},


'\n',
 '\n',     
    
        
        {
          width: '100%',
          alignment: 'center',
          text: 'Thank you very much for your business',
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 12,
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
        textSize1: {
          fontSize: 10,
          alignment:'right',
          margin:[0,0,200,0]
       },
       textSize2: {
          fontSize: 15,
          bold:'true',
          alignment:'left',
          margin:[100,0,0,0]
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
       <span onClick={GetPdf}><Icon.Printer/></span>
    </>
  );
};

export default PdfQuote;
