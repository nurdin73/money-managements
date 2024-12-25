import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDollar,
  cilList,
  cilMoney,
  cilNewspaper,
  cilSpeedometer,
  cilWallet,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName='nav-icon' />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    component: CNavItem,
    name: 'Pemasukan',
    to: '/incomes',
    icon: <CIcon icon={cilMoney} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Pengeluaran',
    to: '/expenses',
    icon: <CIcon icon={cilWallet} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Anggaran',
    to: '/budgets',
    icon: <CIcon icon={cilDollar} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Laporan',
    to: '/reports',
    icon: <CIcon icon={cilNewspaper} customClassName='nav-icon' />,
  },
  {
    component: CNavTitle,
    name: 'Master',
  },
  {
    component: CNavItem,
    name: 'Kategori',
    to: '/categories',
    icon: <CIcon icon={cilList} customClassName='nav-icon' />,
  },
]

export default _nav
