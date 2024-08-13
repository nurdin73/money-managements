import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilSettings, cilUser, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from '@/assets/images/avatars/8.jpg'
import { connect } from 'react-redux'
import { logoutUser } from '@/redux/actions'

const AppHeaderDropdown = ({ logoutUserAction }) => {
  return (
    <CDropdown placement='bottom-end' variant='nav-item'>
      <CDropdownToggle className='py-0 pe-0' caret={false}>
        <CAvatar src={avatar8} size='md' />
      </CDropdownToggle>
      <CDropdownMenu className='pt-0'>
        <CDropdownHeader className='bg-body-secondary fw-semibold my-2'> Settings </CDropdownHeader>
        <CDropdownItem href='#'>
          <CIcon icon={cilUser} className='me-2' />
          Profile
        </CDropdownItem>
        <CDropdownItem href='#'>
          <CIcon icon={cilSettings} className='me-2' />
          Ubah Sandi
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href='#' onClick={() => logoutUserAction()}>
          <CIcon icon={cilAccountLogout} className='me-2' />
          Keluar
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default connect(null, {
  logoutUserAction: logoutUser,
})(AppHeaderDropdown)
