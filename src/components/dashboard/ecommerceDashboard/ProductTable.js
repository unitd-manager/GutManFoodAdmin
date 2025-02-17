import { Input, Table } from 'reactstrap';
import user1 from '../../../assets/images/products/s1.jpg';
import user2 from '../../../assets/images/products/s2.jpg';
import user3 from '../../../assets/images/products/s3.jpg';
import user4 from '../../../assets/images/products/s4.jpg';
import DashCard from '../dashboardCards/DashCard';

const tableData = [
  {
    pavatar: user1,
    name: 'Orange Shoes',
    customer: 'Rotating Chair',
    status: 'pending',
    weeks: '35',
    budget: '95K',
  },
  {
    pavatar: user2,
    name: 'Red Sandle',
    customer: 'Dummy Product',
    status: 'done',
    weeks: '35',
    budget: '95K',
  },
  {
    pavatar: user3,
    name: 'Gourgeous Purse',
    customer: 'Comfortable Chair',
    status: 'holt',
    weeks: '35',
    budget: '95K',
  },
  {
    pavatar: user4,
    name: 'Puma T-shirt',
    customer: 'Wooden Chair',
    status: 'pending',
    weeks: '35',
    budget: '95K',
  },
];

const ProductTable = () => {
  return (
    <DashCard
      title="Products of the Month"
      subtitle="Overview of Latest Month"
      actions={
        <Input type="select" className="custom-select">
          <option value="0">Monthly</option>
          <option value="1">Daily</option>
          <option value="2">Weekly</option>
          <option value="3">Yearly</option>
        </Input>
      }
    >
      <div className="table-responsive">
        <Table className="text-nowrap mt-3 align-middle mb-0" borderless>
          <thead>
            <tr>
              <th>Products</th>
              <th>Customers</th>
              <th>Status</th>
              <th>Invoice</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((tdata) => (
              <tr key={tdata.pavatar} className="border-top">
                <td>
                  <div className="d-flex align-items-center p-2">
                    <img src={tdata.pavatar} alt="pavatar" width="50" height="50" className='rounded'/>
                    <h5 className="mb-0 ms-3">{tdata.name}</h5>
                  </div>
                </td>
                <td>{tdata.customer}</td>
                <td>
                  {tdata.status === 'pending' ? (
                    <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                  ) : tdata.status === 'holt' ? (
                    <span className="p-2 bg-warning rounded-circle d-inline-block ms-3" />
                  ) : (
                    <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                  )}
                </td>
                <td>{tdata.weeks}</td>
                <td>{tdata.budget}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DashCard>
  );
};

export default ProductTable;
