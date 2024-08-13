import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { connect } from 'react-redux'
import { loadCurrentUser } from '@/redux/actions'

const DefaultLayout = ({ loadCurrentUserAction }) => {
  React.useEffect(() => {
    loadCurrentUserAction()
  }, [])

  return (
    <div>
      <AppSidebar />
      <div className='wrapper d-flex flex-column min-vh-100'>
        <AppHeader />
        <div className='body flex-grow-1'>
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default connect(null, {
  loadCurrentUserAction: loadCurrentUser,
})(DefaultLayout)
