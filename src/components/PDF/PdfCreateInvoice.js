import React from 'react';
import PropTypes from 'prop-types';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import moment from 'moment';
import * as numberToWords from 'number-to-words';
//import Converter from 'number-to-words';
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';
//import PdfHeader2 from './PdfHeader2';

const PdfCreateInvoice = ({ invoiceId, projectDetail }) => {
  PdfCreateInvoice.propTypes = {
    invoiceId: PropTypes.any,
    projectDetail: PropTypes.any,
  };
  const [hfdata, setHeaderFooterData] = React.useState();
  //const [hfdata1, setHeaderFooterData1] = React.useState();
  const [cancelInvoice, setCancelInvoice] = React.useState([]);
  const [createInvoice, setCreateInvoice] = React.useState('');
  const [gTotal, setGtotal] = React.useState(0);

  //const [gstTotal, setGstTotal] = React.useState(0);
  //const [Total, setTotal] = React.useState(0);

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
      console.log(res.data);
    });
  }, []);
 
  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };

  console.log('companyInvoice', projectDetail);
 
 

  // Gettind data from Job By Id
  const getInvoiceById = () => {
    api
      .post('/invoice/getInvoiceByInvoiceId', { invoice_id: invoiceId })
      .then((res) => {
        setCreateInvoice(res.data.data);
        console.log('CreateInvoice', res.data.data)
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };
  const calculateTotal = () => {
    const grandTotal = cancelInvoice.reduce((acc, element) => acc + element.total_cost, 0);
    const gstValue = createInvoice.gst_value || 0;
    const total = grandTotal + gstValue;
    return total;
  };
  const getAmountInWords = () => {
    const total = calculateTotal();
    // Split total amount into dollars and cents
    const dollars = Math.floor(total);
    const cents = Math.round((total - dollars) * 100); // Convert cents to whole number
  
    // Convert dollars and cents to words separately
    const dollarsInWords = numberToWords.toWords(dollars).toUpperCase();
    const centsInWords = numberToWords.toWords(cents).toUpperCase();
  
    // Format the text accordingly
    let amountInWords = `SGD ${dollarsInWords} CENTS `;
    if (cents > 0) {
      amountInWords += `${centsInWords}  ONLY`;
    }
  
    return amountInWords;
  };
  

  // const calculateTotal = () => {
  //   const grandTotal = cancelInvoice.reduce((acc, element) => acc + element.total_cost, 0);
  //   const gstValue = createInvoice.gst_value || 0;
  //   const total = grandTotal + gstValue;
  //   return total;
  // };
  // const [parsedQuoteCondition, setParsedQuoteCondition] = useState('');
  // React.useEffect(() => {
  //   // Other logic you have here...

  //   // Update this part of your code to handle HTML content stored in the quote_condition field
  //   // const parseHTMLContent = (htmlContent) => {
  //   //   if (htmlContent) {
  //   //     // Remove HTML tags using a regular expression
  //   //     const plainText = htmlContent.replace(/<[^>]*>?/gm, '');
  //   //     setParsedQuoteCondition(plainText);
  //   //   }
  //   // };
  //   // const parseHTMLContent = (htmlContent) => {
  //   //   if (htmlContent) {
  //   //     // Replace all occurrences of &nbsp; with an empty string
  //   //     const plainText = htmlContent.replace(/&nbsp;/g, '');
    
  //   //     // Remove HTML tags using a regular expression
  //   //     const plainTextWithoutTags = plainText.replace(/<[^>]*>?/gm, '');
    
  //   //     setParsedQuoteCondition(plainTextWithoutTags);
  //   //   }
  //   // };
  //   // Assuming quote.quote_condition contains your HTML content like "<p>Terms</p>"
  //   // parseHTMLContent(createInvoice.payment_terms);

  //   // Other logic you have here...
  // }, [createInvoice.payment_terms]);

  //The quote_condition content and format it as bullet points
  // const formatQuoteConditions = (conditionsText) => {
  //   const formattedConditions = conditionsText.split(':-').map((condition, index) => {
  //     const trimmedCondition = condition.trim();
  //     return index === 0 ? `${trimmedCondition}` : `:- ${trimmedCondition}`;
  //   });
  //   return formattedConditions;
  // };

  // Format the conditions content for PDF
  // const conditions = formatQuoteConditions(parsedQuoteCondition);
  // const conditionsContent = conditions.map((condition) => ({
  //   text: `${condition}`,
  //   fontSize: 10,
  //   margin: [15, 5, 0, 0],
  //   style: ['notesText', 'textSize'],
  // }));
  // / Format the conditions content for PDF
// const conditionsContent = conditions.map((condition) => ({
//   text: `${condition}`,
//   fontSize: 10,
//   margin: [15, 5, 0, 0],
//   style: ['notesText', 'textSize'],
//   lineHeight: 1.2,
// }));
  //console.log('2', gstTotal);
  const getInvoiceItemById = () => {
    api
      .post('/invoice/getInvoiceItemByInvoiceId', { invoice_id: invoiceId })
      .then((res) => {
        setCancelInvoice(res.data.data);
        let grandTotal = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.total_cost;
        });

        setGtotal(grandTotal);
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
          text: 'Sn',
          style: 'tableHead',
        },
        {
          text: 'Description',
          style: 'tableHead',
          alignment: 'center',
        },
        {
          text: 'Unit',
          style: 'tableHead',
          alignment: 'center',
        },
        {
          text: 'Quantity',
          style: 'tableHead',
          alignment: 'center',
        },
        {
          text: 'Amount(per unit)',
          style: 'tableHead',
          alignment: 'right',
        },
        {
          text: 'Total',
          style: 'tableHead',
          alignment: 'right',
        },
      ],
    ];
    cancelInvoice.forEach((element, index) => {
      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
        },
        {
          text: `${element.item_title ? element.item_title : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
          alignment: 'center',
        },
        {
          text: `${element.unit ? element.unit : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
          alignment: 'center',
        },
        {
          text: `${element.qty ? element.qty : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
          alignment: 'center',
        },
        {
          text: `${element.unit_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          style: 'tableBody1',  
          alignment: 'right',
        },
        {
          text: `${element.total_cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          style: 'tableBody1',
          alignment: 'right',
        },
      ]);
    });

    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
       pageMargins: [40, 120, 40, 10],
      //pageMargins: [40, 40, 30, 0],
      footer: PdfFooter,


      content: [
        // {
        //   columns: [
        //     {
        //       image: `${findCompany("cp.companyLogo")}`,
        //       style: 'logo', width: 80, alignment: 'left', margin: [0, -20, 0, 0]
        //     },

        //     // { text: `${findCompany("cp.companyName")}`, alignment: 'center', bold: true, fontSize: 17, color: 'Blue', margin: [0, -20, 80, 0] },
        //   ],
        // },


        // '\n\n',
        // { text: `${findCompany("cp.companyName")}`, alignment: 'center', bold: true, fontSize: 14, color: 'Blue', margin: [0, -70, 0, 0] },
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
              return null;
            },
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
                  text: `TAX INVOICE`,
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
                  text: `To `,
                  style: ['textSize'],
                  margin: [30, 0, 0, 0],
                },
                {
                  text: ` \n${createInvoice.cust_company_name ? createInvoice.cust_company_name : ''}`,
                  color: 'blue',
                  style: ['textSize'],
                  margin: [30, 3, 0, 0],
                },
                {
                  text: ` ${createInvoice.cust_address1 ? createInvoice.cust_address1 : ''
                    }\n ${createInvoice.cust_address2 ? createInvoice.cust_address2 : ''}\n${createInvoice.cust_address_country ? createInvoice.cust_address_country : ''
                    } ${createInvoice.cust_address_po_code ? createInvoice.cust_address_po_code : ''
                    }`,
                  style: ['textSize'],
                  margin: [30, 3, 0, 0],
                },
                '\n',
              ],
            },
            {
              stack: [
                {
                  text: ` Invoice No       : ${createInvoice.invoice_code ? createInvoice.invoice_code : ''
                    } `,
                  style: ['textSize'],
                  margin: [100, 2, 0, 0],
                },
                {
                  text: `Invoice Date    : ${moment(
                    createInvoice.invoice_date ? createInvoice.invoice_date : '',
                  ).format('DD-MM-YYYY')}  `,
                  style: ['textSize'],
                  margin: [100, 2, 0, 0],
                },
                // {
                //   text: `Our Ref            : ${createInvoice.project_reference ? createInvoice.project_reference : ''} `,
                //   style: ['textSize'],
                //   margin: [100, 2, 0, 0],
                // },
                {
                  text: `Revision           : ${createInvoice.revision ? createInvoice.revision : ''} `,
                  style: ['textSize'],
                  margin: [100, 2, 0, 0],
                },
                {
                  text: ` Your Po No      : ${createInvoice.po_number ? createInvoice.po_number : ''} `,
                  style: ['textSize'],
                  margin: [100, 2, 0, 0],
                },
                {
                  text: `PO Date           : ${moment(
                    createInvoice.po_date ? createInvoice.po_date : '',
                  ).format('DD-MM-YYYY')}  `,
                  style: ['textSize'],
                  margin: [100, 2, 0, 0],
                },
                '\n',
              ],
            },
          ],
        },
        '\n',

        {
          columns: [
          {
            stack: [
              {
                text: `ATTN : ${createInvoice.attention ? createInvoice.attention : ''
                  }  `,
                style: 'textSize',
                margin: [30, 0, 0, 0],
                bold: true,
              },
              '\n',
            ],
          },
          {
            stack: [
              {
                text: ` Supply To       : ${createInvoice.supply_to ? createInvoice.supply_to : ''
                  } `,
                style: ['textSize'],
                margin: [100, 2, 0, 0],
              },
              '\n',
            ],
          },
        ],
        },
        '\n\n',
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
            widths: ['50%', '51%'],

            body: [
              [
                {
                  text: 'Job Details',
                  alignment: 'center',
                  style: 'tableHead',
                },
                {
                  text: 'Payment Terms',
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
              text: `${createInvoice.title ? createInvoice.title : ''
                }`,
              alignment: 'center',
              style: ['notesText', 'textSize'],
            },
            {
              text: `${createInvoice.payment_terms ? createInvoice.payment_terms : ''
                } `,
              alignment: 'center',
              style: ['invoiceAdd', 'textSize'],
            },
          ],
        },

        '\n', '\n',
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
              return null;
            },
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
            widths: [20, 160, 38, 40, 65, 70],

            body: productItems,
          },
        },
        '\n\n',
        {
          stack: [
            {
              text: `TOTAL   : $ ${gTotal.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}`,
              alignment: 'right',
              margin: [0, 0, 5, 0],
              style: 'textSize',
            },
            '\n',
            {
              text: `GST ${createInvoice.gst_percentage ? createInvoice.gst_percentage : ''}% :     $ ${createInvoice.gst_value?.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}`,
              alignment: 'right',
              margin: [0, 0, 5, 0],
              style: 'textSize',
            },
            '\n',
            {
              text: `TOTAL AMOUNT   : $ ${calculateTotal().toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
              alignment: 'right',
              margin: [0, 0, 5, 0],
              style: 'textSize',
            },
            '\n\n\n',
            {
              text: `(${getAmountInWords()})`, // Display total amount in words
              bold: true,
              fontSize: 11,
              margin: [40, 0, 0, 0],
              alignment: 'center',
            },
          ],
        },
        '\n\n',


        // {
        //   text: `Terms and Conditions: `,
        //   fontSize: 11,
        //   decoration: 'underline',
        //   margin: [0, 5, 0, 0],
        //   style: ['notesText', 'textSize'],
        // },
        // ...conditionsContent, // Add each condition as a separate paragraph
        {
          text: [
            { text: 'For ', color: 'black' }, // "for" in black color
            { text: findCompany("cp.companyName"), color: 'orange' } // company name in orange color
          ],
          alignment: 'right', 
          bold: true, 
          fontSize: 9, 
        },
        '\n',
        {
          text: `Make all checks payable to "${findCompany("cp.companyName")}"`,
          alignment: 'left', 
          italics: true,
          bold: false, 
          fontSize: 9, 
        },
        '\n',
        {
          text: ` BANK & ACCOUNT DETAILS: ${findCompany("cp.bankAccountDetails")}`,
          alignment: 'left', 
          bold: false, 
          fontSize: 9, 
          italics: true,
        },
        '\n',
        {
          columns: [
          {
            stack: [
              {
                text: ``,
                style: 'textSize',
                margin: [30, 0, 0, 0],
               
              },
              '\n',
            ],
          },
          {
            stack: [
              {
                text: ` For and Behalf of : ${createInvoice.for_and_behalf_of ? createInvoice.for_and_behalf_of : ''
              } `,
                style: ['textSize'],
                margin: [100, 2, 0, 0],
              },
              '\n',
              {
                text: ` Date                       : ${moment(
                  createInvoice.invoice_date ? createInvoice.invoice_date : '',
                ).format('DD-MM-YYYY')}  `,
                style: ['textSize'],
                margin: [100, 0, 0, 0],
              },
            ],
          },
        ],
        },
        '\n',
        '\n',
        {
          text: `Thank you for your business `,
          alignment: 'center', 
          bold: true, 
          fontSize: 7, 
        },
        '\n',
        {
          text: `Should you have any enquiries concerning this delivery note, please contact Tel : +65-62599046`,
          alignment: 'center', 
          bold: false, 
          fontSize: 7, 
        },
      ],
      margin: [100, 2, 0, 0],

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
          alignment: 'center',
          bold: 'true',
        },
        tableBody: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'center',
          fontSize: 10,
        },
        tableBody1: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'center',
          fontSize: 10,
        },
        tableBody2: {
          border: [false, false, false, true],
          margin: [0, 5, 35, 5],
          alignment: 'right',
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
        Print Invoice
      </Button>
    </>
  );
};

export default PdfCreateInvoice;