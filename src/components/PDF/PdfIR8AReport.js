import React from 'react';
// import { useParams } from 'react-router-dom';
import pdfMake from 'pdfmake';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import pdfFonts from 'pdfmake/build/vfs_fonts';
// import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

const PdfIR8AReport = ({employeeId}) => {
  PdfIR8AReport.propTypes = {
    employeeId: PropTypes.any
  }

  // const { id } = useParams();
  const [report, setReport] = React.useState();
 
 

 
  // Gettind data from Job By Id
  const getPoProduct = () => {
    api
      .post('/reports/getIr8aReportPdf', { employee_id:employeeId })
      .then((res) => {
        setReport(res.data.data[0]);
        
      })
      .catch(() => {
        message('PurchaseOrder Data Not Found', 'info');
      });
  };
  
  React.useEffect(() => {
   
    getPoProduct();
  }, []);

  const GetPdf = () => {
   
   

    const dd = {
      pageSize: 'A4',
   
      pageMargins: [ 30, 0, 30, 0 ],
    
      content: [
        {columns:[
          {
             text:`2023`,color:'black',fontSize: 21, bold:true, alignment: 'left', margin:[-1,0,0,0] 
          },
         
     {text:` FORM IR8A`,color:'black',fontSize: 20, margin:[-50,0,0,0],bold:true },
        ],
      },   

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
             return 'grey';
           },
         },
         table: {
           headerRows: 1,
           widths: ['101%',],

           body: [
             [
               {
                 text: `Return to Employee's remuneration for the Year Ended 31 Dec 2022 \n Fill inthis form and give it to your employee by 1Mar 2023 \n(DO NOT SUBMIT THIS FORM IRAS UNLESS REQUESTED TO DO SO)`,
                 alignment: 'center',
                  fontSize: 10,
                 color:'white'
               },
             ],
           ],
         },
       },
       {
         text: `This Form will take about 10 minutes to complete.Please get ready the employees's personal particulars and details of his/her employment income.Please read the explanatory notes when complleting this form.`,
                 alignment: 'left',
                 margin:[0,5,0,5],
                 fontSize: 8,
                 
      },
           
   
         {
     style: 'tableExample',
     color: '#444',
     table: {
       widths: [173, 50, 130,150],
       headerRows: 2,
       // keepWithHeaderRows: 1,
       body: [
         [{text:`Employer’s Tax Ref. No. / UEN 10000001G`,fontSize:8, style: 'tableHeader', colSpan: 2, alignment: 'left'}, {}, {text: `Employee’s Tax Ref. No. :${report.nric_fin?report.nric_fin:''} *NRIC / FIN (Foreign Identification No.)`,fontSize:8, style: 'tableHeader', colSpan: 2, alignment: 'left'},{}],
         [{text: `Full Name of Employee as per NRIC / FIN \n${report.employee_name?report.employee_name:''}`,fontSize:8 },{text:`Sex :${report.gender?report.gender:''}`,fontSize:8},{text:`Date of Birth :${report.date_of_birth?report.date_of_birth:''}`,fontSize:8},{text:`Nationality:   ${report.race?report.race:''}`,fontSize:8}],
           [{text: `Residential Address :${report.address_street?report.address_street:''}${report.address_town?report.address_town:''}${report.address_state?report.address_state:''}${report.address_country?report.address_country:''}`, style: 'tableHeader', colSpan: 2,fontSize:6 },{}, {text:`Designation :${report.designation?report.designation:''}`,fontSize:8},{text:'Bank to which salary is credited :',fontSize:8}],
             [{text: ' If employment commenced and/or ceased during the year, state:(See Explanatory Note 5)', style: 'tableHeader', colSpan: 2,fontSize:8 }, {}, {text:'Date of Commencement :',fontSize:8},{text:'Date of Cessation :',fontSize:8}],
       
       
       ]
     }
   },
   
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
             return 'grey';
           },
         },
         table: {
           headerRows: 1,
           widths: ['101%',],

           body: [
             [
               {
                 text: `INCOME (See Explanatory Note 9 unless otherwise specified)`,
                 alignment: 'left',
                  fontSize: 10,
                 color:'white'
               },
             ],
           ],
         },
       },
   
    {columns: [
        {text:`a) Gross Salary, Fees, Leave Pay, Wages and Overtime Pay`,fontSize:8,margin:[10,5,0,0],bold:true},
        {
          stack: [
            {text:`${report.gross_salary?report.gross_salary:''}`,fontSize:6,margin:[220,0,0,0],alignment: 'center'},

            {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[220,0,0,0]}
          ],
        },
       ],
       },
       {columns: [
        {text:`b) Bonus (non-contractual bonus paid in 2022 and/or contractual bonus)`,fontSize:8,margin:[10,5,0,0]},
 
        {
          stack: [
            {text:`${report.gross_salary?report.gross_salary:''}`,fontSize:6,margin:[220,0,0,0],alignment: 'center'},

            {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[220,0,0,0]}
          ],
        },
 
        ],
       },
       {columns: [
        {text:`c) Director’s fees (approved at the company’s AGM/EGM on 31/12/2022)`,fontSize:8,margin:[10,5,0,0]},
        {
          stack: [
            {text:`${report.director_fees?report.director_fees:''}`,fontSize:6,margin:[220,0,0,0],alignment: 'center'},

            {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[220,0,0,0]}
          ],
        },
 
        ],
       },
    {text:`d) Others::`,fontSize:8,margin:[10,5,0,0],bold:true},   
      {columns: [
        {text:`1. Allowances: (i) Transport`, width: 150,fontSize:8,margin:[20,5,0,0]},
 
          {text:`(ii) Entertainment `,fontSize:8,margin:[44,5,0,0]},
            {text:`(iii) Others `,fontSize:8,margin:[44,5,0,0]},
            {
              stack: [
                {text:`${report.total_allowance?report.total_allowance:''}`,fontSize:6,margin:[80,0,0,0],alignment: 'center'},
    
                {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[80,0,0,0]}
              ],
            },
        
 
        ],
       },
     {columns: [
        {text:`2. Gross Commission for the period 01/01/2022 to 31/12/2022`, width: 250,fontSize:8,margin:[20,5,0,0]},
 
          {text:`*Monthly and/or other adhoc payment`, width: 250,fontSize:8,margin:[44,5,0,0]},
          {
            stack: [
              {text:`${report.commissions?report.commissions:''}`,fontSize:6,margin:[-10,0,0,0],alignment: 'center'},
  
              {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[-10,0,0,0]}
            ],
          },
    
 
        ],
       },
       {columns: [
        {text:`3. Pension`,fontSize:8,margin:[20,5,0,5]},
 
        {
          stack: [
            {text:`${report.gross_salary?report.gross_salary:''}`,fontSize:6,margin:[220,0,0,0],alignment: 'center'},

            {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[220,0,0,0]}
          ],
        },
        
 
        ],
       },
       {columns: [
        {text:`4. Lump sum payment`,fontSize:8,margin:[20,0,0,5]},
 
        {
          stack: [
            {text:`${report.gross_salary?report.gross_salary:''}`,fontSize:6,margin:[220,0,0,0],alignment: 'center'},

            {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[220,0,0,0]}
          ],
        },
 
        ],
       },
       
         {
     style: 'tableExample',
     color: '#444',
     table: {
       widths: ['*', '*','*'],
       headerRows: 2,
       // keepWithHeaderRows: 1,
       body: [
         [{text:'(i) Gratuity $ 0.00',fontSize:8, style: 'tableHeader',  alignment: 'left'}, {text: '(ii) Notice Pay $ 0.00',fontSize:8, style: 'tableHeader', colSpan: 1, alignment: 'left'},{text: '(iii) Ex-gratia payment $ 0.00',fontSize:8, alignment: 'left'}],
         [{text:' (iv) Others (please state nature) $ 0.00',fontSize:8,colSpan: 3, },{text:'Sex :',fontSize:8},{text:'Date of Birth :',fontSize:8}],
           [{text: '(v) Compensation for loss of office $ 0.00', style: 'tableHeader', colSpan: 1,fontSize:8 },{text:'Approval obtained from IRAS: *Yes/No',fontSize:8}, {text:'Date of approval:',fontSize:8}],
             [{text:'Reason for payment:',fontSize:8,bold:true, style: 'tableHeader',  alignment: 'left'}, {text: 'Length of service within the company/group:',fontSize:8,bold:true, style: 'tableHeader', colSpan: 2, alignment: 'left'},{}],
             [{text: 'Basis of arriving at the payment:                (Give details separately if space is insufficient)', style: 'tableHeader', colSpan: 3,fontSize:8 },{}],
       
       
       ]
     }
   },
    {columns: [
        {text:`5. Retirement benefits including gratuities/pension/commutation of pension/lump sum payments, etc from Pension/Provident Fund: Name of Fund(Amount accrued up to 31 Dec 1992 $ 0.00)`, width: 300,fontSize:8,margin:[20,5,0,0]},
 
          {text:` Amount accrued from 1993:`, width: 220,fontSize:8,margin:[35,5,0,0]},
         {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}], width: 120,margin:[-30,15,0,0]}
 
        ],
    },
     {columns: [
        {text:`6. Contributions made by employer to any Pension/Provident Fund constituted outside Singapore without tax concession: \nContributions made by employer to any Pension/Provident Fund constituted outside Singapore with tax concession:`, width:500,fontSize:8,margin:[20,5,0,0]},
           {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[-10,15,0,0]}
 
        ],
    },
    
    {
     style: 'tableExample',
     color: '#444',
     table: {
       widths: ['*', '*','*'],
       headerRows: 2,
       // keepWithHeaderRows: 1,
       body: [
       
         [{text:' Name of the overseas pension/provident fund:',fontSize:8,colSpan: 3, },{},{}],
           [{text: 'Full Amount of the contributions :', style: 'tableHeader', colSpan: 2,fontSize:8 },{}, {text:'Are contributions mandatory: *Yes/No',fontSize:8}],
           [{text:' Were contributions charged / deductions claimed by a Singapore permanent establishment: *Yes/No',fontSize:8,colSpan: 3, },{},{}],
           
       
       
       ]
     }
   },
   {text:'7. Excess/Voluntary contribution to CPF by employer (less amount refunded/to be refunded):',fontSize:8,margin:[20,5,0,0]},
        {columns: [
        {text:`[Complete the Form IR8S] `,fontSize:8,margin:[20,0,0,0],bold:true},
 
       
         {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[220,15,0,0]}
 
        ],
       },
     {text:'8. Gains or profits from Employee Stock Option (ESOP)/other forms of Employee Share Ownership (ESOW) Plans:',fontSize:8,margin:[20,0,0,0]},
       {columns: [
        {text:`[Complete the Appendix 8B] `,fontSize:8,margin:[20,0,0,0],bold:true},
 
       
         {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[220,15,0,0]}
 
        ],
       },
      {text:'9. Value of Benefits-in-kind ',fontSize:8,margin:[20,0,0,0]},
          {columns: [
        {text:`[See Explanatory Note 12 and complete Appendix 8A] `,width:250,fontSize:8,margin:[20,0,0,0],bold:true},
 
         {text:`TOTAL (items d1 to d9) `,fontSize:8,margin:[20,0,0,0],bold:true},
         {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[95,15,0,0]}
 
        ],
       }, 
       {text:'e) 1. Remission: Amount of Income $ 0.00',fontSize:8,margin:[10,0,0,0]},
        {text:'2. Overseas Posting: *Full Year/Part of the Year (See Explanatory Note 8a)',fontSize:8,margin:[20,0,0,0]},
         {text:'3. Exempt Income: $ 0.00 (See Explanatory Note 8b)',fontSize:8,margin:[20,0,0,0]},
     
        {
     style: 'tableExample',
     color: '#444',
     table: {
       widths: ['*', '*','auto'],
       headerRows: 2,
       // keepWithHeaderRows: 1,
       body: [
           [{rowSpan: 2, text: 'Employee’s income \n tax borne by employer?\n* YES / NO',fontSize:8,},{text: 'If tax is fully borne by employer, DO NOT enter any amount in (i) and (ii)', style: 'tableHeader',fontSize:6 },{}],
         [{ }, {text: '(i) If tax is partially borne by employer, state the amount of income for which tax is borne by employer', style: 'tableHeader',fontSize:6 },{text: '0.00', style: 'tableHeader',fontSize:6 },],
           [{ },{text: '(ii) If a fixed amount of tax is borne by employee, state the amount of tax to be paid by employee', style: 'tableHeader',fontSize:6},{text: '0.00', style: 'tableHeader',fontSize:6 },],
           
       
       
       ]
     }
   },
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
             return 'grey';
           },
         },
         table: {
           headerRows: 1,
           widths: ['100%',],

           body: [
             [
               {
                 text: `DEDUCTIONS (See Explanatory Note 10 - Deductions)`,
                 alignment: 'left',
                  fontSize: 10,
                 color:'white'
               },
             ],
           ],
         },
       },
        
    {
     style: 'tableExample',
     color: '#444',
     table: {
       widths: ['*', '*','auto'],
       headerRows: 2,
       // keepWithHeaderRows: 1,
       body: [
       
         [{text:`EMPLOYEE’S COMPULSORY contribution to *CPF/Designated Pension or Provident Fund (less amount refunded/to be refunded)\n Name of Fund : \n(Apply the appropriate CPF rates published by CPF Board on its website ‘www.cpf.gov.sg’. Do not include excess/voluntary contributions to CPF, voluntary contributions to Medisave Account, voluntary contributions to Retirement Sum Topping-up Scheme,SRS contributions and contributions to Overseas Pension or Provident Fund in this item)`,fontSize:6,colSpan: 2, },{},{text:`${report.total_cpf_employee?report.total_cpf_employee:''}`,fontSize:6}],
           [{text: ' Donations deducted from salaries for: \n *Yayasan Mendaki Fund/Community Chest of Singapore/SINDA/CDAC/ECF/Other tax exempt donations', style: 'tableHeader', colSpan: 2,fontSize:6 },{}, {text:'',fontSize:8}],
           [{text:' Contributions deducted from salaries to Mosque Building Fund :',fontSize:6,colSpan: 2, },{},{}],
             [{text: 'Life Insurance premiums deducted from salaries:', style: 'tableHeader', colSpan: 2,fontSize:6 },{}, {text:'0.00',fontSize:6}],
           
       
       
       ]
     }
   },
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
             return 'grey';
           },
         },
         table: {
           headerRows: 1,
           widths: ['100%',],

           body: [
             [
               {
                 text: `DEDUCTIONS (See Explanatory Note 10 - Deductions)`,
                 alignment: 'left',
                  fontSize: 10,
                 color:'white'
               },
             ],
           ],
         },
       },
           {
     style: 'tableExample',
     color: '#444',
     table: {
       widths: [200, '*','*',130,'*'],
       headerRows: 2,
       // keepWithHeaderRows: 1,
       body: [
       
         [{text:' Name of Employer :Cubosale Software',fontSize:8,colSpan: 5, },{},{},{},{}],
           [{text: 'Address of Employer :10 Jalan Besar,#15-02 Sim Lim Tower,Singapore - 208787', style: 'tableHeader',colSpan: 5,fontSize:8 },{}, {text:'Are contributions mandatory: *Yes/No',fontSize:8},{},{}],
           [{text: 'Name of authorised person making the declaration', style: 'tableHeader', fontSize:8 },{text:'Designation',fontSize:8}, {text:'Tel. No',fontSize:8},{text:'Signature',fontSize:8},{text:'Date',fontSize:8}],
             [{text: '', style: 'tableHeader', fontSize:8 },{text:'manager',fontSize:8}, {text:'6493 2724',fontSize:8},{text:'',fontSize:8},{text:'24-02-2023',fontSize:8}],
         
           
       
       
       ]
     }
   },
      {
             text:`There are penalties for failing to give a return or furnishing an incorrect or late return.`,color:'black',fontSize: 8,bold:true, alignment: 'center', margin:[-1,0,0,0] 
          },
       {columns:[
          {
             text:`IR8A (1/2023) `,color:'black',fontSize: 8, alignment: 'left', margin:[-1,0,0,0] 
          },
         
     {text:`* Delete where applicable`,color:'black',fontSize: 8,alignment: 'right',  margin:[45,0,0,0],bold:true },
        ],
      },  
     
       ],
 
margin:[50,50,50,50] ,

//  styles: {
//        logo: {
//          margin: [-20, 20, 0, 0],
//        },
//        address: {
//          margin: [-10, 20, 0, 0],
//        },
//        invoice: {
//          margin: [0, 30, 0, 10],
//          alignment: 'right',
//        },
//        invoiceAdd: {
//          alignment: 'right',
//        },
//        textSize: {
//          fontSize: 10,
//        },
//        notesTitle: {
//          bold: true,
//          margin: [0, 50, 0, 3],
//        },
//        tableHead: {
//          border: [false, true, false, true],
//          fillColor: '#eaf2f5',
//          margin: [0, 5, 0, 5],
//          alignment: 'center',
//          fontSize: 10,
//          bold: 'true',
//        },
//        tableBody: {
//          border: [false, false, false, true],
//          margin: [0, 5, 0, 5],
//          alignment: 'left',
//          fontSize: 10,
//        },
//        tableBody1: {
//          border: [false, false, false, true],
//          margin: [10, 5, 0, 5],
//          alignment: 'right',
//          fontSize: 10,
//        },
//        tableBody2: {
//          border: [false, false, false, true],
//          margin: [15, 5, 0, 5],
//          alignment: 'center',
//          fontSize: 10,
//        },
//      },
 

};
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };

  return (
    <>
    <span onClick={GetPdf}>
      <Icon.Printer></Icon.Printer>
      </span>
    </>
  );
};

export default PdfIR8AReport;
