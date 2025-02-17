import React from 'react';
import { useParams } from 'react-router-dom';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import api from '../../constants/api';
import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfTimeSheet = () => {
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  const [payroll, setPayroll] = React.useState();
  const [timesheet, setTimeSheet] = React.useState();

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
    // getDaysInMonth(getmonth,getyear)
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };
  // Gettind data from Job By Id
  const getTimeSheet = () => {
    api
      .post('/PayrollManagement/getpayrollmanagementById', { payroll_management_id: id })
      .then((res) => {
        setPayroll(res.data.data[0]);
      })
      .catch(() => {
        message('Payroll data Not Found', 'info');
      });
  };

  const getTimeSheetById = () => {
    api
      .post('/PayrollManagement/getTimeSheetPdfById', { employee_id: id })
      .then((res) => {
        setTimeSheet(res.data.data);
      })
      .catch(() => {
        message('Payroll data Not Found', 'info');
      });
  };

  React.useEffect(() => {
    //getPurchaseOrderId();
    getTimeSheet();
    getTimeSheetById();
  }, []);

  const GetPdf = () => {
    
    const timesheetItems = [
      [
        {
          text: 'Date',
          style: 'tableHead',
          border: [true, true, true, true],
        },
        {
          text: 'NH',
          border: [true, true, true, true],
          style: 'tableHead',
        },
        {
          text: 'OT',
          border: [true, true, true, true],
          style: 'tableHead',
        },
        {
          text: 'PH',
          border: [true, true, true, true],
          style: 'tableHead',
        },
      ],
    ];

    for (let i = 1; i <= 31; i++) {
      timesheet.forEach((element) => {
        const date = parseInt(element.date && element.date.slice(8, 10), 10);
        if (i === date) {
          timesheetItems.push([
            {
              text: `${i}`,
              border: [true, true, true, true],
              style: 'tableBody',
            },
            {
              text: `${element.employee_hours ? element.employee_hours : ''}`,
              style: 'tableBody',
              border: [true, true, true, true],
            },
            {
              text: `${element.employee_ot_hours ? element.employee_ot_hours : ''}`,
              style: 'tableBody',
              border: [true, true, true, true],
            },
            {
              text: `${element.employee_ph_hours ? element.employee_ph_hours : ''}`,
              style: 'tableBody',
              border: [true, true, true, true],
            },
          ]);
        } else {
          timesheetItems.push([
            {
              text: `${i}`,
              style: 'tableBody',
              border: [true, true, true, true],
            },
            {
              text: '',
              border: [true, true, true, true],
              style: 'tableBody',
            },
            {
              text: '',
              border: [true, true, true, true],
              style: 'tableBody',
            },
            {
              text: '',
              border: [true, true, true, true],
              style: 'tableBody',
            },
          ]);
        }
      });
    }

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
                  text: `~TIME SHEET~`,
                  alignment: 'center',
                  style: 'tableHead1',
                },
              ],
            ],
          },
        },
        '\n',

        {
          columns: [{}],
        },
        '\n',
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
            widths: ['104%', '41%'],

            body: [
              [
                [
                  {
                    text: ` Name:${payroll.employee_name ? payroll.employee_name : ''}`,
                    style: ['textSize'],
                  },
                ],
              ],
              [
                {
                  text: `Month & Year: ${payroll.generated_date ? payroll.generated_date : ''}`,
                  style: ['textSize'],
                },
              ],
              [
                {
                  text: `Fin No :${timesheet.fin_no ? timesheet.fin_no : ''}`,
                  style: ['textSize'],
                },
              ],
            ],
          },
        },
        {
          columns: [],
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
            widths: ['20%', '31%', '25%', '25%'],

            body: [
              [
                {
                  text: 'Basic Pay',
                  style: 'tableHead1',
                },
                {
                  text: 'Total Allowance',
                  style: 'tableHead1',
                },

                {
                  text: 'Total Deduction',
                  style: 'tableHead1',
                },
                {
                  text: 'Total Amount',
                  style: 'tableHead1',
                },
              ],

              [
                {
                  text: `${payroll.basic_pay ? payroll.basic_pay : ''}`,
                  style: 'tableBody1',
                  border: [false, false, false, true],
                },
                {
                  text: `${
                    payroll.total_basic_pay_for_month ? payroll.total_basic_pay_for_month : ''
                  }`,
                  border: [false, false, false, true],
                  style: 'tableBody1',
                },
                {
                  text: `${payroll.total_deductions ? payroll.total_deductions : ''}`,
                  border: [false, false, false, true],
                  style: 'tableBody1',
                },
                {
                  text: `${payroll.net_total ? payroll.net_total : ''}`,
                  border: [false, false, false, true],
                  style: 'tableBody1',
                },
              ],
            ],
          },
        },
        '\n\n',

        '\n',
        '\n',
        {
          style: 'tableExample',
          table: {
            body: [timesheetItems],
          },
        },

        '\n',
        '\n',
        {
          width: '100%',
          alignment: 'center',
          text: 'TIMESHEET CREATED',
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
          fontSize: 7.5,
          bold: 'true',
        },
        tableHead1: {
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
          fontSize: 7.5,
          bold: 'true',
        },
        tableBody1: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
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
        Print TimeSheet
      </Button>
    </>
  );
};

export default PdfTimeSheet;
