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

const PdfPurchaseOrderPrice = () => {
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  const [purchaseDetails, setPurchaseDetails] = React.useState();
  const [product, setProduct] = React. useState();
  const [gTotal, setGtotal] = React. useState(0);

  console.log(hfdata);
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
      .post('/purchaseorder/getPurchaseOrderById', { purchase_order_id: id })
      .then((res) => {
        setPurchaseDetails(res.data.data[0]);
        
      })
      .catch(() => {
        message('PurchaseOrder Data Not Found', 'info');
      });
  };

  const getPurchaseOrderId = () => {
    api
      .post('/purchaseorder/getPurchaseOrderPriceByPdf', { purchase_order_id: id })
      .then((res) => {
        setProduct(res.data.data);
         //grand total
         let grandTotal = 0;
        //  let grand = 0;
         res.data.data.forEach((elem) => {
           grandTotal += elem.total_price;
          //  grand += elem.actual_value;
         });
         setGtotal(grandTotal);
        //  setGrTotal(grand);
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
          text: 'SN',
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
          text: 'Cost Price',
          style: 'tableHead',
        },
        {
          text: 'Total',
          style: 'tableHead',
        },
      ],

    ];
    product.forEach((element, index) => {
      
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
        },
       
        {
          text: `${element.po_QTY ? element.po_QTY : ''}`,
          border: [false, false, false, true],
          style: 'tableBody2',
        },
        {
          text: `${(element.cost_price .toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          style: 'tableBody1',
        },
        {
          border: [false, false, false, true],
          text: `${(element.total_price.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`,
          fillColor: '#f5f5f5',
          style: 'tableBody1',
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
            widths: ['101%',],

            body: [
              [
                {
                  text: `PURCHASE ORDER PRICE`,
                  alignment: 'center',
                  style: 'tableHead',
                },
              ],
            ],
          },
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
            widths: ['80%', '21%'],

            body: [
              [
                {
                  text: `Po Code :${purchaseDetails.po_code ? purchaseDetails.po_code:''}`,
                  alignment: 'left',
                  style: 'tableHead',
                },
                {
                  text: `Date :${(purchaseDetails.purchase_order_date)? moment(purchaseDetails.purchase_order_date).format('DD-MM-YYYY'):''}`,
                  alignment: 'left',
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
              text: ` To : ${purchaseDetails.supplier_name?purchaseDetails.supplier_name:''}`,
              margin: [10, 0, 0, 0],
              style: ['notesText', 'textSize'],
            },
          ],
        },
        '\n\n\n',

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
          style: 'textSize',
        },


        '\n\n',
        '\n\n',
        '\n\n',
        '\n\n',
        '\n\n',
        {
          width: '100%',
          alignment: 'center',
          text: 'PURCHASE ORDER  PRICE AMOUNT CREATED',
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
      <Button type="submit" className="btn btn-dark mr-2" onClick={GetPdf}>
        Print Purchase Order Price
      </Button>
    </>
  );
};

export default PdfPurchaseOrderPrice;
