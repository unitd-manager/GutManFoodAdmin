import React from 'react';
import pdfMake from 'pdfmake';
import * as Icon from 'react-feather';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';


const PdfDeliveryOrderPO = ({deliveryOrderId,date}) => {
  PdfDeliveryOrderPO.propTypes = {
    deliveryOrderId: PropTypes.any,
    date:PropTypes.any,
    
    
  }
    const [hfdata, setHeaderFooterData] = React.useState()
    
    const [deliverOrderProducts, setDeliveryOrderProducts] = React.useState();
    
  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
        setHeaderFooterData(res.data.data);
    });
  }, [0]);

  const findCompany = (key) => {
      const filteredResult = hfdata.find((e) => e.key_text === key);
      return filteredResult.value
  }
  
  

  const getDeliveryOrderId=()=>{
    api.post('purchaseorder/getDeliveryOrderHistory',{delivery_order_id:deliveryOrderId})
    .then((res)=>{
      setDeliveryOrderProducts(res.data.data);
    }).catch(()=>{
      message('delivery data are not found','error');
    })
  }
  
  React.useEffect(() => {
    getDeliveryOrderId();
    
  }, []);

  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'Sn',
          style: 'tableHead',
        },
        {
          text: 'Product Name',
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
    deliverOrderProducts.forEach((element, index) => {
      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
        },
        {
          text: `${element.item_title? element.item_title : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.quantity? element.quantity : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.remarks ? element.remarks : ''}`,
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
                  text: 'DELIVERY ORDER',
                  alignment: 'center',
                  style: 'tableHead',
                },
              ],
            ],
          },
        },
        '\n\n',
        {columns: [
           
            {
              text: `Date :${date ? moment(date).format('DD-MM-YYYY') : ''} `,
              style: 'textSize',
              margin:[0,0,65,0],
              bold:true
            },
              ],},
              '\n',
          
              '\n',
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
                  widths: ['10%', '41%', '20%', '30%'],
      
                  body: productItems,
                },
              },
              '\n\n\n\n\n',
              '\n\n\n\n\n',
      
              {
                columns: [
                  {
                    stack: [
                      {
                        text: 'Your Faithfully :',
                        alignment: 'left',
                        bold:true,
                        fontSize: 10,
                        style: ['invoiceAdd', 'textSize1'],
                      },
                      '\n\n\n',
                      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 190, y2: 0, lineWidth: 1 }] },
                      {
                        text: `Authorised Signature/Date`,
                        fontSize: 10,
                        style: ['textSize1'],
                        margin: [0, 0, 0, 0],
                      },
                    ],
                  },
                  {
                    stack: [
                      '\n\n\n\n',
                      {
                        canvas: [
                          {
                            type: 'line',
                            margin: [0, 0, 0, 0],
                            x1: 0,
                            y1: 0,
                            x2:200,
                            y2: 0,
                            lineWidth: 1,
                          },
                        ],
                      },
                      {
                        text: `Accepted By/date`,
                        fontSize: 10,
                        style: ['textSize1'],
                        margin: [0, 0, 0, 0],
                      },
                    ],
                  },
                ],
              },
              '\n\n\n\n\n',
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
           fontSize: 10,
           alignment:'right',
        },
        textSize1: {
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
       
       <span onClick={GetPdf}><Icon.Printer/></span>
      
    </>
  );
};


export default PdfDeliveryOrderPO;
