import { useEffect, useRef, useState } from 'react';
import JsPDF from 'jspdf';
import "jspdf-autotable";
import * as $ from  "jquery";
 import html2canvas from "html2canvas";
 import { useParams } from 'react-router-dom';
 import api from '../../constants/api';


function App() {
	const reportTemplateRef = useRef(null);
    const [quote,setQuote] = useState();

    const {id} = useParams()


    const getQuotePDF = () => {
        api.post('tender/getQuotePDF',{quote_id:id})
        .then((res)=>{
          console.log(res.data.data)
          setQuote(res.data.data)
        })
      }


      useEffect(() => {
          getQuotePDF();
      }, [])
      
  const handleDownloadPdf = async () => {

    const htmlWidth = $(".canvas_div_pdf").width();
		const htmlHeight = $(".canvas_div_pdf").height();
		const topLeftMargin = 15;
		const pdfWidth = htmlWidth+(topLeftMargin*2);
		const pdfHeight = (pdfWidth*1.5)+(topLeftMargin*2);
		const canvasImageWidth = htmlWidth;
		const canvasImageHeight = htmlHeight;
		
		const totalPDFPages = Math.ceil(htmlHeight/pdfHeight)-1;
        const pdf = new JsPDF('p', 'pt',  [pdfWidth, pdfHeight]);


		html2canvas($(".canvas_div_pdf")[0],{allowTaint:true}).then((canvas) => {
			canvas.getContext('2d');
			
			console.log(canvas.height+canvas.width);
			
			
			const imgData = canvas.toDataURL("image/jpeg", 1.0);
            // var pdf = new jsPDF('p','mm',[297, 210]);

		    pdf.addImage(imgData, 'JPG', topLeftMargin, topLeftMargin,canvasImageWidth,canvasImageHeight);
			
			
			for (let i = 1; i <= totalPDFPages; i++) { 
				pdf.addPage(pdfWidth, pdfHeight);
				pdf.addImage(imgData, 'JPG', topLeftMargin, -(pdfHeight*i)+(topLeftMargin*4),canvasImageWidth,canvasImageHeight);
			}
			
		    pdf.save("Print-Link.pdf");
        });
  };

	return (
		<div>
			<button type='button' className="button" onClick={handleDownloadPdf}>
				Generate PDF
			</button>
			<div id="pdf" className='canvas_div_pdf' ref={reportTemplateRef}>
        {/* <div className='container'>
        <div className="page"> */}
        


            <div className="page-content container">

                <div className="text-blue-d2">
                
                    <div className="row">
                                <div className="col-12">
                                    <div className="text-center text-150">
                                        {/* <span className="text-default-d3">Cubosale Pte Ltd</span> */}
                                        <img src='/static/media/logo.9e5dbf9f.jpg' alt="Logo"/>
                                    </div>
                                </div>
                            </div>

                    <div className="page-tools">

                            
                        {/* <div className="action-buttons">
                            <a className="btn bg-white btn-light mx-1px text-95" href="#" data-title="Print">
                                <i className="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                                Print
                            </a>
                            <a className="btn bg-white btn-light mx-1px text-95" href="#" data-title="PDF">
                                <i className="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                                Export
                            </a>
                        </div> */}
                    </div>
                </div>

                <div className="page-header text-blue-d2">
                    <p className="text-sm text-grey-m2 ">
                        <p className='text-sm text-grey-m2'>Reg No:
                            <small className="page-info">
                                <i className="fa fa-angle-double-right text-80"></i>
                                    201526293M 
                            </small>
                        </p>
                    </p>


                    <div className="row">
                                <div className="col-12">
                                    <div className="text-center ">
                                        {/* <i className="fa fa-book fa-2x text-success-m2 mr-1"></i> */}
                                        <span className="text-default-d3">QUOTATION</span>
                                    </div>
                                </div>
                            </div>

                    <div className="page-tools d-flex ">

                        <div className="text-grey-m2 justify-content-end">
                            <div className="my-1">
                                10 Jalan Besar, #15-02 Sim Lim Tower,
                            </div>
                            <div className="my-1">
                                Singapore - 208787,
                            </div>
                            <div className="my-1">
                                Email:arif@usoftsolutions.com
                            </div>
                            {/* <div className="my-1"><i className="fa fa-phone fa-flip-horizontal text-secondary"></i> <b className="text-600">111-111-111</b></div> */}
                        </div>
                            
                        {/* <div className="action-buttons">
                            <a className="btn bg-white btn-light mx-1px text-95" href="#" data-title="Print">
                                <i className="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                                Print
                            </a>
                            <a className="btn bg-white btn-light mx-1px text-95" href="#" data-title="PDF">
                                <i className="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                                Export
                            </a>
                        </div> */}
                    </div>
                </div>



                <div className="container px-0">
                    <div className="row mt-4">
                        <div className="col-12 col-lg-12">
                            
                            {/* <hr className="row brc-default-l1 mx-n1 mb-4" /> */}

                            <div className="row">
                                <div className="col-sm-6">
                                    <div>
                                        <span className="text-sm text-grey-m2 align-middle">To:</span>
                                        {/* <span className="text-600 text-110 text-blue align-middle">Alex Doe</span> */}
                                    </div>
                                    <div className="text-grey-m2 ">
                                        <div className="my-1"> {quote && quote[0].company_name}</div>
                                        <div className="my-1"> {quote && quote[0].billing_address_flat}</div>
                                        <div className="my-1"> {quote && quote[0].billing_address_street}</div>
                                        {/* {`/pdf/${quote.quote_id}`} */}
                                        <div className="my-1"> {` ${quote && quote[0].billing_address_country && quote[0].billing_address_po_code} `}</div>
                                        <div className="my-1"> {quote && quote[0].email}</div>
                                        <div className="my-1"> oncompany.com</div>

                                        {/* <div className="my-1"><i className="fa fa-phone fa-flip-horizontal text-secondary"></i> <b className="text-600">111-111-111</b></div> */}
                                    </div>
                                </div>
                            

                                <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                    <hr className="d-sm-none" />
                                    <div className="text-grey-m2">
                                        <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                            Date : {quote && quote[0].quote_date.substring(1,10)}
                                        </div>
                                        <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                            {quote && quote[0].quote_code}
                                        </div>

                                        {/* <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">ID:</span> #111-222</div>

                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Issue Date:</span> Oct 12, 2019</div>

                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Status:</span> <span className="badge badge-warning badge-pill px-25">Unpaid</span></div> */}
                                    </div>
                                </div>
                            
                            </div>

                            <div className="row mt-5">
                                <div className="col-12">
                                    <div className="text-grey-m2 ">
                                        <div className="my-1"><b> {quote && quote[0].salutation && quote[0].first_name} </b></div>
                                        <div className="my-1 mt-3"><b>Project:-</b> {quote && quote[0].project_reference}</div>
                                        <div className="my-1"> Dear Sir,</div>
                                        <div className="my-1 mt-3"> With reference to the above captions, we would like to thank you for inviting us to quote for the above mentioned works and we are
pleased to submit herewith our Value Quotation for you kind persual.
</div>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-4">
                                <div className="row text-600 text-white bgc-default-tp1 py-25">
                                    <div className="d-none d-sm-block col-1">Sn</div>
                                    <div className="col-9 col-sm-3">Description</div>
                                    <div className="d-none d-sm-block col-4 col-sm-1">EA</div>
                                    <div className="d-none d-sm-block col-sm-1">Qty</div>
                                    <div className="d-none d-sm-block col-sm-2">U/R(S$)</div>
                                    <div className="d-none d-sm-block col-sm-2">Amt(S$)</div>
                                    <div className="col-2">Remarks</div>
                                </div>

                                <div className="text-95 text-secondary-d3">
                                    <div className="row mb-2 mb-sm-0 py-25">


{/* 
                                    {company && company.map((e)=>{
                              return  <option key={e.company_id} value={e.company_id} >{e.company_name}</option>

                          })} */}


                                        {quote && quote.map((e)=>{
                                            return( <>
                                                    <div className="d-none d-sm-block col-1">{e.id}</div>
                                                    <div className="col-9 col-sm-3">{e.quote_item_title}
                                                    <p>{e.description}</p>
                                                    </div>
                                                    <div className="d-none d-sm-block col-4 col-sm-1">{e.unit}</div>
                                                    <div className="d-none d-sm-block col-sm-1">{e.quantity}</div>
                                                    <div className="d-none d-sm-block col-sm-2">{e.unit_price}</div>
                                                    <div className="d-none d-sm-block col-sm-2">{e.amount}</div>
                                                    <div className="col-2"></div>
                                                </>
                                            )
                                        })}
                                        
                                    </div>
{/* 
                                    <div className="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                                        <div className="d-none d-sm-block col-1">2</div>
                                        <div className="col-9 col-sm-3">Web hosting</div>
                                        <div className="d-none d-sm-block col-4 col-sm-1"></div>
                                        <div className="d-none d-sm-block col-sm-1">1</div>
                                        <div className="d-none d-sm-block col-sm-2">$15</div>
                                        <div className="col-2 text-secondary-d2">$15</div>
                                        <div className="col-2"></div>
                                    </div>

                                    <div className="row mb-2 mb-sm-0 py-25">
                                        <div className="d-none d-sm-block col-1">3</div>
                                        <div className="col-9 col-sm-3">Software development</div>
                                        <div className="d-none d-sm-block col-4 col-sm-1"></div>
                                        <div className="d-none d-sm-block col-sm-1">--</div>
                                        <div className="d-none d-sm-block col-sm-2">$1,000</div>
                                        <div className="d-none d-sm-block col-sm-2">$1,000</div>
                                        <div className="col-2"></div>
                                    </div>

                                    <div className="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                                        <div className="d-none d-sm-block col-1">4</div>
                                        <div className="col-9 col-sm-3">Consulting</div>
                                        <div className="d-none d-sm-block col-4 col-sm-1"></div>
                                        <div className="d-none d-sm-block col-sm-1">1 Year</div>
                                        <div className="d-none d-sm-block col-sm-2">$500</div>
                                        <div className="d-none d-sm-block col-sm-2">$500</div>
                                        <div className="col-2"></div>
                                    </div> */}

                                </div>

                                <div className="row border-b-2 brc-default-l2"></div>

                            
                        {/* <div className="table-responsive">
                            <table className="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                                <thead className="bg-none bgc-default-tp1">
                                    <tr className="text-white">
                                        <th className="opacity-2">#</th>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        <th>Unit Price</th>
                                        <th width="140">Amount</th>
                                    </tr>
                                </thead>

                                <tbody className="text-95 text-secondary-d3">
                                    <tr></tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Domain registration</td>
                                        <td>2</td>
                                        <td className="text-95">$10</td>
                                        <td className="text-secondary-d2">$20</td>
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                     */}

                                <div className="row mt-3">
                                    <div className="col-12 col-sm-6 text-grey-m2 text-95 mt-2 mt-lg-0">
                                   
                                    </div>

                                    <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                                        <div className="row my-2">
                                            <div className="col-5 text-right">
                                                SubTotal
                                            </div>
                                            <div className="col-6">
                                                <span className="text-120 text-secondary-d1">$2,250</span>
                                            </div>
                                        </div>

                                        <div className="row my-2">
                                            <div className="col-5 text-right">
                                                Tax (10%)
                                            </div>
                                            <div className="col-6">
                                                <span className="text-110 text-secondary-d1">$225</span>
                                            </div>
                                        </div>

                                        <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                            <div className="col-5 text-right">
                                                Total Amount
                                            </div>
                                            <div className="col-6">
                                                <span className="text-150 text-success-d3 opacity-2">{quote && quote.total_amount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12 col-sm-6 text-grey-m2 text-95 mt-2 mt-lg-0"> TOTAL : ONE THOUSAND SEVEN HUNDRED SEVEN ONLY </div>
                                <span className="text-secondary-d1 text-105">Terms and Condition:-</span>
                                <hr />

                                {/* <div>
                                    <span className="text-secondary-d1 text-105">Thank you for your business</span>
                                    <a href="#" className="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0">Pay Now</a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


    </div> 
    </div>
		// 	</div>
		// </div>
	);
}

export default App;



