import React from 'react'
import PropTypes from 'prop-types'
import { Form,FormGroup,Row,Col,Button } from 'reactstrap';
import ComponentCard from '../ComponentCard';
import PictureAttachmentModalV2 from '../tender/PictureAttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';

function ProductAttachmentPart({
    dataForPicture,
    dataForAttachment,
    setAttachmentModal,
    id,
    attachmentModal,
    pictureData
}) {
    ProductAttachmentPart.propTypes = {
        dataForPicture: PropTypes.object,
        dataForAttachment: PropTypes.object,
        setAttachmentModal: PropTypes.func,
        id: PropTypes.any,
        attachmentModal: PropTypes.bool,
        pictureData: PropTypes.object
      
      };
  return (
    <div>
         <Form>
        <FormGroup>
          <ComponentCard title="Picture">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button className='shadow-none'
                  color="primary"
                  onClick={() => {
                    dataForPicture();
                    setAttachmentModal(true);}}>Add</Button>
              </Col>
            </Row>
            <PictureAttachmentModalV2 moduleId={id} roomName="ProductPicture" altTagData="Product Data" desc="Product Data" modelType={pictureData.modelType} attachmentModal={attachmentModal} setAttachmentModal={setAttachmentModal}/>
            <ViewFileComponentV2 moduleId={id} roomName="ProductPicture" />
          </ComponentCard>
        <ComponentCard title="Related Picture">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button className='shadow-none'
                  color="primary"
                  onClick={() => {
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}>Add</Button>
              </Col>
            </Row>
            <PictureAttachmentModalV2 moduleId={id} roomName="ProductRelatedPicture" altTagData="ProductData" desc="ProductData" modelType={pictureData.modelType} attachmentModal={attachmentModal} setAttachmentModal={setAttachmentModal}/>
            <ViewFileComponentV2 moduleId={id} roomName="ProductRelatedPicture" />
          </ComponentCard>
        </FormGroup>
      </Form>

    </div>
  )
}

export default ProductAttachmentPart