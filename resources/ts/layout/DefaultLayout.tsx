import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { connect, useSelector } from 'react-redux'
import { loadCurrentUser } from '@/redux/actions'
import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state: any) => state.authApp)

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/auth', {
        replace: true,
      })
      return
    }
  }, [currentUser])

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
