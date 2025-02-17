import React from 'react';
import pdfMake from 'pdfmake';
import {  useParams } from 'react-router-dom';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import { Button } from 'reactstrap';
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfMaterialPurchaseOrder = () => {
  const {id} = useParams()
    const [hfdata, setHeaderFooterData] = React.useState()
    const [addPurchaseOrderModal, setAddPurchaseOrderModal] = React.useState();
  const [ tabPurchaseOrderLineItemTable, setTabPurchaseOrderLineItemTable ] = React. useState();
  const [gTotal, setGtotal] = React. useState(0);
  const [gstTotal, setGsttotal] = React. useState(0);
  const [Total, setTotal] = React. useState(0);
    
    // console.log(hfdata)
  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
        setHeaderFooterData(res.data.data);
        // console.log(res.data)
    });
  }, []);
  const findCompany = (key) =>{
   
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value
   
}
  const getPoProduct = () => {
    api
      .post('/purchaseorder/getProjectMaterialPurchaseByPdf', { project_id: id })
      .then((res) => {
        setAddPurchaseOrderModal(res.data.data[0]);
        
      })
      .catch(() => {
        message('PurchaseOrder Data Not Found', 'info');
      });
  };
  const getPurchaseOrderId = () => {
    api
      .post('/purchaseorder/getProjectMaterialPurchaseByPdf', { project_id: id })
      .then((res) => {
        setTabPurchaseOrderLineItemTable(res.data.data);
         //grand total
         let grandTotal = 0;
          let grand = 0;
         let gst = 0;
         res.data.data.forEach((elem) => {
           grandTotal += elem.total_price;
          //  grand += elem.actual_value;
         });
         setGtotal(grandTotal);
         gst=grandTotal*0.07
         setGsttotal(gst);
         grand=grandTotal+gst
         setTotal(grand);
      })
      .catch(() => {
        message('PurchaseOrder Data Not Found', 'info');
      });
  };
  React.useEffect(() => {
    getPurchaseOrderId();
    getPoProduct();
  }, []);
 
  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'S.NO',
          style: 'tableHead',
        },
        {
          text: 'Product Name',
          style: 'tableHead',
        },
        {
          text: 'Uom',
          style: 'tableHead',
        },
        {
          text: 'Quantity',
          style: 'tableHead',
        },
        {
          text: 'Unit Price S$ ',
          style: 'tableHead',
        },
        {
          text: 'Amount S$',
          style: 'tableHead',
        },
      ],
    ];
    tabPurchaseOrderLineItemTable.forEach((element, index) => {
      // console.log(element);
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
          text: `${element.unit? element.unit : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.qty ? element.qty : ''}`,
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
      header: PdfHeader({findCompany}),
      pageMargins: [ 40, 150, 40,80 ],
      footer:PdfFooter,
      content: [
        {
          columns: [
             {   stack:[
    {text:`From:`, style: [ 'textSize'] },
     '\n',

  
    {text:`10 Jalan Besar, #15-02 Sim Lim Tower, \n  Singapore - 208787, \n Email:arif@usoftsolutions.com`, style: [ 'textSize'] },
      ]},
           {   stack:[
  
    {text:` Po Number :${addPurchaseOrderModal.po_code?addPurchaseOrderModal.po_code:''} `,style: [ 'textSize'],margin:[120,0,0,0]  },
    {text:` Po Date : ${(addPurchaseOrderModal.purchase_order_date)? moment(addPurchaseOrderModal.purchase_order_date).format('DD-MM-YYYY'):''} `,style: [ 'textSize'],margin:[135,0,0,0]  },
    {text:` Your Ref :${addPurchaseOrderModal.supplier_reference_no?addPurchaseOrderModal.supplier_reference_no:''} `,style: [ 'textSize'],margin:[132,0,0,0]  },
    {text:` Our Ref : ${addPurchaseOrderModal.our_reference_no?addPurchaseOrderModal.our_reference_no:''}`,style: [ 'textSize'],margin:[137,0,0,0]  },
    {text:` Site Address :`,style: [ 'textSize'],margin:[120,0,0,0]  },
    
      ]}
            
            
          ],
          
        },
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
                widths: ['50%','51%'],
                
                body: [
                  [
                  {
                      text: 'Vendor Name',
                       alignment: 'center',
                      style:'tableHead',
                    },
                    {
                      text: 'Ship To Address',
                       alignment: 'center',
                      style:'tableHead',
                    },
                  
                  ],
                   ],
              },
            },'\n',
       {
          columns: [
             {   stack:[
    {text:`TO: ${addPurchaseOrderModal.supplier_name?addPurchaseOrderModal.supplier_name:''}\n `,
         style: ['address', 'textSize'],margin:[20,0,0,0] },
     '\n',
      

  
    {text:`Contact Name :${addPurchaseOrderModal.first_name?addPurchaseOrderModal.first_name:''}`, style: [ 'textSize'],margin:[20,0,0,0] },
      ]},
            {
              text: `${addPurchaseOrderModal.company_name?addPurchaseOrderModal.company_name:''}\n ${addPurchaseOrderModal.address_flat?addPurchaseOrderModal.address_flat:''} ${addPurchaseOrderModal.address_state?addPurchaseOrderModal.address_state:''}\n ${addPurchaseOrderModal.address_street?addPurchaseOrderModal.address_street:''}\n ${addPurchaseOrderModal.address_country?addPurchaseOrderModal.address_country:''}\n ${addPurchaseOrderModal.address_po_code?addPurchaseOrderModal.address_po_code:''}`,
              alignment: 'left',
              style: ['address', 'textSize'],margin:[75,0,75,0]
            }
          ],
        },
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
                widths: ['50%','51%'],
                
                body: [
                  [
                  {
                      text: 'Payment Terms',
                       alignment: 'center',
                      style:'tableHead',
                    },
                    {
                      text: 'Required By Date',
                       alignment: 'center',
                      style:'tableHead',
                    },
                  
                  ],
                   [
                      {
                          text: `${addPurchaseOrderModal.payment_terms?addPurchaseOrderModal.payment_terms:''}`,
                          alignment: 'center',
                          style:'tableBody',
                          border: [false, false, false, true],
                        },
                    {
                      text:  `${(addPurchaseOrderModal.creation_date)? moment(addPurchaseOrderModal.creation_date).format('DD-MM-YYYY'):''}`,
                      alignment: 'center',
                      border: [false, false, false, true],
                      style:'tableBody',
                    },
                  ]
                  
                  ],
              },
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
                widths: ['8%','31%', '14%', '14%', '20%','20%', '14%'],
                
            body: productItems,
              },
            },
        '\n',
        '\n',
        
     {
          columns: [
              {
              text: `Approved By :${addPurchaseOrderModal.po_code}`,
              alignment: 'left',
              style: ['invoiceAdd', 'textSize']
            },
             {   stack:[
    {text:`SubTotal $ :    ${(gTotal.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, style: [ 'textSize'], margin :[130,0,0,0] },
     '\n',
    {text:`Freight :            ${addPurchaseOrderModal.po_code}`, style: [ 'textSize'], margin :[145,0,0,0]  },
    '\n',
     {text:`GST:       ${(gstTotal.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, style: [ 'textSize'], margin :[160,0,0,0]  },
     '\n',
      {text:`Total $ :     ${(Total.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, style: [ 'textSize'], margin :[145,0,0,0] },
     
      ]},
      
            
          ],
        },
        '\n',
    
        
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
}

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };

  return (
    <>
      <Button type="submit" className="btn btn-dark mr-2" onClick={GetPdf}>
        Print Purchase Order
      </Button>
    </>
  );
};

export default PdfMaterialPurchaseOrder;
