import React from 'react';
import { useParams } from 'react-router-dom';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';


const PdfPcSummary = () => {
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  const [deliveryData, setDeliveryData] = React.useState();
  const [editPo, setEditPo] = React.useState();
  const [projectDetail, setProjectDetail] = React.useState();
  const [gTotal, setGtotal] = React. useState(0);
  const [gstTotal, setGsttotal] = React. useState(0);
  const [Total, setTotal] = React. useState(0);

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
  const getClaim = () => {
    api
      .post('/project/getProjectClaimSummaryById', { project_id: id })
      .then((res) => {
        setDeliveryData(res.data.data[0]);
        
      })
      .catch(() => {
        message('Project Data Not Found', 'info');
      });
  };
  const getPC = () => {
    api
      .post('/project/getProjectPaymentSummaryById', { project_id: id })
      .then((res) => {
        setEditPo(res.data.data[0]);
        let grandTotal = 0;
        let grand = 0;
       let gst = 0;
       res.data.data.forEach((elem) => {
         grandTotal = elem.amount;
        //  grand += elem.actual_value;
       });
       setGtotal(grandTotal);
       gst=grandTotal*0.07
       setGsttotal(gst);
       grand=grandTotal+gst
       setTotal(grand);
          })
          .catch(() => {
            message('Claim Data Not Found', 'info');
          });
      };

  const getPCs = () => {
    api
      .post('/project/getProjectPaymentSummaryById', { project_id: id })
      .then((res) => {
        setProjectDetail(res.data.data);
          })
      .catch(() => {
        message('Project Data Not Found', 'info');
      });
  };
  React.useEffect(() => {
    getClaim();
    getPC();
    getPCs();
  }, []);

  const GetPdf = () => {

    const productItems = [
      [
        {
          text: 'Claim seq',
          style: 'tableHead',
        },
        {
          text: 'amount',
          style: 'tableHead',
        },
       ],
    ];
    projectDetail.forEach(element => {
      productItems.push([
    {
          text: `${element.claim_seq? element.claim_seq : ''}`,
         
        },
        {
          text: `${element.amount? element.amount : ''}`,
          
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
          text: 'WORKS PROGRESS CLAIM ',
          style: 'textSize',
          bold: true,
          margin:[0,0,-20,0],
        },
        
               {
          text: `Ref No: `,
          style: 'textSize',
          bold: true,
          margin:[200,5,-150,10],
          },
          {text:`${deliveryData.ref_no?deliveryData.ref_no:''}`,margin:[80,5,70,10],style: 'textSize',alignment: 'center'},
           {canvas: [ { type: 'line', x1: 95, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[-115,18,0,0]},
         
          ],},
          '\n',
      {columns: [
        {
          text: `Our Progress Claim No.`,
          style: 'textSize',
          bold: true,
          margin:[0,8,-13,0],
        },
        {text:`${editPo.claim_seq?editPo.claim_seq:''}`,margin:[30,5,-25,10],style: 'textSize'},
         {canvas: [ { type: 'line', x1: 200, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[-108,18,0,0]},
        
               {
          text: `Date:`,
          style: 'textSize',
          bold: true,
          margin:[0,8,0,0],
          },
          {text:`${editPo.date?editPo.date:''}`,margin:[-80,0,-20,0],  style: 'textSize',alignment: 'center'},
          {canvas: [ { type: 'line', x1: 175, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[-200,18,0,0]}
          ],},
          '\n',
          
           {
          text: 'Contractor / Claim By ',
          style: 'textSize',
          bold: true,
            margin:[0,0,0,0],
        },
        {text:`CUBOSALE PVT LTD`,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 430, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[110,-5,0,20]},
        {
          text: `Project Name:`,
          style: 'textSize',
          bold: true,
          margin:[0,10,-13,0],
        },
        {text:`${editPo.title?editPo.title:''}`,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 430, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[110,-5,0,20]},
        {
          text: `Work Description:`,
          style: 'textSize',
          bold: true
        },
        {text:`${editPo.description?editPo.description:''}`,margin:[120,-18,50,10],style: 'textSize',   alignment: 'center'},
        {canvas: [ { type: 'line', x1: 430, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[110,-5,0,20]},
      
      {columns: [
        {
          text: `PO No./Quotation No.`,
          style: 'textSize',
          bold: true,
          margin:[0,8,-13,0],
        },
        {text:`${editPo.quote_id?editPo.quote_id:''}`,margin:[30,5,-25,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 200, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[-108,18,0,0]},
               {
          text: `Date:`,
          style: 'textSize',
          bold: true,
          margin:[0,5,0,0],
          },
          {text:`${deliveryData.claim_date?deliveryData.claim_date:''}`,margin:[-80,0,-15,0],  style: 'textSize',alignment: 'center'},
          {canvas: [ { type: 'line', x1: 175, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[-200,18,0,0]}
          ],},
          '\n',
      
        {
          text: `1. Contact Sum `,
          style: 'textSize',
          bold: true,
          margin:[0,10,-13,0],
        },
        {text:`${deliveryData.con_sum?deliveryData.con_sum:''}`,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 250, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[190,-5,0,20]},
         {
          text: `2. Variation Order Submission (Amount) `,
          style: 'textSize',
          bold: true,
          margin:[0,10,-13,0],
           color:'red'
        },
        {text:`${deliveryData.variation_order_submission?deliveryData.variation_order_submission:''}`,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 250, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[190,-5,0,20]},

{
          text: `3. Overall (Amount)`,
          style: 'textSize',
          bold: true,
          margin:[0,10,-13,0],
           color:'red'
        },
        {text:`${deliveryData.overAllAmount?deliveryData.overAllAmount:''}`,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 250, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[190,-5,0,20]},
{
          text: `4. Value of Contract Work Done (Amount): `,
          style: 'textSize',
          bold: true,
          margin:[0,10,-13,0],
          
        },
        {text:`${deliveryData.value_of_contract_work_done?deliveryData.value_of_contract_work_done:''} `,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 250, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[190,-5,0,20]},

{
          text: `5. VO Claim Work Done (Amount) `,
          style: 'textSize',
          bold: true,
          margin:[0,10,-13,0],
          
        },
        {text:`${deliveryData.vo_claim_work_done?deliveryData.vo_claim_work_done:''} `,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 250, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[190,-5,0,20]},

         
         {
          text: '6. Less Previous Paid',
          style: 'textSize',
          bold: true,
           margin:[0,0,0,0],
          
        },
        {
          table: {
             widths: [200, 200,200 ],
            body: productItems,
            border: [false, false, false, true],
          },
        },
       
{
          text: `7.Less Previous Retention `,
          style: 'textSize',
          bold: true,
          margin:[0,10,-13,0],
          
        },
        {text:` ${deliveryData.less_previous_retention?deliveryData.less_previous_retention:''} `,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 250, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[190,-5,0,20]},
         
         {
          text: `8.This Month Claim`,
          style: 'textSize',
          bold: true,
          margin:[0,10,-13,0],
          
        },
        {text:` ${(gTotal.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))} `,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 250, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[190,-5,0,20]}, 
          {
          text: `Add 7% GST`,
          style: 'textSize',
          bold: true,
          margin:[0,10,-13,0],
          
        },
        {text:` ${(gstTotal.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 250, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[190,-5,0,20]},
         
           {
          text: `Total Amount Claimed `,
          style: 'textSize',
          bold: true,
          margin:[0,10,-13,0],
          
        },
        {text:` ${(Total.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))} `,margin:[120,-18,50,10],style: 'textSize',alignment: 'center'},
        {canvas: [ { type: 'line', x1: 250, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[190,-5,0,20]},
         
           {columns: [
        {
          text: 'Claimed By: CUBOSALE PTE LTD',
          style: 'textSize',
          bold: true,
            margin:[0,50,0,20],
        },
        
               {
          text: `Certified BY: ${editPo.company_name?editPo.company_name:''}`,
          style: 'textSize',
          bold: true,
          margin:[50,50,0,0],
          },
          
          ],},
          '\n',

          
                    {columns: [
     
         {canvas: [ { type: 'line', x1: 155, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[0,8,0,0]},
        
     
           {canvas: [ { type: 'line', x1: 155, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[60,8,0,0]},
          ],},
          '\n',
          
      
          {columns: [
        {
          text: 'Authorised Signature & Co. Stamp',
          style: 'textSize',
          bold: true
        },
        
               {
          text: 'Authorised Signature (Project Manager)',
          style: 'textSize',
          bold: true,
          margin:[60,0,0,0],
          },
          
          ],},
  
          
                     {columns: [
        {
          text: 'Name:',
          style: 'textSize',
          bold: true
        },
        
               {
          text: 'Name:',
          style: 'textSize',
          bold: true,
          margin:[60,0,0,0],
          },
          
          ],},
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
        Print PC Summary
      </Button>
    </>
  );
};

export default PdfPcSummary;
