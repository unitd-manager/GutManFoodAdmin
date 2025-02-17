import React from 'react';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import api from '../../constants/api'
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';
import message from '../Message';


const PdfEmployeeContract= () => {
  const { id } = useParams();
    const [hfdata, setHeaderFooterData] = React.useState()
    const [employeeDetails, setEmployeeDetails] = React.useState();
  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
        setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
      const filteredResult = hfdata.find((e) => e.key_text === key);
      return filteredResult.value
  }

  const getEmployeeById = () => {
    api
      .post('/jobinformation/EditjobinformationById', { job_information_id: id })
      .then((res) => {
        setEmployeeDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };
  React.useEffect(() => {
    getEmployeeById();
  }, []);
  const GetPdf = () => {
    const dd = {
      pageSize: 'A4',
      header: PdfHeader({findCompany}),
      pageMargins: [ 40, 150, 40,80 ],
      footer:PdfFooter,
      content: [
        {
               text: 'Private & Confidential\n ',
               style: 'textSize',
               bold:true,
               alignment:'center',
               fontSize:15
             },
             {
               text: 'Employement Agreement\n ',
               style: 'textSize',
               bold:true,
               alignment:'center',
               fontSize:15
             },
             
            {
               text: `This Employment Agreement dated  ${employeeDetails.act_join_date?employeeDetails.act_join_date:''} is made between\n\n`,
               style: 'textSize',
               fontSize:10
             },   
             {
              text: `CUBOSALE PTE LTD(hereinafter referred to as "the employer") with its business operating address located at\n\n`  ,
              style: 'textSize',
              fontSize:10
            }, 
                  {
               text: 'And \n\n',
               style: 'textSize',
               fontSize:10
             },  
             
              {
              text:` ${employeeDetails.first_name?employeeDetails.first_name:''} NRIC NO:${employeeDetails.nric_no?employeeDetails.nric_no:''} \n\n`,  
               style: 'textSize',
               fontSize:10
             },   
           
            {
               text: ' (hereinafter referred to as "the employee") with its residence located at  \n\n\n',
               style: 'textSize',
               fontSize:10
             },   
           
         {
               text: '1	COMMENCEMENT OF EMPLOYMENT\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
             },   
             
             {
              text: `1.1	Your employment shall commence on  ${employeeDetails.act_join_date ? employeeDetails.act_join_date:''}\n\n\n`,
              fontSize:10,
              style: 'textSize',
            },
             
           {
               text: '1.2	You shall be on probation for a period ofthree (3) months from the date of commencement. The Company may extend the probation period at its sole discretion.\n\n',
               style: 'textSize',
               fontSize:10
             },
             
             
                      {
               text: '2	PLACE OF WORK : CUBOSALE PTE LTD\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
             },
             
               {
               text: `2.1  ${employeeDetails.place_of_work ? employeeDetails.place_of_work:''}\n\n`,
               style: 'textSize',
               fontSize:10
             },
             
           {
               text: '3 Job Descriptions\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
             },
             
           {
               text: '3.1 Designation / Job Grade (Occupation)\n\n',
               style: 'textSize',
               fontSize:10
             },

             {
              text: ` ${employeeDetails.designation ? employeeDetails.designation:''}\n\n`,
              style: 'textSize',
              fontSize:10
            },
            
     
           {
               text: '3.2 Duties & Responsibilities: (Main Function)\n\n',
               style: 'textSize',
               fontSize:10
             },        
             {
              text: ` ${employeeDetails.duty_responsibility ? employeeDetails.duty_responsibility:''}\n\n`,
              style: 'textSize',
              fontSize:10
            },
                  
             
              {
               text: '4	SALARY\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
             },   
             
           {
               text: `4.1	Your monthly basic salary shall be $ ${employeeDetails.basic_pay ? employeeDetails.basic_pay:''} per month as fixed allowance.\n\n`,
               style: 'textSize',
               fontSize:10
             }, 
             
              {
               text: '4.2	Any declarations of non- contractual bonus shall be made at the sole and absolute discretion of the Company. In determining the amount of bonus, the Company shall consider your work performance, amongst other factors. \n\n',
               style: 'textSize',
               fontSize:10
             }, 
             
           {
               text: '5	WORKING DAYS / HOURS OF WORK \n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
             },
             
              {
               text: `5.1	Working Days.  The Company working days shall be ${employeeDetails.working_days ? employeeDetails.working_days:''} days work week. \n\n`,
               style: 'textSize',
               fontSize:10
             },
             
               {
               text: '5.2	Working Hours. The normal contractual working hours shall be 8 hours per day and a total of 44 hours per week. However, you may be required to work in a single shift or split shift based on the work schedule. \n\n',
               style: 'textSize',
               fontSize:10
             },
       
                {
               text: '5.3	The lunch / meal break of 1 hour (unpaid) will be taken between 12.00 noon to 2.00 pm. \n\n',
               style: 'textSize',
               fontSize:10
             },
             
              {
               text: '5.4	You may be required to work beyond the normal working hours to discharge your duties at the sole discretion of the Company. The Company also reserves the right, at its sole discretion, to revise, amend or extend the working hours should the need arise.\n\n',
               style: 'textSize',
               fontSize:10
             },
             
           {
               text: '5.5	 Rest Day (unpaid). You shall be given one rest day per week and it shall be roosted as per the monthly schedule. However, due to exigency of service, if you work on your schedule rest day, you shall be given a day off in-lieu.\n\n',
               style: 'textSize',
               fontSize:10
             },
       
         {
               text: '6	PUBLIC HOLIDAY\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
             },
       
                 {
               text: '6.1 You shall be entitled to all official public holidays on full pay. If you work on a public holiday you shall be given a day off in-lieu of the holiday.\n\n',
               style: 'textSize',
               fontSize:10
             },
             
                     
                 {
               text: '6.2 If you are absent from work on a working day immediately preceding or immediately succeeding a holiday or on any day substituted without prior consent or reasonable excuse shall not be entitled to any holiday pay for that holiday.\n\n',
               style: 'textSize',
               fontSize:10
             },
             
           {
               text: '7	ANNUAL LEAVE \n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
             },
             
           {
               text: '7.1	Upon completing the first 3 months of continuous service, you will be entitled to (number of days) days paid annual leave for the first 12 months (calendar year) of continuous service from the date of appointment. Annual leave shall be pro-rated based on completed months before the completion of one year service (calendar year). \n\n',
               style: 'textSize',
               fontSize:10
             },
             
           {
               text: '7.2	During the first three months of your employment or probation period, you are not allowed to consume any paid leave. \n\n',
               style: 'textSize',
               fontSize:10
             },
             
           {
               text: '7.3	You cannot carry forward any unutilised annual leave to the next year. Any leave balance at the end of the calendar year shall be forfeited unless approved by the Company to be carried forward to the next year. \n\n',
               style: 'textSize',
               fontSize:10
             },
       
               {
               text: '7.4	Unpaid leave shall be granted at the sole discretion of the Company. The Company reserves the right to terminate your employment without notice if you are absent from work on unpaid leave without prior approval from the Company.\n\n',
               style: 'textSize',
               fontSize:10
             },
             
               {
               text: '7.5	You are entitled to three (3) days of compassionate leave for the bereavement of immediate parents and family and 2 consecutive days for bereavement of grandparents, parent-in-law, brother and sister per calendar year upon the completion of the first year of service. Approval for compassionate leave shall be at the sole discretion of the company. \n\n',
               style: 'textSize',
               fontSize:10
             },
             
           {
               text: '7.6	All leave applications must be made in writing, at leastseven (7) days in advance and shall be approved at the absolute discretion of the Company.\n\n',
               style: 'textSize',
               fontSize:10
             },
             
                          
           {
               text: '8	SICK LEAVE\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
             },
             
               {
               text: '8.1	You must notify the Company and/or your immediate supervisor as soon as practicable if you are unable to work for medical reasons. Such notice shall be given within the first four (4) hours of the working day. \n\n',
               style: 'textSize',
               fontSize:10
             },
             
           {
               text: '8.2	You are to seek medical consultation and  treatment only at Government Poly Clinics and Hospitals, and  produce without demand, a medical certificate in all cases where you are absent from work for medical reasons. \n\n',
               style: 'textSize',
               fontSize:10
             },
       
                   {
               text: '8.3	You are entitled to fourteen (14) days of paid sick leave and up to sixty (60) days (including 14 days sick leave) of paid hospitalisation leave, per calendar year, if you are hospitalised on a doctor written order.\n\n',
               style: 'textSize',
               fontSize:10
             },
             
           {
               text: '8.4	During the first three (3) months of your employment period you will not be entitled to paid sick leave and any sick leave taken during the period will be considered as unpaid leave unless approved at the sole discretion of the Company.\n\n',
               style: 'textSize',
               fontSize:10
            },
            
           {
               text: ' 8.5 From the 3rd  month of service your medical entitlement shall be as follows\n\n',
               style: 'textSize',
               fontSize:10
            },
            
            {
     style: 'tableExample',
     table: {
       body: [
         ['Service (Mths)', 'Medical Leave', 'Hospitalisation Leave'],
         ['3 Months', '5', '15'],
         ['4 Months', '5+3=8', '15+15=30'],
           ['5 Months', '8+3=11', '30+15=45'],
           ['6 Months', '11+3=14', '45+15=60'],
           ['Thereafter', '14', '60']
       ]
     }
   },
          {
               text: '\n\n 9 MATERNITY &  CHILD CARE BENEFITS\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
            },  
         
           {
               text: ' 9.1 Upon completing the first 3 months of continuous service, you will be entitled to 16 weeks of paidmaternity and 6 days paid childcare leave benefits as per the Employment Act.\n\n',
               style: 'textSize',
               fontSize:10
            },    
            
           {
               text: '10 INSURANCE\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
            }, 
             {
               text: '10.1	You will be covered under the Work Injury Compensation Insurance and the Work Medical Insurance / Hospitalisation & Surgery (H & S) Insurance.\n\n',
               style: 'textSize',
               fontSize:10
            }, 
            
          {
               text: ' 11	TERMINATION AND NOTICE\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
            }, 
                      {
               text: ' 11.2	Upon confirmation of your employment, either party may terminate the contract by giving one (1) months  notice or one (1) months salary in lieu of notice. \n\n',
               style: 'textSize',
               fontSize:10
            }, 
                      {
               text: ' 11.3	The Company reserves the right not to give any reasons for termination during the probation period. \n\n',
               style: 'textSize',
               fontSize:10
            }, 
                      {
               text: ' 1111.4	The Company, however, has the right to give immediate notice before terminating your services if you are guilty of misdemeanour, misconduct, negligence or breach of any of the terms of this Letter of Appointment. \n\n',
               style: 'textSize',
               fontSize:10
            }, 
            
                 {
               text: ' 11.5	Upon the termination of your employment you shall return to the Company all documents, records, items and materials in your possession or custody belonging to the Company. \n\n',
               style: 'textSize',
               fontSize:10
            }, 
            
                 {
               text: ' All staff benefits shall cease after the last day of employment. Any money due and owing to Company must be settled before the last day of employment. The Company reserves the right to offset any outstanding sums from the balance of money payable by the Company to you\n\n',
               style: 'textSize',
               fontSize:10
            }, 
            
                 {
               text: '12	CONFIDENTIALITY\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
            }, 
       
                    
                 {
               text: '12.1	You shall not disclose to any third party any confidential information obtained during your course of employment unless expressly authorised by the Company. \n\n',
               style: 'textSize',
               fontSize:10
            }, 
                         
                 {
               text: '12.2	Confidential information for the purposes of this contract includes and is not limited to trade secrets, business plans, strategies, financial information and any other information that will affect the Company competitive position. \n\n',
               style: 'textSize',
               fontSize:10
            }, 
                         
                 {
               text: '12.3	Your obligations to maintain confidentiality and secrecy shall apply after your employment until such time that the information is no longer confidential or has been made public by the Company. \n\n',
               style: 'textSize',
               fontSize:10
            }, 
            
                         
                 {
               text: '12.4	You shall not without prior written consent of the Company destroy, make copies, duplicate or reproduce in any form the Company confidential information. \n\n',
               style: 'textSize',
               fontSize:10
            }, 
            
                         
                 {
               text: '13	GENERAL\n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
            }, 
            
                         
                 {
               text: ' 13.1	Any changes to this agreement will only be valid if they are in writing and have been agreed and signed by both parties.\n\n',
               style: 'textSize',
               fontSize:10
            }, 
            
                         
                 {
               text: ' 13.2 You shall not at any time during your employment with the Company either directly or indirectly (without prior written consent form Company) engage or interest yourself, whether for reward or gratuitously, in any work or business other than that relating to your duties in the Company.\n\n',
               style: 'textSize',
               fontSize:10
            }, 
            
                        {
               text: '14	GOVERNING LAW \n\n',
               style: 'textSize',
               fontSize:10,
               bold:true
            }, 
            
                                {
               text: 'This Letter of Appointment shall be governed by and construed in accordance with the laws of Singapore. \n\n\n\n',
               style: 'textSize',
               fontSize:10
            }, 
            
           {
               text: ' For and on behalf of CUBOSALE PTE LTD',
               style: 'textSize',
               fontSize:10
            },
            
                        {
               text: 'DIRECTOR \n CUBOSALE PTE LTD\n\n',
               style: 'textSize',
               fontSize:10
            },
                          {
               text: `THIS AGREEMENT SIGNED ON THIS ${employeeDetails.act_join_date ? employeeDetails.act_join_date:''}\n\n\n\n\n\n\n`,
               style: 'textSize',
               fontSize:10
            },
 
 
              {columns: [

                {canvas: [ { type: 'line', x1: 105, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[0,0,0,0]},
                  
             {
               text: 'Signature/ Date ',
               style: 'textSize',
               margin:[-130,10,0,0]
         
             },
             {canvas: [ { type: 'line', x1: 105, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[100,0,-150,0]},
                 {
               text: `${employeeDetails.first_name?employeeDetails.first_name:''} \n NRIC no:${employeeDetails.nric_no?employeeDetails.nric_no:''} `,
               style: 'textSize',
               margin:[-25,10,-150,0]
             },
             
               ],},
               '\n',
               {canvas: [ { type: 'line', x1: 105, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[105,25,0,0]},
               {
                text: 'Witnessed by:',
                style: 'textSize',
                fontSize:10,
                margin:[0,-10,0,0]
             },
               {canvas: [ { type: 'line', x1: 105, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[105,25,0,0]},
               {
                text: 'Signature of witness:',
                style: 'textSize',
                fontSize:10,
                margin:[0,-10,0,0]
             },
               {canvas: [ { type: 'line', x1: 105, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[105,25,0,0]},
               {
               text: 'Name of Witness:\n',
               style: 'textSize',
               fontSize:10,
               margin:[0,-10,0,0]
            },
               {canvas: [ { type: 'line', x1: 105, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[105,25,0,0]},

                {
               text: 'Designation of Witness:\n',
               style: 'textSize',
               fontSize:10,
               margin:[0,-10,0,0]
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
        Print Employee Contract
      </Button>
    </>
  );
};

export default PdfEmployeeContract;
