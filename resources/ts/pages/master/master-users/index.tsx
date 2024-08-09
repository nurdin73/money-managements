import React from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

import { loadMasterUser } from '@/redux/master/users/action'
import MTable from '@/components/MTable'
import { MasterUserService } from '@/services/api/MasterUserService'

import { useMasterUserUtil } from './utils'
import MasterUserModal from './modal'

function MasterUserPage({ loadMasterUserList, masterUsersApp }) {
  const {
    columns,
    onSearch,
    onSort,
    onChangePage,
    onCreate,
    onChangeLimit,
    filters,
    onMultiSearch,
    modal,
    onCloseModal,
    onEdit,
    typeModal,
    onMultiSearchFields,
  } = useMasterUserUtil()
  const { data, loading, meta } = masterUsersApp

  React.useEffect(() => {
    loadMasterUserList(filters)
  }, [filters])

  const onDestroy = React.useCallback(
    (data) => {
      Swal.fire({
        icon: 'warning',
        title: 'Hapus Master User',
        text: `Apa kamu yakin ingin menghapus Master User ${data.name}?`,
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        confirmButtonColor: 'var(--cui-primary)',
        cancelButtonColor: 'var(--cui-secondary)',
        background: 'var(--cui-body-bg)',
        color: 'var(--cui-body-color)',
      }).then((result) => {
        if (result.isConfirmed) {
          toast
            .promise(MasterUserService.Delete(data.id), {
              pending: 'Menghapus data Master User',
              success: 'Data Master User berhasil dihapus',
            })
            .catch((err) => {
              toast(err?.message, {
                type: 'error',
              })
            })
            .then(() => {
              loadMasterUserList(filters)
            })
        }
      })
    },
    [filters]
  )

  return (
    <>
      <MTable
        title='Master User'
        columns={columns}
        data={data}
        meta={meta}
        loading={loading}
        onSort={onSort}
        onSearch={onSearch}
        onChangePage={onChangePage}
        onChangeLimit={onChangeLimit}
        onMultiSearch={onMultiSearch}
        onSearchFields={onMultiSearchFields}
        onCreate={onCreate}
        filters={filters}
        actions={[
          {
            iconName: 'pencil',
            title: 'Edit',
            variant: 'secondary',
            onClick: (item) => {
              onEdit(item)
            },
          },
          {
            iconName: 'trash',
            title: 'Hapus',
            variant: 'secondary',
            onClick: (item) => {
              onDestroy(item)
            },
          },
        ]}
      />
      <MasterUserModal onClose={onCloseModal} modal={modal} type={typeModal} />
    </>
  )
}

const mapStateToProps = ({ masterUsersApp }) => ({
  masterUsersApp,
})

export default connect(mapStateToProps, {
  loadMasterUserList: loadMasterUser,
})(MasterUserPage)
