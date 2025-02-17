// import React,{useState} from 'react'
// import {Modal,ModalHeader,ModalBody,FormGroup } from 'reactstrap';
// import PropTypes from 'prop-types'
// import * as Icon from 'react-feather';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2'
// import message from '../Message';
// import api from '../../constants/api';
// import EditLineItemModal from './EditLineItemModal';


// const ViewLineItemModal = ({viewLineModal,setViewLineModal,FechedlineItem}) => 
// {

//     ViewLineItemModal.propTypes = {
//         viewLineModal: PropTypes.bool,
//         setViewLineModal: PropTypes.func,
//         FechedlineItem: PropTypes.object,     
// }

//     const [lineItem, setLineItem] = useState(null);
//     const [editLineModal, setEditLineModal] = useState(false);
//     const [editLineModelItem, setEditLineModelItem] = useState(null)

//   // Get Line Item 
//   const getLineItem = (quotationId) => {
//     api.post('/tender/getQuoteLineItemsById',{quote_id:quotationId})
//     .then((res)=> {
//         setLineItem(res.data.data)
//         console.log(res)
//         setViewLineModal(true);
//     }).catch(()=>{
//       message("Line Items not found","info")
//     })
//   }


//     const deleteRecord = (quoteItemsId) => {
          
//         Swal.fire({
//           title: `Are you sure? `,
//           text: "You won't be able to revert this!",
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//           confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//           if (result.isConfirmed) {
//             api.post('tender/deleteQuoteItems',{quote_items_id:quoteItemsId}).then((res)=>{
//               console.log(res)
//               Swal.fire(
//                 'Deleted!',
//                 'Quote has been deleted.',
//                 'success'
//               )
//               setViewLineModal(false)
//             }).catch(()=>{
//               message("Unable to Delete line Item","info")
//             })
//           }
//         })
  
//       }

//       React.useEffect(() => {
//         setLineItem(FechedlineItem)
//        }, [FechedlineItem])

//   return (
//     <>

//     <Modal isOpen={viewLineModal} >
//         <ModalHeader>Line Items</ModalHeader>
//         <ModalBody>
//             <FormGroup>
//             <table className='lineitem'>
                
//                 <thead>
//                 <tr>
//                     <th scope="col">Title	</th>
//                     <th scope="col">Description	</th>
//                     <th scope="col">Qty</th>
//                     <th scope="col">Unit Price</th>
//                     <th scope="col">Amount</th>
//                     <th scope="col">Updated By</th>
//                     <th scope="col">Action</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {lineItem && lineItem.map((e)=>{
//                     return(
//                     <tr>
//                         <td data-label="Title">{e.title}</td>
//                         <td data-label="Description">{e.description}</td>
//                         <td data-label="Qty">{e.quantity}</td>
//                         <td data-label="Unit Price">{e.unit_price}</td>
//                         <td data-label="Amount">{e.amount}</td>
//                         <td data-label="Updated By">{e.created_by}</td>
//                         <td data-label="Action">
//                         <Link to=""><span onClick={()=>{
//                             setLineItem(e)
//                             setEditLineModal(true)
//                             }}><Icon.Edit2 /></span></Link>
//                         <Link to=""><span onClick={()=>{deleteRecord(e.quote_items_id)}}><Icon.Trash2 /></span></Link>
//                         </td>
//                     </tr>
//                     )
                    
//                 })}
                
//                 </tbody>
//             </table>

//             <EditLineItemModal editLineModal={editLineModal} setEditLineModal={setEditLineModal} FetchLineItemData={editLineModelItem}></EditLineItemModal>
//             </FormGroup>
//         </ModalBody>
//     </Modal>
//     </>
//   )
// }

// export default ViewLineItemModal