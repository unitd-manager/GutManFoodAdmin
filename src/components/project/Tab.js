import React,{useEffect} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

export default function Tab({ toggle,tabs }) {
  Tab.propTypes = {
    toggle: PropTypes.func,
    tabs: PropTypes.array
  };

  // for tab refresh navigation #Renuka 31-05-23
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
   toggle(searchParams.get('tab'))
  }, [searchParams.get('tab')]);
  // End for tab refresh navigation #Renuka 31-05-23
  return (
    <Nav tabs>

      {tabs?.map((e)=>{
        return (
          <NavItem key={e.id}>
            <NavLink
            key={e.id}
              className={e.id === searchParams.get('tab') ? 'active' : ''}
              onClick={() => {
                setSearchParams({tab:e.id});
                toggle(e.id);
              }}
            >
              {e.name}
            </NavLink>
          </NavItem>
        )
      })}
    </Nav>
  );
}
