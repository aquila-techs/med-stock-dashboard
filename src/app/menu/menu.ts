import { CoreMenu } from '@core/types'

export const adminMenu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'order',
    title: 'Orders',
    translate: 'MENU.ORDERS',
    type: 'item',
    icon: 'shopping-bag',
    url: 'order'
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
        title: 'Users Database',
        type: 'item',
        icon: '',
        url: 'user/database'
      },
      {
        id: 'pendingApproval',
        title: 'Pending Approval',
        type: 'item',
        icon: '',
        url: 'user/pendingApproval'
      }
    ]
  },
  {
    id: 'promotions',
    title: 'Promotions',
    type: 'item',
    icon: 'zap',
    url: 'promotions'
  },
  {
    id: 'products',
    title: 'Products',
    type: 'item',
    icon: 'briefcase',
    url: 'products'
  },
  {
    id: 'feedbackSupport',
    title: 'feedback & Support',
    type: 'item',
    icon: 'twitch',
    url: 'feedback-support'
  },
];

export const sellerMenu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'order',
    title: 'Orders',
    translate: 'MENU.ORDERS',
    type: 'item',
    icon: 'shopping-bag',
    url: 'order'
  },
  {
    id: 'products',
    title: 'Products',
    type: 'item',
    icon: 'briefcase',
    url: 'products'
  },
  {
    id: 'feedbackSupport',
    title: 'feedback & Support',
    type: 'item',
    icon: 'twitch',
    url: 'feedback-support'
  },
]

