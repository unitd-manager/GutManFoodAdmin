import * as Icon from 'react-feather';

const SidebarData = [
  { caption: 'Home' },
  {
    title: 'Dashboard',
    href: '/',
    icon: <Icon.Home />,
    id: 2.1,
    collapisble: false,
  },
  {
    title: 'Task Module',
    href: '/Task',
    icon: <Icon.Edit />,
    id: 2.2,
    collapisble: false,
  },
  { caption: 'Modules' },
  {
    title: 'Admin',
    href: '/',
    id: 2,
    suffix: '6',
    suffixColor: 'bg-info',
    icon: <Icon.FileText />,
    collapisble: true,
    children: [
 
      {
        title: 'Staff',
        href: '/Staff',
        icon: <Icon.Disc />,
        id: 2.2,
        collapisble: false,
      },
      {
        title: 'Settings',
        href: '/Setting',
        icon: <Icon.Disc />,
        id: 2.3,
        collapisble: false,
      },

      {
        title: 'UserGroup',
        href: '/UserGroup',
        icon: <Icon.Disc />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Valuelist',
        href: '/Valuelist',
        icon: <Icon.Disc />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Menu',
        href: '/Section',
        icon: <Icon.Disc />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Blogs',
        href: '/Blog',
        icon: <Icon.Disc />,
        id: 2.2,
        collapisble: false,
      },
  
    ],
  },
  {
    title: 'Admin',
    href: '/',
    id: 3,
    suffix: '9',
    suffixColor: 'bg-info text-dark-white',
    icon: <Icon.TrendingUp />,
    collapisble: true,
    children: [
      {
        title: 'Content',
        href: '/Content',
        icon: <Icon.Airplay />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Category',
        href: '/Category',
        icon: <Icon.Airplay />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'SubCategory',
        href: '/SubCategory',
        icon: <Icon.Airplay />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Order',
        href: '/Orders',
        icon: <Icon.Airplay />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Product',
        href: '/Product',
        icon: <Icon.Airplay />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Dashboard',
        href: '/Finance',
        icon: <Icon.Airplay />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Reports',
        href: '/Finance',
        icon: <Icon.Airplay />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Blog',
        href: '/Finance',
        icon: <Icon.Airplay />,
        id: 2.5,
        collapisble: false,
      },
      {
        title: 'Support',
        href: '/Support',
        icon: <Icon.Airplay />,
        id: 2.5,
        collapisble: false,
      },
    ],
  },
 
 

];

export default SidebarData;
