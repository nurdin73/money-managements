import React from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

import { loadMasterCategory } from '@/redux/master/categories/action'
import MTable from '@/components/MTable'
import { MasterCategoryService } from '@/services/api/MasterCategoryService'

import { useMasterCategoryUtil } from './utils'
import MasterCategoryModal from './modal'

function MasterCategoryPage({ loadMasterCategoryList, masterCategoriesApp }) {
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
  } = useMasterCategoryUtil()
  const { data, loading, meta } = masterCategoriesApp

  const controller = React.useRef<AbortController | null>()

  React.useEffect(() => {
    controller.current = new AbortController()
    loadMasterCategoryList(filters, controller.current.signal)
    return () => {
      if (controller.current) controller.current.abort()
    }
  }, [filters])

  const onDestroy = React.useCallback(
    (data) => {
      Swal.fire({
        icon: 'warning',
        title: 'Hapus Kategori',
        text: `Apa kamu yakin ingin menghapus Kategori ${data.name}?`,
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        confirmButtonColor: 'var(--cui-primary)',
        cancelButtonColor: 'var(--cui-secondary)',
        background: 'var(--cui-body-bg)',
        color: 'var(--cui-body-color)',
      }).then((result) => {
        if (result.isConfirmed) {
          toast
            .promise(MasterCategoryService.Delete(data.id), {
              pending: 'Menghapus data Kategori',
              success: 'Data Kategori berhasil dihapus',
            })
            .catch((err) => {
              toast(err?.message, {
                type: 'error',
              })
            })
            .then(() => {
              loadMasterCategoryList(filters, controller.current?.signal)
            })
        }
      })
    },
    [filters]
  )

  const onBulkDestroy = React.useCallback(
    (ids: any[]) => {
      Swal.fire({
        icon: 'warning',
        title: 'Hapus Beberapa Kategori',
        text: `Apa kamu yakin ingin menghapus beberapa Kategori?`,
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        confirmButtonColor: 'var(--cui-primary)',
        cancelButtonColor: 'var(--cui-secondary)',
        background: 'var(--cui-body-bg)',
        color: 'var(--cui-body-color)',
      }).then((result) => {
        if (result.isConfirmed) {
          toast
            .promise(MasterCategoryService.BulkDelete(ids), {
              pending: 'Menghapus data Kategori',
              success: 'Data Kategori berhasil dihapus',
            })
            .catch((err) => {
              toast(err?.message, {
                type: 'error',
              })
            })
            .then(() => {
              loadMasterCategoryList(filters, controller.current?.signal)
            })
        }
      })
    },
    [filters]
  )

  return (
    <>
      <MTable
        title='Kategori'
        columns={columns}
        data={data}
        meta={meta}
        loading={loading}
        onSort={onSort}
        onSearch={onSearch}
        searchFields={['name']}
        onChangePage={onChangePage}
        onChangeLimit={onChangeLimit}
        onMultiSearch={onMultiSearch}
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
      <MasterCategoryModal onClose={onCloseModal} modal={modal} type={typeModal} />
    </>
  )
}

const mapStateToProps = ({ masterCategoriesApp }) => ({
  masterCategoriesApp,
})

export default connect(mapStateToProps, {
  loadMasterCategoryList: loadMasterCategory,
})(MasterCategoryPage)
