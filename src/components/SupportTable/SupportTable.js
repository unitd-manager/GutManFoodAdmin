import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Badge, UncontrolledTooltip, Input } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { fetchTickets, SearchTicket } from '../../store/apps/ticket/TicketSlice';
import SortOrder from '../SortOrder';

const SupportTable = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const keys = ['title', 'staff_name', 'section_title', 'record_type'];

  const getVisibleTickets = (tickets, filter, ticketSearch) => {
    switch (filter) {
      case 'total_tickets':
        return tickets.filter((c) =>
            !c.deleted &&
            c.value !== 'completed' &&  c.value !== 'cancelled' &&
          keys.some(
            (key) =>
              c[key] && c[key].toLocaleLowerCase().includes(ticketSearch.toLocaleLowerCase()),
          ),
        );
      case 'new':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.value === 'new' &&
            keys.some(
              (key) =>
                c[key] && c[key].toLocaleLowerCase().includes(ticketSearch.toLocaleLowerCase()),
            ),
        );
      case 'hold':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.value === 'hold' &&
            keys.some(
              (key) =>
                c[key] && c[key].toLocaleLowerCase().includes(ticketSearch.toLocaleLowerCase()),
            ),
        );
      case 'in progress':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.value === 'in progress' &&
            keys.some(
              (key) =>
                c[key] && c[key].toLocaleLowerCase().includes(ticketSearch.toLocaleLowerCase()),
            ),
        );

      case 'completed':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.value === 'completed' &&
            keys.some(
              (key) =>
                c[key] && c[key].toLocaleLowerCase().includes(ticketSearch.toLocaleLowerCase()),
            ),
        );

      case 're-open':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.value === 're-open' &&
            keys.some(
              (key) =>
                c[key] && c[key].toLocaleLowerCase().includes(ticketSearch.toLocaleLowerCase()),
            ),
        );
      case 'cancelled':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.value === 'cancelled' &&
            keys.some(
              (key) =>
                c[key] && c[key].toLocaleLowerCase().includes(ticketSearch.toLocaleLowerCase()),
            ),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const tickets = useSelector((state) =>
    getVisibleTickets(
      state.ticketReducer.tickets,
      state.ticketReducer.currentFilter,
      state.ticketReducer.ticketSearch,
    ),
  );

  // Pagination

  const [page, setPage] = useState(0);

  const employeesPerPage = 20;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = tickets.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );
  const totalPages = Math.ceil(tickets.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const columns = [
    {
      name: 'id',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => (
        <Link to="/">
          <Icon.Edit3 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Due Date',
      selector: 'due_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'value',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Type',
      selector: 'record_type',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Module Name',
      selector: 'section_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Staff Assigned',
      selector: 'staff_name',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'ID',
      selector: 'support_id',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Order',
      selector: 'sort_order',
      sortable: true,
      grow: 3,
      wrap: true,
    },
  ];

  return (
    <>
      <div className="col-lg-3 mb-4">
        <Input
          type="text"
          onChange={(e) => dispatch(SearchTicket(e.target.value))}
          placeholder={
            searchValue && searchValue
              ? 'Search Ticket...'
              : setSearchValue(dispatch(SearchTicket('')))
          }
        />
      </div>
      <Table className="align-middle">
        <thead>
          <tr>
            {columns.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {displayEmployees &&
            displayEmployees.map((ticket, index) => (
              <tr key={ticket.support_id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/SupportEdit/${ticket.support_id}`}>
                    <i className="bi bi-pen cursor-pointer" id="TooltipExample" />
                  </Link>
                  <UncontrolledTooltip placement="left" target="TooltipExample">
                    Edit
                  </UncontrolledTooltip>
                </td>
                <td>
                  <h5 className="mb-0 mt-2"> {ticket.title} </h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<small
                    className="text-muted d-block text-truncate mb-2"
                    style={{ width: '300px' }}
                  >
                    ${ticket.description && ticket.description.substring(0, 50)}
                  </small>`,
                    }}
                  />
                </td>
                <td>{ticket.date}</td>
                <td>{ticket.due_date}</td>

                <td>
                  {ticket.value === 'new' ? (
                    <Badge color="primary">{ticket.value}</Badge>
                  ) : ticket.value === 'in progress' ? (
                    <Badge color="warning">{ticket.value}</Badge>
                  ) : ticket.value === 'hold' ? (
                    <Badge color="" style={{ background: '#807fe2' }}>
                      {ticket.value}
                    </Badge>
                  ) : ticket.value === 'completed' ? (
                    <Badge color="success">{ticket.value}</Badge>
                  ) : ticket.value === 're-open' ? (
                    <Badge color="" style={{ background: '#ec6724' }}>
                      {ticket.value}
                    </Badge>
                  ) : ticket.value === 'cancelled' ? (
                    <Badge color="danger">{ticket.value}</Badge>
                  ) : (
                    ''
                  )}
                </td>

                <td>{ticket.record_type}</td>
                <td>{ticket.section_title}</td>
                <td>{ticket.staff_name}</td>
                <td>{ticket.support_id}</td>
                <td>
                  <SortOrder
                    idValue={ticket.support_id}
                    idColumn="support_id"
                    tablename="support"
                    value={ticket.sort_order}
                  ></SortOrder>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            {columns.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </tfoot>
      </Table>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName="navigationButtons"
        previousLinkClassName="previousButton"
        nextLinkClassName="nextButton"
        disabledClassName="navigationDisabled"
        activeClassName="navigationActive"
      />
    </>
  );
};

export default SupportTable;
