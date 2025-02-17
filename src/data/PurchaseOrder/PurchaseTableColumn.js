import * as Icon from 'react-feather'

export const purchaseTableColumn = [
  {
    name: '',
  },
  {
    name: 'D.O',
  },
  {
    name: 'S.No',
  },
  {
    name: 'Product Code	',
  },
  {
    name: 'Product Title	',
  },
  {
    name: 'Cost Price	',
  },
  {
    name: 'Selling Price',
  },
  {
    name: 'GST%	',
  },
  {
    name: 'Stock',
  },
  {
    name: 'Qty',
  },
  {
    name: 'Damaged Qty	',
  },
  {
    name: 'Added to Stock	',
  },
  {
    name: 'Qty Balance	',
  },
  {
    name: 'Status',
  },
  {
    name: 'Total Amount	',
  },
  {
    name: 'Actual Total Amount',
  },
  {
    name: 'Edit	',
    selector: 'edit',
    cell: () => <Icon.Edit2 />,
    grow: 0,
    width: 'auto',
    button: true,
    sortable: false,
  },
  {
    name: 'Delete',
    selector: 'delete',
    cell: () => <Icon.Trash />,
    grow: 0,
    width: 'auto',
    wrap: true,
  },
  {
    name: 'History',
  },
];

export const column=[];