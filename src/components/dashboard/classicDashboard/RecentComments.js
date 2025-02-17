import {
  Badge,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
import SimpleBar from 'simplebar-react';
import DashCard from '../dashboardCards/DashCard';
import user1 from '../../../assets/images/users/user1.jpg';
import user2 from '../../../assets/images/users/user2.jpg';
import user3 from '../../../assets/images/users/user3.jpg';
import user4 from '../../../assets/images/users/user4.jpg';
import user5 from '../../../assets/images/users/user5.jpg';

const commentsData = [
  {
    image: user1,
    name: 'James Anderson',
    comment: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    status: 'Pending',
    date: 'April 14, 2021',
  },
  {
    image: user2,
    name: 'Michael Jorden',
    comment: 'Rpsum is simply dummy text of the printing and type setting industry.',
    status: 'Approved',
    date: 'May 14, 2021',
  },
  {
    image: user3,
    name: 'Johnathan Doeting',
    comment: 'Frem Ipsum is simply dummy text of the printing and type setting industry.',
    status: 'Approved',
    date: 'June 14, 2021',
  },
  {
    image: user4,
    name: 'Daniel Kristeen',
    comment: 'LorTsum is simply dummy text of the printing and type setting industry.',
    status: 'Pending',
    date: 'July 14, 2021',
  },
  {
    image: user5,
    name: 'Jan Petrovic',
    comment: 'Mem Ipsum is simply dummy text of the printing and type setting industry.',
    status: 'Rejected',
    date: 'Aug 14, 2021',
  },
  {
    image: user1,
    name: 'Hanna Gover',
    comment: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    status: 'Pending',
    date: 'April 14, 2021',
  },
];

const RecentComments = () => {
  return (
    <DashCard title="Recent Comments" subtitle="Comments that needs to read">
      <SimpleBar style={{ height: '620px' }}>
        <ListGroup flush>
          {commentsData.map((icomment) => (
            <ListGroupItem
              action
              href="#"
              tag="a"
              key={icomment.name}
              className="d-flex border-0 p-3 w-100 rounded"
            >
              <div>
                <img src={icomment.image} alt="user" width="50" className="rounded-circle me-3" />
              </div>
              <div className="w-100">
                <ListGroupItemHeading className="fw-bold mb-0">
                  {icomment.name}
                </ListGroupItemHeading>
                <ListGroupItemText className="my-1">{icomment.comment}</ListGroupItemText>
                <div className="d-flex">
                  <div>
                    {icomment.status === 'Pending' ? (
                      <Badge color="primary" className='text-dark-white'>Pending</Badge>
                    ) : icomment.status === 'Rejected' ? (
                      <Badge color="danger" className='text-dark-white'>Rejected</Badge>
                    ) : (
                      <Badge color="success" className='text-dark-white'>Approved</Badge>
                    )}
                  </div>
                  <small className="ms-auto">{icomment.date}</small>
                </div>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </SimpleBar>
    </DashCard>
  );
};

export default RecentComments;
