import { Card, CardBody, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';
import CreationModification from './CreationModification';

const ComponentCard = ({ children, title, subtitle, creationModificationDate }) => {
  return (
    <Card className="shadow-none">
      <CreationModification details={creationModificationDate} title={title}></CreationModification>
      <CardBody className="p-4">
        <CardSubtitle className="text-muted mb-3">{subtitle || ''}</CardSubtitle>
        <div>{children}</div>
      </CardBody>
    </Card>
  );
};

ComponentCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.node,
  creationModificationDate: PropTypes.any,
};

export default ComponentCard;
