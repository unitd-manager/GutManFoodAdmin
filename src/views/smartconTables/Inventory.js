import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Input, Button,Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import readXlsxFile from 'read-excel-file';
import api from '../../constants/api';
import message from '../../components/Message';
//import { columns } from '../../data/Tender/InventoryData';
import ViewAdjustStockHistoryModal from '../../components/Inventory/ViewAdjustStockHistoryModal';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';


function Inventory() {
  //statevariables
  const [stockinputOpen, setStockinputOpen] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [adjustStockHistoryModal, setAdjustStockHistoryModal] = useState(false);
  const [stockChangeId, setStockChangeId] = useState();
  const [inventoryStock, setInventoryStock] = useState({
    inventory_id: null,
    stock: null,
  });
  const [loading, setLoading] = useState(false)

  const [adjuststockDetails, setAdjuststockDetails] = useState({
    inventory_id: null,
    product_id: null,
    adjust_stock: 0,
    modified_by: '',
    created_by: '',
    current_stock: null,
  });
  //navigate
  const navigate = useNavigate();
  //Arabic
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'

  const getArabicInventory = () => {
    api
    .get('/inventory/getTranslationForInventory')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

console.log('arabic',arabic,genLabel)
useEffect(() => {
  getArabicInventory();
}, []);


// Get All inventories
  const getAllinventories = () => {
    setLoading(false)
    api
      .get('/inventory/getinventoryMain')
      .then((res) => {
        setLoading(false)
        setInventories(res.data.data);
       
      })
      .catch(() => {
        message('Inventory Data Not Found', 'info');
        setLoading(false)
      });
  };
  //handle change
  const handleStockinput = (e, element) => {
    setInventoryStock({
      inventory_id: element.inventory_id,
      stock: e.target.value,
    });
    inventoryStock.inventory_id = element.inventory_id;
    inventoryStock.stock = e.target.value;
    // setActualStock({[e.target.name]:e.target.value});
    const adjustStock = parseFloat(inventoryStock.stock) - parseFloat(element.stock);

    setAdjuststockDetails({
      inventory_id: element.inventory_id,
      product_id: element.productId,
      adjust_stock: adjustStock,
      modified_by: '',
      created_by: '',
      current_stock: element.stock,
    });
  };
  //adjust stock
  const adjuststock = () => {
  
    api
      .post('/inventory/insertadjust_stock_log', adjuststockDetails)
      .then(() => {
        message('Stock updated successfully', 'success');
        getAllinventories();
        navigate('/inventory');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //update stock
  const updateStockinInventory = () => {
    api
      .post('/inventory/updateInventoryStock', inventoryStock)
      .then(() => {
        message('Stock updated successfully', 'success');
        getAllinventories();
        navigate('/inventory');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

   // TRIGGER TO IMPORT EXCEL SHEET
   const importExcel = () => {
    $('#import_excel').trigger('click');
  }

  // UPLOAD FILE ON THER SERVER
  const uploadOnServer = (arr) => {
      api.post('/inventory/import/excel', {data: JSON.stringify(arr)})
      .then(() => {
        message('File uploaded successfully', 'success');
        $('#upload_file').val(null);
      })
      .catch(() => {
        message('Failed to upload.', 'error');
      });
  }

  // PROCESSING AND FORMATTING THE DATA
  const processData = (rows) => {
    const arr = [];
    rows.shift();

    for ( let x = 0; x < rows.length; x++ ) {
      arr.push(
        {
          ProductCode: rows[x][0],
          ProductName: rows[x][1],
          Description: rows[x][2],
          Price: rows[x][3],
          Unit: rows[x][4],
          Category: rows[x][5],
          Stock: rows[x][6]
         
        }
      )
    }

    uploadOnServer(arr);
  }

  // IMPORTING EXCEL FILE
  const importExcelFile = (e) => {
    console.log(e.target.id)
    message('test1', 'success');
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.readyState)
      if (reader.readyState === 2) {
        readXlsxFile(e.target.files[0])
          .then((rows) => {
            processData(rows);
            message('Uploading File On The Server', 'info');
          })
          .finally(() => {
            $('#upload_file').val(null);
          }).catch(
            err => console.log(err)
          );
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'print',
            text: 'Print',
            className: 'shadow-none btn btn-primary',
          },
        ],
        searching: true,
      });
    }, 1000);
  }, []);
  useEffect(() => {
    getAllinventories();
  }, []);

  const columns = [
    {
      id:1,
      name: "#",
      selector: "id",
      sortable: true,
      grow: 0,
      width: 'auto',
    },
    {
      id:2,
      name: "",
      selector:'Edit',
      sortable: true,
      grow: 0,
      width: 'auto',
      wrap: true
    },
   
    {
      id:3,
      name:'Inventory Code',
      selector: "code",
      sortable: true
    },
    {
      id:4,
      name:'Product Name', 
      selector: "code",
      sortable: true
    },
    {
      id:5,
      name: 'Product Type',
      selector: "project",
      sortable: true,
      cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      id:6,
      name: 'Item Code',
      selector: "ref",
      sortable: true
    },
    {
      id:7,
      name:'UOM',
      selector: "ref",
      sortable: true
    },
    {
      id:8,
      name:'Stock',
      selector: "ref",
      sortable: true
    },
    {
      id:9,
      name:'Adjust Stock',
      selector: "ref",
      sortable: true
    },
    {
      id:10,
      name: "",
      selector: "ref",
      sortable: true
    },
    {
      id:11,
      name: 'MOL',
      selector: "minimum_order_level",
      sortable: true
    },
  ];


  return (
    <div className="MainDiv">
      <ToastContainer></ToastContainer>
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable 
        loading={loading}
        title={arb ? 'قائمة الجرد': 'Inventory List'}
        module='Inventory'
        ImportButton={<>
        
          <Col md="4">
            {/* <Link to=""> */}
            <Button color="primary" className="shadow-none mr-2" onClick={() => importExcel()}>
                Import
              </Button>
            {/* </Link> */}
            <input type='file' style={{display: 'none'}} id="import_excel" onChange={importExcelFile} />
            </Col>
           
             
           </>
          }
          SampleButton={<>
            
             
                <Col md="4">
                <a href="https://gutmanfoodsadmin.unitdtechnologies.com/storage/excelsheets/Inventory.xlsx" download>
                 <Button color="primary" className="shadow-none mr-2" >
                   Sample
                 </Button>
                 </a>
                 </Col>
                
               </>
              }
          >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.id}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {inventories &&
              inventories.map((element) => {
                return (
                  <tr key={element.inventory_id}>
                    <td>{element.inventory_id}</td>
                    <td>
                      <Link to={`/inventoryEdit/${element.inventory_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.inventory_code} </td>
                    <td>{arb && element.product_name_arb ?element.product_name_arb : element.product_name}</td>
                    <td>{arb && element.product_type_arb ?element.product_type_arb : element.product_type}</td>
                    <td>{element.item_code}</td>
                    <td>{arb && element.unit_arb ?element.unit_arb : element.unit}</td>
                    <td>{arb && element.stock_arb ?element.stock_arb : element.stock}</td>
                    {stockinputOpen && stockChangeId === element.inventory_id ? (
                      <td>
                        {' '}
                        <Input
                          type="text"
                          defaultValue={element.stock}
                          onChange={(e) => handleStockinput(e, element)}
                        />
                        <Button color='primary' className='shadow-none'
                          onClick={() => {
                            adjuststock(element);
                            updateStockinInventory();
                            setStockinputOpen(false);
                          }}
                        >
                          save
                        </Button>
                      </td>
                    ) : (
                      <td>
                        <span
                          onClick={() => {
                            setStockChangeId(element.inventory_id);
                            setStockinputOpen(true);
                          }}
                        >
                          <Link to="">Adjust Stock</Link>
                        </span>
                      </td>
                    )}
                    <td>
                      <span
                        onClick={() => {
                          setAdjustStockHistoryModal(true);
                          setModalId(element.inventory_id);
                        }}
                      >
                       <Link to="">view</Link> 
                      </span>
                    </td>
                    <ViewAdjustStockHistoryModal
                      adjustStockHistoryModal={adjustStockHistoryModal}
                      setAdjustStockHistoryModal={setAdjustStockHistoryModal}
                      inventoryId={modalId}
                    />
                    <td>{arb && element.minimum_order_level_arb ?element.minimum_order_level_arb : element.minimum_order_level}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      
      </div>
     
    </div>
  );
}

export default Inventory;
