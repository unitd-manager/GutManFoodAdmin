import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import SupportTable from '../../components/SupportTable/SupportTable';
import SupportFilter from '../../components/SupportTable/SupportFilter';
import CommonTable from '../../components/CommonTable';

const Support = () => {
  return (
    <>
      <BreadCrumbs />
      <CommonTable
        title="Support List"
        Button={
          <Link to="/SupportDetails">
            <Button color="primary" className="shadow-none">
              Add New
            </Button>
          </Link>
        }
      ></CommonTable>
      <Card>
        <CardBody>
          <SupportFilter />
          <SupportTable />
        </CardBody>
      </Card>
    </>
  );
};
export default Support;
