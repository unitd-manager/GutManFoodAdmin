import React from 'react';
import { DropdownItem } from 'reactstrap';
import user1 from '../../assets/images/users/user1.jpg';

const ProfileDD = () => {
  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={user1} alt="user" className="rounded-circle" width="60" />
      
      </div>
 
       <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
