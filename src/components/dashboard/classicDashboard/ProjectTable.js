import { Input, Table } from 'reactstrap';
import user1 from '../../../assets/images/users/user1.jpg';
import user2 from '../../../assets/images/users/user2.jpg';
import user3 from '../../../assets/images/users/user3.jpg';
import user4 from '../../../assets/images/users/user4.jpg';
import user5 from '../../../assets/images/users/user5.jpg';
import DashCard from '../dashboardCards/DashCard';

const tableData = [
  {
    avatar: user1,
    name: 'Hanna Gover',
    email: 'hgover@gmail.com',
    project: 'Flexy React',
    status: 'pending',
    weeks: '35',
    budget: '95K',
  },
  {
    avatar: user2,
    name: 'Daniel Kristeen',
    email: 'hgover@gmail.com',
    project: 'Lading pro React',
    status: 'done',
    weeks: '35',
    budget: '95K',
  },
  {
    avatar: user3,
    name: 'Julian Josephs',
    email: 'hgover@gmail.com',
    project: 'Elite React',
    status: 'holt',
    weeks: '35',
    budget: '95K',
  },
  {
    avatar: user4,
    name: 'Jan Petrovic',
    email: 'hgover@gmail.com',
    project: 'Flexy React',
    status: 'pending',
    weeks: '35',
    budget: '95K',
  },
  {
    avatar: user5,
    name: 'Hanna Gover',
    email: 'hgover@gmail.com',
    project: 'Ample React',
    status: 'done',
    weeks: '35',
    budget: '95K',
  },
];

const ProjectTable = () => {
  return (
    <DashCard
      title="Projects of the Month"
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
        <Table className="text-nowrap mt-3 align-middle" borderless>
          <thead>
            <tr>
              <th>Team Lead</th>
              <th>Project</th>

              <th>Status</th>
              <th>Weeks</th>
              <th>Budget</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((tdata) => (
              <tr key={tdata.avatar} className="border-top">
                <td>
                  <div className="d-flex align-items-center p-2">
                    <img
                      src={tdata.avatar}
                      className="rounded-circle"
                      alt="avatar"
                      width="45"
                      height="45"
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">{tdata.name}t</h6>
                      <span className="text-muted">{tdata.email}</span>
                    </div>
                  </div>
                </td>
                <td>{tdata.project}</td>
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

export default ProjectTable;
