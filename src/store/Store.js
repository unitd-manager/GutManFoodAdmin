import { configureStore } from '@reduxjs/toolkit';
import NotesReducer from './apps/notes/NotesSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import ContactsReducer from './apps/contacts/ContactSlice';
import EmailReducer from './apps/email/EmailSlice';
import TicketReducer from './apps/ticket/TicketSlice';
import userReducer from './auth/userSlice';
import tenderReducer from './tender/tenderSlice';
import companyReducer from './tender/companySlice';
import contactReducer from './tender/contactSlice';
import costingSummaryReducer from './tender/costingSummarySlice';
import lineItemReducer from './tender/lineItemSlice';
import quoteReducer from './tender/quoteSlice';
import inventoryReducer from './inventory/inventorySlice';
import adjustStockReducer from './inventory/adjustStockSlice';
import productQtyReducer from './inventory/productQtySlice';
import productReducer from './product/productSlice';
import categoryReducer from './product/categorySlice';
import payrollManagementReducer from './payrollManagement/payrollManagementSlice';
import leaveHistoryReducer from './payrollManagement/annualLeaveSlice';
import employeeReducer from './employee/employeeSlice';
import tabPassTypeReducer from './employee/tabPassTypeSlice';
import tabPurchaseOrderLinkedReducer from './inventory/tabPurchaseOrderLinkedSlice';
import tabProjectLinkedReducer from './inventory/tabProjectLinkedSlice';
import educationalQualificationReducer from './employee/educationalQualificationSlice';
import contactInformationReducer from './employee/contactInformationSlice';
import emergencyContactReducer from './employee/emergencyContactSlice';
import jobInformationHistoryReducer from './employee/jobInformationHistorySlice';
import trainingLinkedReducer from './employee/trainingLinkedSlice';
import jobInformationReducer from './payrollManagement/jobInformationSlice';
import userGroupReducer from './userGroup/userGroupSlice';

export const store = configureStore({
  reducer: {
    user:userReducer,
    tender:tenderReducer,
    product:productReducer,
    category:categoryReducer,
    inventory:inventoryReducer,
    adjustStock:adjustStockReducer,
    productQty:productQtyReducer,
    employee:employeeReducer,
    tabPassType:tabPassTypeReducer,
    educationalQualification:educationalQualificationReducer,
    contactInformation:contactInformationReducer,
    emergencyContact:emergencyContactReducer,
    jobInformationHistory:jobInformationHistoryReducer,
    trainingLinked:trainingLinkedReducer,
    tabPurchaseOrderLinked:tabPurchaseOrderLinkedReducer,
    tabProjectLinked:tabProjectLinkedReducer,
    payrollManagement:payrollManagementReducer,
    leaveHistory:leaveHistoryReducer,
    jobInformation:jobInformationReducer,
    company:companyReducer,
    contact:contactReducer,
    costingSummary:costingSummaryReducer,
    lineItem:lineItemReducer,
    quote:quoteReducer,
    customizer: CustomizerReducer,
    notesReducer: NotesReducer,
    chatReducer: ChatsReducer,
    contactsReducer: ContactsReducer,
    emailReducer: EmailReducer,
    ticketReducer: TicketReducer,
    userGroup:userGroupReducer,
  },
});

export default store;
