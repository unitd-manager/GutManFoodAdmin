import React from 'react';
import { Table } from 'reactstrap';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';


function ProjectLinkedTable({ projectsLinked, eng, arb, }) {
    ProjectLinkedTable.propTypes = {
    projectsLinked: PropTypes.array,
    eng: PropTypes.any,
    arb: PropTypes.any,
  };

  

  return (
    <div>

      <ComponentCard title={arb ? 'المشاريع المرتبطة': 'Projects Linked'}>
        <Table id="examplepl" className="display border border-secondary rounded">
          <thead>
            <tr>
            <th scope="col">{arb ?'تاريخ استخدام المواد':'Material Used Date'}</th>
            {/* <th scope="col">{arb ?'عنوان المشروع':'Project Title'}</th> */}
            <th scope="col">{arb ?' اسم العميل ':'Client Name'}</th>
            <th scope="col">{arb ?'كمية':'Qty'}</th> 
            </tr>
          </thead>
          <tbody>
            {projectsLinked &&
              projectsLinked.map((element) => {
                return (
                  <tr>
                    <td>{moment(element.material_used_date).format('YYYY-MM-DD')}</td>
                    {/* <td>
                      <Link to={`/projectEdit/${element.project_id}`}>{eng ===true && element.title}
                        { arb === true && element.title_arb} </Link>
                    </td> */}
                    <td>{eng ===true && element.company_name}
                        { arb === true && element.company_name_arb}</td>
                    <td>{eng ===true && element.qty}
                        { arb === true && element.qty_arb}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </ComponentCard>
    </div>
  );
}

export default ProjectLinkedTable;
