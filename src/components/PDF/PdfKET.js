import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfKET = () => {
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  const [job, setJob] = useState();

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
  // Gettind data from Job By Id
  const getKET = () => {
    api
      .post('/jobinformation/EditjobinformationById', { job_information_id: id })
      .then((res) => {
        setJob(res.data.data[0]);
        console.log(job);
      })
      .catch(() => {
        message('Job information Data Not Found', 'info');
      });
  };

  React.useEffect(() => {
    //getPurchaseOrderId();
    getKET();
  }, []);

  const GetPdf = () => {
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
                  text: `~Employment Key Terms~`,
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
            widths: ['51%', '50%'],

            body: [
              [
                {
                  text: 'Section A | Details of Employment',
                  style: 'tableHead',
                },

                {
                  text: '',
                  style: 'tableHead',
                },
              ],

              [
                {
                  text: `Company Name:
                  Cubosale Pte ltd`,
                  border: [false, false, false, true],
                  style: 'tableBody',
                },

                {
                  border: [false, false, false, true],
                  text: `Job Title,Main Duties and Responsibilities:
                  ${job.duty_responsibility ? job.duty_responsibility : ''}`,
                  fillColor: '#f5f5f5',
                  style: 'tableBody',
                },
              ],

              [
                {
                  text: `Employee Name:
                  ${job.employee_name ? job.employee_name : ''}`,
                  border: [false, false, false, true],
                  style: 'tableBody',
                },

                {
                  ul: [
                    {
                      text: 'Full Time Employment',
                      listType: job.emp_type === 'full time' ? 'square' : 'circle',
                    },
                    {
                      text: 'Part Time Employment',
                      listType: job.emp_type === 'part time' ? 'square' : 'circle',
                    },
                  ],
                  border: [false, false, false, true],
                  style: 'tableBody',
                  fillColor: '#f5f5f5',
                },
              ],
              [
                {
                  text: `Employee NRIC/FIN:
                  ${job.nric_no ? job.nric_no : ''}`,
                  border: [false, false, false, true],
                  style: 'tableBody',
                },

                {
                  text: `Duration of Employment:
                  ${job.duration_of_employment ? job.duration_of_employment : ''}`,
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  style: 'tableBody',
                },
              ],
              [
                {
                  text: `Employment Start Date:
                  ${job.act_join_date ? job.act_join_date : ''}`,
                  border: [false, false, false, true],

                  style: 'tableBody',
                },

                {
                  text: `Place Of Work:
                  ${job.place_of_work ? job.place_of_work : ''}`,
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  style: 'tableBody',
                },
              ],
            ],
          },
        },

        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },

            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
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
            widths: ['51%', '50%'],
            body: [
              [
                {
                  text: 'Section B| Working Hours and Rest Days',
                  style: 'tableHead',
                },

                {
                  text: '',
                  style: 'tableHead',
                },
              ],

              [
                {
                  text: `Details of Working Hours:
                    ${job.work_hour_details ? job.work_hour_details : ''}`,
                  border: [false, false, false, true],
                  style: 'tableBody',
                },

                {
                  border: [false, false, false, true],
                  text: `No of Working Days Per Week: ${job.working_days ? job.working_days : ''} \n
                    Rest Day Per Week: ${job.rest_day_per_week ? job.rest_day_per_week : ''}`,
                  fillColor: '#f5f5f5',
                  style: 'tableBody',
                },
              ],
            ],
          },
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
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['51%', '50%'],

            body: [
              [
                {
                  text: 'Section C | Salary',
                  style: 'tableHead',
                },
                {
                  text: '',
                  style: 'tableHead',
                },
              ],
              [
                {
                  ul: [
                    { text: 'Salary Period:' },
                    {
                      text: 'Hourly',
                      listType: job.payment_type === 'hourly' ? 'square' : 'circle',
                    },
                    { text: 'Daily', listType: job.payment_type === 'daily' ? 'square' : 'circle' },
                    {
                      text: 'Weekly',
                      listType: job.payment_type === 'weekly' ? 'square' : 'circle',
                    },
                    {
                      text: 'Fortnightly',
                      listType: job.payment_type === 'fortnightly' ? 'square' : 'circle',
                    },
                    {
                      text: 'Monthly',
                      listType: job.payment_type === 'monthly' ? 'square' : 'circle',
                    },
                  ],
                  border: [false, false, false, true],
                  style: 'tableBody',
                },

                {
                  text: `Date(s) of Salary Payment:${
                    job.salary_payment_dates ? job.salary_payment_dates : ''
                  } \n
                    Date(s) of Overtime Payment:${
                      job.overtime_payment_date ? job.overtime_payment_date : ''
                    }`,
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  style: 'tableBody',
                },
              ],

              [
                {
                  ul: [
                    { text: 'Overtime Payment Period:' },
                    {
                      text: 'Hourly',
                      listType: job.overtime_payment_date === 'hourly' ? 'square' : 'circle',
                    },
                    { text: 'Daily', listType: job.overtime_payment_date === 'daily' ? 'square' : 'circle' },
                    {
                      text: 'Weekly',
                      listType: job.overtime_payment_date === 'weekly' ? 'square' : 'circle',
                    },
                    {
                      text: 'Fortnightly',
                      listType: job.overtime_payment_date === 'fortnightly' ? 'square' : 'circle',
                    },
                    {
                      text: 'Monthly',
                      listType: job.overtime_payment_date === 'monthly' ? 'square' : 'circle',
                    },
                  ],

                  border: [false, false, false, true],
                  style: 'tableBody',
                },

                {
                  text: `Basic Salary(per period):${job.basic_pay ? job.basic_pay : ''} \n
                    Overtime Rate of Pay:${job.overtime_pay_rate ? job.overtime_pay_rate : ''}`,
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  style: 'tableBody',
                },
              ],
              [
                [
                  {
                    text: 'Fixed Allowances Per Salary Period',
                    border: [false, false, false, true],
                    fillColor: '#f5f5f5',
                    style: 'tableBody',
                  },
                  {
                    table: {
                      body: [
                        ['Item', 'Allowances(S$)'],
                        ['Transport', `${job.allowance1 ? job.allowance1 : ''}`],
                        ['Entertainment', `${job.allowance2 ? job.allowance2 : ''}`],
                        ['Food', `${job.allowance3 ? job.allowance3 : ''}`],
                        ['Shift Allowance', `${job.allowance4 ? job.allowance4 : ''}`],
                        ['others', `${job.allowance5 ? job.allowance5 : ''}`],
                        ['Total Fixed Allowances', `${job.allowance1 ? job.allowance1 : ''}`],
                      ],
                    },
                  },
                ],

                [
                  {
                    text: 'Fixed Deductions Per Salary Period',
                    border: [false, false, false, true],
                    fillColor: '#f5f5f5',
                    style: 'tableBody',
                  },
                  {
                    table: {
                      body: [
                        ['Item', 'Deductions(S$)'],
                        ['Housing', `${job.deduction1 ? job.deduction1 : ''}`],
                        ['Transportation', `${job.deduction2 ? job.deduction2 : ''}`],
                        ['others', `${job.deduction3 ? job.deduction3 : ''}`],
                        ['Food', `${job.deduction4 ? job.deduction4 : ''}`],
                        ['Levy', `${job.levy_amount ? job.levy_amount : ''}`],
                        ['Total Fixed Deductions', `${job.allowance1 ? job.allowance1 : ''}`],
                      ],
                      border: [false, false, false, true],
                      fillColor: '#f5f5f5',
                      style: 'tableBody',
                    },
                  },
                ],
              ],

              [
                {
                  text: 'Other Salary-Related Components',
                  border: [false, false, false, true],

                  style: 'tableBody',
                },
                {
                  ul: [
                    {
                      text: `CPF Contributions Payable                     ${
                        job.cpf_applicable ? job.cpf_applicable : ''
                      }
                      (subject to prevailing CPF contribution rates)`,
                      border: [false, false, false, true],
                      style: 'tableBody',
                      fillColor: '#f5f5f5',
                      listType: job.cpf_applicable ? 'square' : 'circle',
                    },
                  ],
                },
              ],
            ],
          },
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
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['51%', '50%'],

            body: [
              [
                {
                  text: 'Section D | Leave and Medical Benefits',
                  style: 'tableHead',
                },

                {
                  text: '',
                  style: 'tableHead',
                },
              ],
              [
                [
                  {
                    text: `Types of Leave
                    (applicable if service is atleast 3 months)`,
                    border: [false, false, false, true],

                    style: 'tableBody',
                  },
                  {
                    ul: [
                      {
                        text: `Paid Annual Leave Per Year :                    ${
                          job.paid_annual_leave_per_year ? job.paid_annual_leave_per_year : ''
                        }
      (For 1st Year of Service)`,
                        style: 'bold',
                        listType: job.paid_annual_leave_per_year ? 'square' : 'circle',
                      },

                      {
                        text: `Paid OutPatient Sick Leave Per Year :     ${
                          job.paid_outpatient_sick_leave_per_year
                            ? job.paid_outpatient_sick_leave_per_year
                            : ''
                        }
      (after 6months of service)`,
                        listType: job.paid_outpatient_sick_leave_per_year ? 'square' : 'circle',
                      },
                      {
                        text: `Paid Hospitalisation Leave Per Year :      ${
                          job.paid_hospitalisation_leave_per_year
                            ? job.paid_hospitalisation_leave_per_year
                            : ''
                        }days
      (Note that paid hospitalisation per year is inclusive of paid outpatient sick leave. Leave entitlement for part-time employees may be pro-rated based on hours.)`,
                        listType: job.paid_hospitalisation_leave_per_year ? 'square' : 'circle',
                      },
                    ],
                    border: [false, false, false, true],
                    style: 'tableBody',
                  },
                ],
                [
                  {
                    text: `Other Types of Leave 
                    (e.g Paid Maternity Leave ) 
                    ${job.other_type_of_leave ? job.other_type_of_leave : ''}
                    `,
                    border: [false, false, false, true],
                    style: 'tableBody',
                    fillColor: '#f5f5f5',
                  },

                  {
                    ul: [
                      {
                        text: `Paid medical examination fee   ${
                          job.paid_medical_examination_fee ? job.paid_medical_examination_fee : ''
                        }`,
                        border: [false, false, false, true],
                        style: 'tableBody',
                        fillColor: '#f5f5f5',
                        listType: job.paid_medical_examination_fee ? 'square' : 'circle',
                      },
                    ],
                  },

                  {
                    text: `  Other Medical Benifits(optional, to specify) 
                  ${job.other_medical_benefits ? job.other_medical_benefits : ''}
                  `,
                    border: [false, false, false, true],
                    style: 'tableBody',
                    fillColor: '#f5f5f5',
                  },
                ],
              ],
            ],
          },
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
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['51%', '50%'],

            body: [
              [
                {
                  text: 'Section E | Others',
                  style: 'tableHead',
                },
                {
                  text: '',
                  style: 'tableHead',
                },
              ],
              [
                {
                  text: `Length Of Probation: ${
                    job.length_of_probation ? job.length_of_probation : ''
                  }\n
                    Probation Start Date: ${
                      job.probation_start_date ? job.probation_start_date : ''
                    }\n
                    Probation End Date:${job.probation_end_date ? job.probation_end_date : ''}`,
                  border: [false, false, false, true],
                  style: 'tableBody',
                },

                {
                  text: `Notice Period for Termination of Employment
                   (initiated by either party whereby the length shall be the same)`,
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  style: 'tableBody',
                },
              ],
            ],
          },
        },

        {
          width: '100%',
          alignment: 'center',
          text: '',
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
          margin: [20, 5, 0, 5],
          alignment: 'left',
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
        Print KET
      </Button>
    </>
  );
};

export default PdfKET;
