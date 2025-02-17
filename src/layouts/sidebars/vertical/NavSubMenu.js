/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Collapse, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { HasAccess, usePermify } from '@permify/react-role';

const NavSubMenu = ({ icon, title, items, suffixColor, suffix }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  // Function to toggle the submenu
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const { isAuthorized, isLoading } = usePermify();

  const fetchData = async () => {
    items.forEach(async(module)=>{
      // Pass roles and permissions accordingly
        // You can send empty array or null for first param to check permissions only
        if (await isAuthorized(null, `${module.section_title}-list`)) {
          return true
      }
        return false
    })
  };

  useEffect(() => {
    // Initialize the state based on local storage or default to closed
    const storedState = localStorage.getItem(`menuState-${title}`);
    if (storedState === 'open') {
      setCollapsed(false);
    }
  }, [title]);

  useEffect(() => {
    // Close other menus when opening this one
    if (!collapsed) {
      const menuKeys = Object.keys(localStorage);
      menuKeys.forEach((key) => {
        if (key.startsWith('menuState-') && key !== `menuState-${title}`) {
          localStorage.setItem(key, 'closed');
        }
      });
    }
  }, [collapsed, title]);

  // Update local storage when a module is opened or closed
  useEffect(() => {
    if (!collapsed) {
      localStorage.setItem(`menuState-${title}`, 'open');
    } else {
      localStorage.removeItem(`menuState-${title}`);
    }
  }, [collapsed, title]);

  return (
    <NavItem className={collapsed ? 'activeParent' : ''}>
      <NavLink className="cursor-pointer gap-3" onClick={toggle}>
        <span className="sidebarIcon">{icon}</span>
        <span className="hide-mini w-100">
          <div className="d-flex align-items-center">
            <span className="d-block">{title}</span>
            <span className="ms-auto">
              <span className={`badge me-2 ${suffixColor}`}>{suffix}</span>
              <i className={`bi fs-8 ${collapsed ? 'bi-chevron-right' : 'bi-chevron-down'}`} />
            </span>
          </div>
        </span>
      </NavLink>

      <Collapse isOpen={!collapsed} navbar tag="ul" className="subMenu">
        {items.map((item) => (
           <HasAccess
           roles={null}
           permissions={`${item.section_title}-list`}
           renderAuthFailed={<p className='mb-0'></p>}
           key={item.section_title}
         >
          <NavItem
            key={item.section_title}
            className={`hide-mini  ${location.pathname === item.internal_link ? 'activeLink' : ''}`}
          >
            <NavLink tag={Link} to={item.internal_link} className="gap-3">
              <span className="sidebarIcon">{item.icon}</span>
              <span className="hide-mini">
                <span>{item.section_title}</span>
              </span>
            </NavLink>
          </NavItem>
          </HasAccess>
        ))}
      </Collapse>
    </NavItem>
  );
};

NavSubMenu.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  icon: PropTypes.node,
  suffix: PropTypes.any,
  suffixColor: PropTypes.string,
};

export default NavSubMenu;