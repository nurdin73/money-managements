import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from '@/assets/brand/logo'
import { sygnet } from '@/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'
import { cilDollar } from '@coreui/icons'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state: any) => state.defaultStateApp.sidebarUnfoldable)
  const sidebarShow = useSelector((state: any) => state.defaultStateApp.sidebarShow)

  return (
    <CSidebar
      className='border-end'
      colorScheme='dark'
      position='fixed'
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className='border-bottom'>
        <CSidebarBrand to='/'>
          <CIcon customClassName='sidebar-brand-full' icon={cilDollar} height={32} />
          <span>Managemen Keuangan</span>
        </CSidebarBrand>
        <CCloseButton
          className='d-lg-none'
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className='border-top d-none d-lg-flex'>
        <CSidebarToggler
          onClick={() =>
            dispatch({
              type: 'set',
              sidebarUnfoldable: !unfoldable,
            })
          }
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
