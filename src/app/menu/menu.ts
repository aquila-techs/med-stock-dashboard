import { CoreMenu } from '@core/types'

export const adminMenu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'pages/admin/dashboard'
  },
  {
    id: 'order',
    title: 'Orders',
    translate: 'MENU.ORDERS',
    type: 'item',
    icon: 'shopping-bag',
    url: 'pages/admin/orders'
  },
  {
    id: 'users',
    title: 'Users',
    translate: 'MENU.USERS',
    type: 'collapsible',
    icon: 'users',
    children:[
      {
        id: 'usersDatabase',
        title: 'Seller Database',
        type: 'item',
        icon: '',
        url: 'pages/admin/sellers'
      },
      {
        id: 'pendingApproval',
        title: 'Seller Pending Approval',
        type: 'item',
        icon: '',
        url: 'pages/admin/pending-approval'
      },
      {
        id: 'usersDatabase',
        title: 'Buyer Database',
        type: 'item',
        icon: '',
        url: 'pages/admin/buyers'
      },
    ]
  },
  {
    id: 'promotions',
    title: 'Promotions',
    type: 'item',
    icon: 'zap',
    url: 'pages/admin/promotions'
  },
  {
    id: 'products',
    title: 'Products',
    type: 'item',
    icon: 'briefcase',
    url: 'pages/admin/products'
  },
  {
    id: 'feedback',
    title: 'Support',
    type: 'item',
    icon: 'twitch',
    url: 'pages/admin/feedback'
  },
];

export const sellerMenu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'pages/seller/dashboard'
  },
  {
    id: 'order',
    title: 'Orders',
    translate: 'MENU.ORDERS',
    type: 'item',
    icon: 'shopping-bag',
    url: 'pages/seller/order'
  },
  {
    id: 'products',
    title: 'Products',
    type: 'item',
    icon: 'briefcase',
    url: 'pages/seller/products'
  },
  {
    id: 'feedbackSupport',
    title: 'feedback & Support',
    type: 'item',
    icon: 'twitch',
    url: 'pages/seller/feedbackSupport'
  },
]

