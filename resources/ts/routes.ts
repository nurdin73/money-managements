import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const TransactionIncomePage = React.lazy(() => import('@/pages/transaction/income'))
const TransactionExpensePage = React.lazy(() => import('@/pages/transaction/expense'))
const TransactionBudgetPage = React.lazy(() => import('@/pages/transaction/budgets'))
const MasterCategoryPage = React.lazy(() => import('@/pages/master/categories'))
//:end-import: jangan dihapus!

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/incomes', name: 'Incomes', element: TransactionIncomePage },
  { path: '/expenses', name: 'Expenses', element: TransactionExpensePage },
  { path: '/budgets', name: 'Budgets', element: TransactionBudgetPage },
  { path: '/categories', name: 'Categories', element: MasterCategoryPage },
  { path: '/reports', name: 'Reports', element: Dashboard },

  {/* end-combine: jangan dihapus! */ }
]

export default routes
