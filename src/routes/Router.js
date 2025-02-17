import { Route, Routes } from 'react-router-dom';
import React, { lazy } from 'react';
import Loadable from '../layouts/loader/Loadable';
import UserToken from '../components/UserToken';

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
/***** Pages ****/

// Modals
const EditCostingSummaryModal = Loadable(
  lazy(() => import('../components/Tender/EditCostingSummaryModal')),
);
const EnquiryTable = Loadable(lazy(() => import('../views/smartconTables/Enquiry')));
const EditQuoteModal = Loadable(lazy(() => import('../components/Tender/EditQuoteModal')));
const EditLineItemModal = Loadable(lazy(() => import('../components/Tender/EditLineItemModal')));
const PdfData = Loadable(lazy(() => import('../views/smartconTables/Tickets')));
const PdfNext = Loadable(lazy(() => import('../views/smartconTables/GeneratePdf')));
const TicketsComponent = Loadable(lazy(() => import('../views/smartconTables/TicketsComponent')));
const Classic = Loadable(lazy(() => import('../views/dashboards/Cubosale')));
const Crypto = Loadable(lazy(() => import('../views/dashboards/Crypto')));
const Ecommerce = Loadable(lazy(() => import('../views/dashboards/Ecommerce')));
const General = Loadable(lazy(() => import('../views/dashboards/General')));
const Extra = Loadable(lazy(() => import('../views/dashboards/Extra')));
const About = Loadable(lazy(() => import('../views/About')));

/***** Apps ****/

const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Chat = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/CalendarApp')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Shop = Loadable(lazy(() => import('../views/apps/ecommerce/Shop')));
const ShopDetail = Loadable(lazy(() => import('../views/apps/ecommerce/ShopDetail')));
const Treeview = Loadable(lazy(() => import('../views/apps/treeview/TreeView')));
const TicketList = Loadable(lazy(() => import('../views/apps/ticket/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/apps/ticket/TicketDetail')));

/***** Ui Elements ****/
const Alerts = Loadable(lazy(() => import('../views/ui/Alerts')));
const Badges = Loadable(lazy(() => import('../views/ui/Badges')));
const Buttons = Loadable(lazy(() => import('../views/ui/Buttons')));
const Cards = Loadable(lazy(() => import('../views/ui/Cards')));
const Grid = Loadable(lazy(() => import('../views/ui/Grid')));
const Tables = Loadable(lazy(() => import('../views/ui/Tables')));
const Forms = Loadable(lazy(() => import('../views/ui/Forms')));
const Breadcrumbs = Loadable(lazy(() => import('../views/ui/Breadcrumbs')));
const Dropdowns = Loadable(lazy(() => import('../views/ui/DropDown')));
const BtnGroup = Loadable(lazy(() => import('../views/ui/BtnGroup')));
const Collapse = Loadable(lazy(() => import('../views/ui/Collapse')));
const ListGroup = Loadable(lazy(() => import('../views/ui/ListGroup')));
const Modal = Loadable(lazy(() => import('../views/ui/Modal')));
const Navbar = Loadable(lazy(() => import('../views/ui/Navbar')));
const Nav = Loadable(lazy(() => import('../views/ui/Nav')));
const Pagination = Loadable(lazy(() => import('../views/ui/Pagination')));
const Popover = Loadable(lazy(() => import('../views/ui/Popover')));
const Progress = Loadable(lazy(() => import('../views/ui/Progress')));
const Spinner = Loadable(lazy(() => import('../views/ui/Spinner')));
const Tabs = Loadable(lazy(() => import('../views/ui/Tabs')));
const Toasts = Loadable(lazy(() => import('../views/ui/Toasts')));
const Tooltip = Loadable(lazy(() => import('../views/ui/Tooltip')));

/***** Form Layout Pages ****/
const FormBasic = Loadable(lazy(() => import('../views/form-layouts/FormBasic')));
const FormGrid = Loadable(lazy(() => import('../views/form-layouts/FormGrid')));
const FormGroup = Loadable(lazy(() => import('../views/form-layouts/FormGroup')));
const FormInput = Loadable(lazy(() => import('../views/form-layouts/FormInput')));

/***** Form Pickers Pages ****/
const Datepicker = Loadable(lazy(() => import('../views/form-pickers/DateTimePicker')));
const TagSelect = Loadable(lazy(() => import('../views/form-pickers/TagSelect')));

/***** Form Validation Pages ****/
const FormValidate = Loadable(lazy(() => import('../views/form-validation/FormValidation')));
const FormSteps = Loadable(lazy(() => import('../views/form-steps/Steps')));
const FormEditor = Loadable(lazy(() => import('../views/form-editor/FormEditor')));
/***** Table Pages ****/
const Basictable = Loadable(lazy(() => import('../views/tables/TableBasic')));
const CustomReactTable = Loadable(lazy(() => import('../views/tables/CustomReactTable')));
const ReactBootstrapTable = Loadable(lazy(() => import('../views/tables/ReactBootstrapTable')));

/***** Chart Pages ****/
const ApexCharts = Loadable(lazy(() => import('../views/charts/ApexCharts')));
const ChartJs = Loadable(lazy(() => import('../views/charts/ChartJs')));

/***** Sample Pages ****/
const StarterKit = Loadable(lazy(() => import('../views/sample-pages/StarterKit')));
const Profile = Loadable(lazy(() => import('../views/sample-pages/Profile')));
const Gallery = Loadable(lazy(() => import('../views/sample-pages/Gallery')));
const SearchResult = Loadable(lazy(() => import('../views/sample-pages/SearchResult')));
const HelperClass = Loadable(lazy(() => import('../views/sample-pages/HelperClass')));

/***** Icon Pages ****/
const Bootstrap = Loadable(lazy(() => import('../views/icons/Bootstrap')));
const Feather = Loadable(lazy(() => import('../views/icons/Feather')));

/***** Map Pages ****/
const CustomVectorMap = Loadable(lazy(() => import('../views/maps/CustomVectorMap')));

/***** Widget Pages ****/
const Widget = Loadable(lazy(() => import('../views/widget/Widget')));

/***** CASL Access Control ****/
const CASL = Loadable(lazy(() => import('../views/apps/accessControlCASL/AccessControl')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));
const Reports = Loadable(lazy(() => import('../views/cubosale/Reports')));

const AddProjects = Loadable(lazy(() => import('../views/cubosale/AddProjects')));
const EditProject = Loadable(lazy(() => import('../views/cubosale/EditProject')));

// Tender
const StaffTable = Loadable(lazy(() => import('../views/smartconTables/Staff')));
const TaskTable = Loadable(lazy(() => import('../views/smartconTables/Task')));
const ProductTable = Loadable(lazy(() => import('../views/smartconTables/product')));
const TestTable = Loadable(lazy(() => import('../views/smartconTables/Test')));
const EmployeetrainingreportsTable = Loadable(lazy(() => import('../views/smartconTables/Employeetrainingreports')));
const StatementofAccountsReport = Loadable(lazy(() => import('../views/Reports/StatementofAccountsReport')));
const AgingReportsTable = Loadable(lazy(() => import('../views/smartconTables/AgingReports')));
const InvoiceByMonth = Loadable(lazy(() => import('../views/smartconTables/InvoiceByMonth')));
const EmployeeSalaryReport = Loadable(lazy(() => import('../views/smartconTables/EmployeeSalaryReport')));
const PayslipGeneratedReports = Loadable(lazy(() => import('../views/smartconTables/PayslipGeneratedReports')));
const IR8AReport = Loadable(lazy(() => import('../views/smartconTables/IR8AReport')));
const Blog = Loadable(lazy(() => import('../views/smartconTables/Blog')));
const Inventory = Loadable(lazy(() => import('../views/smartconTables/Inventory')));
// Details Table
const ProductDetailsTable = Loadable(lazy(() => import('../views/detailTable/ProductDetails')));

// Finance Admin
const FinanceTable = Loadable(lazy(() => import('../views/smartconTables/Orders')));

// PayrollHR

// Admin

const Content = Loadable(lazy(() => import('../views/smartconTables/Content')));
const Customer = Loadable(lazy(() => import('../views/smartconTables/Customer')));
const ContentDetailsTable = Loadable(lazy(() => import('../views/detailTable/ContentDetails')));
const CustomerDetailsTable = Loadable(lazy(() => import('../views/detailTable/CustomerDetails')));
const SubCategoryTable = Loadable(lazy(() => import('../views/smartconTables/SubCategory')));
const BlogDetailsTable = Loadable(lazy(() => import('../views/detailTable/BlogDetails')));
const SupplierDetailsTable = Loadable(lazy(() => import('../views/detailTable/SupplierDetails')));


const SubCategoryDetailsTable = Loadable(
  lazy(() => import('../views/detailTable/SubCategoryDetails')),
);
const SupplierTable = Loadable(lazy(() => import('../views/smartconTables/Supplier')));
const ValuelistTable = Loadable(lazy(() => import('../views/smartconTables/Valuelist')));
const ValuelistDetailsTable = Loadable(lazy(() => import('../views/detailTable/ValuelistDetails')));
const PurchaseOrderDetailTable = Loadable(lazy(() => import('../views/detailTable/PurchaseOrderDetail')));
const SettingTable = Loadable(lazy(() => import('../views/smartconTables/Setting')));
const Section = Loadable(lazy(() => import('../views/smartconTables/Section')));
const SectionDetails = Loadable(lazy(() => import('../views/detailTable/SectionDetails')));
const SettingDetails = Loadable(lazy(() => import('../views/detailTable/SettingDetails')));
const CategoryTable = Loadable(lazy(() => import('../views/smartconTables/Category')));
const CategoryDetails = Loadable(lazy(() => import('../views/detailTable/CategoryDetails')));
const UserGroupTable = Loadable(lazy(() => import('../views/smartconTables/UserGroup')));
const UserGroupDetails = Loadable(lazy(() => import('../views/detailTable/UserGroupDetails')));
const Support = Loadable(lazy(() => import('../views/smartconTables/Support')));
const StaffDetails = Loadable(lazy(() => import('../views/detailTable/StaffDetails')));
const PurchaseOrderEdit = Loadable(lazy(() => import('../views/EditData/PurchaseOrderEdit')));
//SupplierModal

const SupportDetails = Loadable(lazy(() => import('../views/detailTable/SupportDetails')));

// Table Edit's

const ProductEdit = Loadable(lazy(() => import('../views/EditData/ProductEdit')));
const StaffEdit = Loadable(lazy(() => import('../views/EditData/StaffEdit')));
const OrdersEdit = Loadable(lazy(() => import('../views/EditData/OrdersEdit')));
const ContentEdit = Loadable(lazy(() => import('../views/EditData/ContentEdit')));
const CustomerEdit = Loadable(lazy(() => import('../views/EditData/CustomerEdit')));
const SectionEdit = Loadable(lazy(() => import('../views/EditData/SectionEdit')));
const Login = Loadable(lazy(() => import('../views/detailTable/Login')));
const ValueListEdit = Loadable(lazy(() => import('../views/EditData/ValueListEdit')));
const SubCategoryEdit = Loadable(lazy(() => import('../views/EditData/SubCategoryEdit')));
const CategoryEdit = Loadable(lazy(() => import('../views/EditData/CategoryEdit')));
const SupportEdit = Loadable(lazy(() => import('../views/EditData/SupportEdit')));
const SettingEdit = Loadable(lazy(() => import('../views/EditData/SettingEdit')));
const UserGroupEdit = Loadable(lazy(() => import('../views/EditData/UserGroupEdit')));
const BlogEdit = Loadable(lazy(() => import('../views/EditData/BlogEdit')));
const EnquiryEdit = Loadable(lazy(() => import('../views/EditData/EnquiryEdit')));
const EnquiryDetailsTable = Loadable(
  lazy(() => import('../views/detailTable/EnquiryDetails')),
);
const InventoryEdit = Loadable(lazy(() => import('../views/EditData/InventoryEdit')));
const SupplierEdit = Loadable(lazy(() => import('../views/EditData/SupplierEdit')));
//Reports
const ProjectReportTable = Loadable(lazy(() => import('../views/Reports/ProjectReport')));
const OverallSalesReportTable = Loadable(lazy(() => import('../views/Reports/OverAllSalesSummaryReport')));
const InvoiceByYearTable = Loadable(lazy(() => import('../views/Reports/InvoiceByYear')));
// const TaskEdit= Loadable(lazy(() => import ('..')))
const PurchaseOrderTable = Loadable(lazy(() => import('../views/smartconTables/PurchaseOrder')));
const SupportNewTable = Loadable(lazy(() => import('../views/smartconTables/SupportNew')));

//Reports
const CpfSummaryReports=Loadable(lazy(() => import('../views/smartconTables/CpfSummaryReports')))
const PurchaseGstReport=Loadable(lazy(() => import('../views/smartconTables/PurchaseGstReport')))

const Routernew = () => {
  const { token, setToken } = UserToken();

  if (!token) {
    return <LoginFormik setToken={setToken} />;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<FullLayout></FullLayout>}>
          {/* Tendar Modal */}
          <Route
            path="/editcostingsummary"
            name="editcostingsummary"
            element={<EditCostingSummaryModal />}
          ></Route>
          <Route path="/editquote" name="editquote" element={<EditQuoteModal />}></Route>
          <Route path="/editlineitem" name="editlineitem" element={<EditLineItemModal />}></Route>
         
          <Route
            path="/Enquiry"
            name="enquirydata"
            element={<EnquiryTable />}
            ></Route>
                <Route
            path="/EnquiryDetails"
            name="enquirydata"
            element={<EnquiryDetailsTable />}
            ></Route>
      {/* Table Edit's */}
       
          <Route path="/ProductEdit/:id" name="productdata" element={<ProductEdit />}></Route>
          <Route path="/OrdersEdit/:id" name="orderdata" element={<OrdersEdit />}></Route>
          <Route path="/ContentEdit/:id" name="contentdata" element={<ContentEdit />}></Route>
          <Route path="/CustomerEdit/:id" name="customerdata" element={<CustomerEdit />}></Route>
          <Route path="/BlogEdit/:id" name="blogdata" element={<BlogEdit />}></Route>
          <Route path="/InventoryEdit/:id" name="inventorydata" element={<InventoryEdit />}></Route>
                   <Route path="/SupplierEdit/:id" name="supplierdata" element={<SupplierEdit />}></Route>
          <Route path="/sectionEdit/:id" name="sectiondata" element={<SectionEdit />}></Route>
         
          
          
          <Route path="/Login/:id" name="logindata" element={<Login />}></Route>
          <Route path="/ValueListEdit/:id" name="valuelistdata" element={<ValueListEdit />}></Route>
          <Route
            path="/SubCategoryEdit/:id"
            name="subcategorydata"
            element={<SubCategoryEdit />}
          ></Route>
          <Route path="/CategoryEdit/:id" name="categorydata" element={<CategoryEdit />}></Route>
          <Route path="/StaffEdit/:id" name="staffdata" element={<StaffEdit />}></Route>
          <Route path="/SupportEdit/:id" name="supportdata" element={<SupportEdit />}></Route>
          <Route path="/SettingEdit/:id" name="settingdata" element={<SettingEdit />}></Route>
          <Route path="/UserGroupEdit/:id" name="usergroupdata" element={<UserGroupEdit />}></Route>
          <Route path="/PurchaseOrder" name="purchaseorderdata" element={<PurchaseOrderTable />}></Route>
          <Route
            path="/EnquiryEdit/:id"
            name="enquiryeditdata"
            element={<EnquiryEdit />}
          ></Route>

          {/* Supplier Modal */}
          
          <Route path="/pdf/:id" name="pdfData" element={<PdfData />}></Route>
          <Route path="/pdfnext" name="pdfData" element={<PdfNext />}></Route>
          <Route path="/TicketsComponent" name="pdfData" element={<TicketsComponent />}></Route>
           <Route path="/" element={<Classic />} />
          <Route path="/dashboards/crypto" name="Classic" element={<Crypto />}></Route>
          <Route path="/dashboards/ecommerce" name="ecommerce" element={<Ecommerce />}></Route>
          <Route path="/dashboards/general" name="general" element={<General />}></Route>
          <Route path="/dashboards/extra" name="extra" element={<Extra />}></Route>
          <Route path="/about" name="about" element={<About />}></Route>
          <Route path="/apps/notes" name="notes" element={<Notes />}></Route>
          <Route path="/apps/chat" name="chat" element={<Chat />}></Route>
          <Route path="/apps/contacts" name="contacts" element={<Contacts />}></Route>
          <Route path="/apps/calendar" name="calendar" element={<Calendar />}></Route>
          <Route path="/apps/email" name="email" element={<Email />}></Route>
          <Route path="/ecom/shop" name="email" element={<Shop />}></Route>
          <Route path="/ecom/shopdetail" name="email" element={<ShopDetail />}></Route>
          <Route path="/tickt/ticket-list" name="ticket list" element={<TicketList />}></Route>
       
          <Route
            path="/tickt/ticket-detail"
            name="ticket detail"
            element={<TicketDetail />}
          ></Route>
          <Route path="/apps/treeview" name="email" element={<Treeview />}></Route>
          <Route path="/ui/alerts" name="alerts" element={<Alerts />}></Route>
          <Route path="/ui/badges" name="badges" element={<Badges />}></Route>
          <Route path="/ui/buttons" name="buttons" element={<Buttons />}></Route>
          <Route path="/ui/cards" name="cards" element={<Cards />}></Route>
          <Route path="/ui/grid" name="grid" element={<Grid />}></Route>
          <Route path="/ui/table" name="table" element={<Tables />}></Route>
          <Route path="/ui/forms" name="forms" element={<Forms />}></Route>
          <Route path="/ui/breadcrumbs" name="breadcrumbs" element={<Breadcrumbs />}></Route>
          <Route path="/ui/dropdown" name="dropdown" element={<Dropdowns />}></Route>
          <Route path="/ui/button-group" name="button group" element={<BtnGroup />}></Route>
          <Route path="/ui/collapse" name="collapse" element={<Collapse />}></Route>
          <Route path="/ui/list-group" name="list-group" element={<ListGroup />}></Route>
          <Route path="/ui/modal" name="modal" element={<Modal />}></Route>
          <Route path="/ui/navbar" name="navbar" element={<Navbar />}></Route>
          <Route path="/ui/nav" name="nav" element={<Nav />}></Route>
          <Route path="/ui/pagination" name="pagination" element={<Pagination />}></Route>
          <Route path="/ui/popover" name="popover" element={<Popover />}></Route>
          <Route path="/ui/progress" name="progress" element={<Progress />}></Route>
          <Route path="/ui/spinner" name="spinner" element={<Spinner />}></Route>
          <Route path="/ui/tabs" name="tabs" element={<Tabs />}></Route>
          <Route path="/ui/toasts" name="toasts" element={<Toasts />}></Route>
          <Route path="/ui/tooltip" name="tooltip" element={<Tooltip />}></Route>
          <Route path="/form-layout/form-basic" name="form-basic" element={<FormBasic />}></Route>
          <Route path="/form-layout/form-grid" name="form-grid" element={<FormGrid />}></Route>
          <Route path="/form-layout/form-group" name="form-group" element={<FormGroup />}></Route>
          <Route path="/form-layout/form-input" name="form-input" element={<FormInput />}></Route>
          <Route path="/form-pickers/datepicker" name="datepicker" element={<Datepicker />} />
          <Route path="/form-pickers/tag-select" name="tag-select" element={<TagSelect />}></Route>
          <Route path="/form-validation" name="form-validation" element={<FormValidate />}></Route>
          <Route path="/form-steps" name="form-steps" element={<FormSteps />}></Route>
          <Route path="/form-editor" name="form-editor" element={<FormEditor />}></Route>

          <Route path="/tables/basic-table" name="basic-table" element={<Basictable />}></Route>
          <Route path="/tables/react-table" name="react-table" element={<CustomReactTable />} />
          <Route path="/tables/data-table" name="data-table" element={<ReactBootstrapTable />} />
          <Route path="/charts/apex" name="apex" element={<ApexCharts />}></Route>
          <Route path="/charts/chartjs" name="chartjs" element={<ChartJs />}></Route>
          <Route path="/sample-pages/profile" name="profile" element={<Profile />}></Route>
          <Route path="/sample-pages/helper-class" name="helper-class" element={<HelperClass />} />
          <Route path="/sample-pages/starterkit" name="starterkit" element={<StarterKit />} />
          <Route path="/sample-pages/gallery" name="gallery" element={<Gallery />}></Route>
          <Route
            path="/sample-pages/search-result"
            name="search-result"
            element={<SearchResult />}
          />
          <Route path="/icons/bootstrap" name="bootstrap" element={<Bootstrap />}></Route>
          <Route path="/icons/feather" name="feather" element={<Feather />}></Route>
          <Route path="/map/vector" name="vector" element={<CustomVectorMap />}></Route>
          <Route path="/widget" name="widget" element={<Widget />}></Route>
          <Route path="/casl" name="casl" element={<CASL />}></Route>
          <Route path="/auth/404" name="404" element={<Error />}></Route>
          <Route path="/projects/addproject" name="addproject" element={<AddProjects />}></Route>
          <Route
            path="/projects/editproject/:id"
            name="editproject"
            element={<EditProject />}
          ></Route>
          <Route path="/projects/projectreport" name="projectreport" element={<Reports />}></Route>
          <Route path="/OverAllSalesSummaryReport" name="overallsummarydata" element={<OverallSalesReportTable />}></Route>
          <Route path="/InvoiceByYear" name="invoicebyeardata" element={<InvoiceByYearTable />}></Route>
          {/* Tender */}
          <Route path="/BlogDetails" name="blogDetaildata" element={<BlogDetailsTable />}></Route>
          <Route path="/SupplierDetails" name="supplierDetaildata" element={<SupplierDetailsTable />}></Route>
          <Route path="/Task" name="taskdata" element={<TaskTable />}></Route>
          <Route path="/Staff" name="staffdata" element={<StaffTable />}></Route>
          <Route path="/ProductDetails" name="productDetaildata" element={<ProductDetailsTable />}></Route>
          <Route path="/StaffDetails" name="staffDetaildata" element={<StaffDetails />}></Route>
          <Route path="/Product" name="productdata" element={<ProductTable />}></Route>
          <Route path="/Orders" name="ordersdata" element={<FinanceTable />}></Route>
          <Route
            path="/PurchaseOrderEdit/:id"
            name="purchaseorderdata"
            element={<PurchaseOrderEdit />}
          ></Route>
          <Route path="/Blog" name="blogdata" element={<Blog />}></Route>
          <Route path="/Inventory" name="inventorydata" element={<Inventory />}></Route>
          <Route path="/SubCategory" name="subcategorydata" element={<SubCategoryTable />}></Route>
          <Route path="/ProjectReport" name="projectdata" element={<ProjectReportTable />}></Route>
          <Route
            path="/SubCategoryDetails"
            name="subcategorydetailsdata"
            element={<SubCategoryDetailsTable />}
          ></Route>

          <Route path="/Valuelist" name="valuelistdata" element={<ValuelistTable />}></Route>
          <Route
            path="/ValuelistDetails"
            name="valuelistdetailsdata"
            element={<ValuelistDetailsTable />}
          ></Route>
             <Route
            path="/PurchaseOrderDetail"
            name="purchaseorderdetaildata"
            element={<PurchaseOrderDetailTable />}
          ></Route>
          <Route path="/Section" name="sectiondata" element={<Section />}></Route>
          <Route path="/SectionDetails" name="sectiondetaildata" element={<SectionDetails />}></Route>
          <Route path="/Setting" name="settingdata" element={<SettingTable />}></Route>
          <Route path="/SettingDetails" name="settingdetaildata" element={<SettingDetails />}></Route>
          <Route path="/Category" name="categorydata" element={<CategoryTable />}></Route>
          <Route path="/CategoryDetails" name="categorydetailsdata" element={<CategoryDetails />}></Route>
          <Route path="/UserGroup" name="usergroupdata" element={<UserGroupTable />}></Route>
          <Route path="/UserGroupDetails" name="usergroupdetailsdata" element={<UserGroupDetails />}></Route>
        
          <Route path="/Content" name="contentdata" element={<Content />}></Route>
          <Route path="/Customer" name="customerdata" element={<Customer />}></Route>
          <Route
            path="/ContentDetails"
            name="contentdetailsdata"
            element={<ContentDetailsTable />}
          ></Route>
           <Route
            path="/CustomerDetails"
            name="customerdetailsdata"
            element={<CustomerDetailsTable />}
          ></Route>
          <Route path="/test" name="testdata" element={<TestTable />}></Route>
          <Route path="/Support" name="supportdata" element={<Support />}></Route>
          <Route path="/SupportNew" name="supportnewdata" element={<SupportNewTable />}></Route>
          <Route path="/SupportDetails" name="supportdetailsdata" element={<SupportDetails />}></Route>
        
          <Route path="/Employeetrainingreports" name="employeetrainingreportdata" element={<EmployeetrainingreportsTable />}></Route>
          <Route path="/StatementofAccountsReport" name="statementofAccountsreportdata" element={<StatementofAccountsReport />}></Route>
          <Route path="/AgingReports" name="agingReportdata" element={<AgingReportsTable />}></Route>
          <Route path="/CpfSummaryreports" name="cpfsummaryreportdata" element={<CpfSummaryReports />}></Route>
          <Route path="/InvoiceByMonth" name="invoicemonthdata" element={<InvoiceByMonth />}></Route>
          <Route path="/EmployeeSalaryReport" name="employeesalarydata" element={<EmployeeSalaryReport />}></Route>
          <Route path="/PayslipGeneratedReports" name="payslipdata" element={<PayslipGeneratedReports />}></Route>
          <Route path="/IR8AReport" name="ir8areportdata" element={<IR8AReport />}></Route>
          <Route path="/PurchaseGstReport" name="purchasegstreportdata" element={<PurchaseGstReport />}></Route>
          <Route path="/Supplier" name="supplierdata" element={<SupplierTable />}></Route>
        
        </Route>

        
      </Routes>
    </div>
  );
};

export default Routernew;
