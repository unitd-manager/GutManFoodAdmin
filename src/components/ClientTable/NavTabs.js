import React from 'react'
import {Nav,NavItem,NavLink} from 'reactstrap';
import PropTypes from 'prop-types'

export default function NavTabs({toggle,activeTab}) {
    NavTabs.propTypes = {
        toggle: PropTypes.func,
        activeTab:PropTypes.any
          }
  return (
    <Nav tabs>
    <NavItem>
      <NavLink
        className={activeTab === '1' ? 'active' : ''}
        onClick={() => {
          toggle('1');
        }} >Contacts Linked
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={activeTab === '2' ? 'active' : ''}
        onClick={() => {
          toggle('2');
        }}>Projects Linked
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={activeTab === '3' ? 'active' : ''}
        onClick={() => {
          toggle('3');
        }}>Invoice Linked
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={activeTab === '4' ? 'active' : ''}
        onClick={() => {
          toggle('4');
        }}>Tender Linked
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={activeTab === '5' ? 'active' : ''}
        onClick={() => {
          toggle('5');
        }}>Add notes
      </NavLink>
    </NavItem>
  </Nav>
  )
}
