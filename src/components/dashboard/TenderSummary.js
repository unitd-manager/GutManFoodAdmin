import React, { useEffect, useState } from 'react';
import CommonTable from "../CommonTable";
import api from "../../constants/api";

const TenderSummary = () => {

  const [tenders, setTenders] = useState();

  useEffect(() => {
    api.get('/tender/getTenders').then((res) => {
      setTenders(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const columns = [
    {
      name: "Quot Ref No",
      selector: "opportunity_id",
      grow: 0,
      wrap: true,
    },
    {
      name: "Desc",
      selector: "company_name",
      grow: 0,
      width: "auto",
      button: true,
      sortable: false,
    },
    {
      name: "Main Con",
      selector: "delete",
      grow: 0,
      width: "auto",
      wrap: true,
    },
    {
      name: "Contact",
      selector: "opportunity_code",
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: "Submission Date",
      selector: "title",
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "Bid Amount",
      selector: "company_name",
      sortable: true,
      grow: 0,
    },
    {
      name: "Bid Amount R",
      selector: "contact_name",
      sortable: true,
      width: "auto",
      grow: 3,
    },
    {
      name: "Bid Amount R1",
      selector: "category",
      sortable: true,
      grow: 2,
      width: "auto",
    },
    {
      name: "Submitted",
      selector: "status",
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "Awarded",
      selector: "status",
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "Price Submitted",
      selector: "status",
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "Remarks",
      selector: "status",
      sortable: true,
      grow: 2,
      wrap: true,
    },
  ];

  return (
    <>
      <CommonTable title="Tender Summary">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
          {tenders &&
                tenders.map((element) => {
                  return (
                    <tr key={element.opportunity_id}>
                      <td>{element.quote_ref}</td>
                      <td>{element.title}</td>
                      <td>{element.company_name}</td>
                      <td>{element.contact_name}</td>
                      <td>{element.actual_submission_date}</td>
                      <td>{element.price}</td>
                      <td>{element.pricing_done_by_acmv}</td>
                      <td>{element.pricing_done_by_elec}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
          </tbody>
      </CommonTable>

      <CommonTable title="Project Summary">
        <thead>
          <tr>
            {columns.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody><tr>
              <td>1</td>
              <td className="projectCode bold">09599</td>
              <td>Apple software</td>
              <td>testingFinance (Awarded Cost : )</td>
              <td>Project</td>
              <td>11-02-2023</td>
              <td></td>
              <td>WIP</td>
              <td align="right">0%</td>
              <td>0View</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td className="costingDetailsMain" colSpan="7">
                <div className="costingDetails mt5">
                  <table className="paymentDetails">
                    <tbody>
                      <tr bgcolor="#dddddd">
                        <td bgcolor="#ffffff">
                          <b>Profit :44119241.00(97.80%)</b>
                        </td>
                        <td>Total Material</td>
                        <td className="productTitle">Transport Charges</td>
                        <td className="poAmt">Total Labour Charges</td>
                        <td>Salesman Commission</td>
                        <td>Finance Charges</td>
                        <td>Office Overheads</td>
                        <td>Other Charges</td>
                        <td>TOTAL COST</td>
                      </tr>

                      <tr>
                        <td bgcolor="#dddddd">Projected</td>
                        <td align="right">0.00</td>
                        <td align="right" className="productTitle">
                          500.00
                        </td>
                        <td align="right">990,000.00 </td>
                        <td align="right">70.00</td>
                        <td align="right">400.00</td>
                        <td align="right">400.00</td>
                        <td align="right">500.00</td>
                        <td align="right">991,870.00</td>
                      </tr>
                      <tr></tr>
                      <tr>
                        <td bgcolor="#dddddd">Actual</td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right" className="productTitle">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right"></td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                      </tr>
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td className="projectCode bold">09599</td>
              <td>Apple software</td>
              <td>testingFinance (Awarded Cost : )</td>
              <td>Project</td>
              <td>11-02-2023</td>
              <td></td>
              <td>WIP</td>
              <td align="right">0%</td>
              <td>0View</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td className="costingDetailsMain" colSpan="7">
                <div className="costingDetails mt5">
                  <table className="paymentDetails">
                    <tbody>
                      <tr bgcolor="#dddddd">
                        <td bgcolor="#ffffff">
                          <b>Profit :44119241.00(97.80%)</b>
                        </td>
                        <td>Total Material</td>
                        <td className="productTitle">Transport Charges</td>
                        <td className="poAmt">Total Labour Charges</td>
                        <td>Salesman Commission</td>
                        <td>Finance Charges</td>
                        <td>Office Overheads</td>
                        <td>Other Charges</td>
                        <td>TOTAL COST</td>
                      </tr>

                      <tr>
                        <td bgcolor="#dddddd">Projected</td>
                        <td align="right">0.00</td>
                        <td align="right" className="productTitle">
                          500.00
                        </td>
                        <td align="right">990,000.00 </td>
                        <td align="right">70.00</td>
                        <td align="right">400.00</td>
                        <td align="right">400.00</td>
                        <td align="right">500.00</td>
                        <td align="right">991,870.00</td>
                      </tr>
                      <tr></tr>
                      <tr>
                        <td bgcolor="#dddddd">Actual</td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right" className="productTitle">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right"></td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                        <td align="right">
                          <span className="float_left">
                            
                          </span>
                          0.00
                        </td>
                      </tr>
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr></tbody>
      </CommonTable>
    </>
  );
}

export default TenderSummary;