import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { usePermify } from '@permify/react-role';
// import api from '../constants/api';
// import message from '../components/Message';

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  AppProvider.propTypes = {
    children: PropTypes.any,
  };
  const [lang, setLang] = useState('en');
  const [permissions, setPermissions] = useState(null);
  const [loggedInuser, setLoggedInUser] = useState({});
  const [modulePermission, setModulepermission] = useState();
  // const { setUser } = usePermify();

  // const getPermissions = (id) => {
  //   if(id)
  //     api
  //       .post('/usergroup/getroomusergroupById', { user_group_id: id })
  //       .then((res) => {
  //         console.log(res.data.data)
  //           const apiData = res.data.data;
  //           const permissionArray = [];
  //           apiData.forEach((element) => {
  //             if (element.edit) permissionArray.push(`${element.section_title}-edit`);
  //             if (element.detail) permissionArray.push(`${element.section_title}-detail`);
  //             if (element.duplicate) permissionArray.push(`${element.section_title}-duplicate`);
  //             if (element.export) permissionArray.push(`${element.section_title}-export`);
  //             if (element.import) permissionArray.push(`${element.section_title}-import`);
  //             if (element.list) permissionArray.push(`${element.section_title}-list`);
  //             if (element.new) permissionArray.push(`${element.section_title}-new`);
  //             if (element.print) permissionArray.push(`${element.section_title}-print`);
  //             if (element.publish) permissionArray.push(`${element.section_title}-publish`);
  //             if (element.remove) permissionArray.push(`${element.section_title}-remove`);
  //           });
  //           setUser({
  //             id: '1',
  //             roles: ['admin'],
  //             permissions: permissionArray,
  //           });
          
          
  //       })
  //       .catch(() => {
  //         message('Unable to get room user record.', 'error');
  //       });
  // };
  const getUser = () => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    setLoggedInUser(user);
    // if(user.user_group_id){
    //   getPermissions(user.user_group_id)
    // }
      
  };
  React.useEffect(() => {
    getUser();
    return () => {
      getUser();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        loggedInuser,
        setLoggedInUser,
        lang,
        setLang,
        permissions,
        setPermissions,
        setModulepermission,
        modulePermission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext as default };
