import {
  CButton,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useContext } from 'react'
import useGenerator from '../../hook'
import NotfoundData from '@/components/MTable/partials/NotfoundData'
import CIcon from '@coreui/icons-react'
import { cilCursorMove, cilTrash } from '@coreui/icons'
import { typeFields } from '../../constants'

function FieldColumns() {
  const { onAddField, fields, onRemoveField, onEditField } = useGenerator()

  return (
    <>
      <hr />
      <div className='d-flex flex-column gap-1'>
        <span className='fs-4'>Fields</span>
        <span>Note: ID is already include in field list</span>
      </div>
      <CTable className='mt-3' responsive bordered align='middle'>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Order</CTableHeaderCell>
            <CTableHeaderCell>Field Name</CTableHeaderCell>
            <CTableHeaderCell>Type</CTableHeaderCell>
            <CTableHeaderCell>Nullable</CTableHeaderCell>
            <CTableHeaderCell>Relationship</CTableHeaderCell>
            <CTableHeaderCell>Default Value</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {fields.length === 0 && (
            <CTableRow>
              <CTableDataCell colSpan={7}>
                <NotfoundData
                  message={
                    <CButton color='primary' onClick={onAddField}>
                      Add New Field
                    </CButton>
                  }
                />
              </CTableDataCell>
            </CTableRow>
          )}
          {fields.map((field) => (
            <CTableRow key={field.id}>
              <CTableDataCell>
                <CButton
                  variant='ghost'
                  className='w-100 d-flex justify-content-center align-items-center'
                >
                  <CIcon icon={cilCursorMove} />
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CFormInput
                  value={field.field as any}
                  onChange={(e) => {
                    onEditField(field.id, 'field', e.target.value)
                  }}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormSelect
                  value={field.type as any}
                  options={typeFields}
                  onChange={(e) => {
                    onEditField(field.id, 'type', e.target.value)
                  }}
                />
              </CTableDataCell>
              <CTableDataCell>
                <div className='d-flex justify-content-center w-100'>
                  <CFormCheck
                    checked={field.nullable}
                    onChange={(e) => {
                      onEditField(field.id, 'nullable', e.target.checked)
                    }}
                  />
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <CFormInput
                  value={field.relationship}
                  onChange={(e) => {
                    onEditField(field.id, 'relationship', e.target.value)
                  }}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormInput
                  value={field.defaultValue}
                  onChange={(e) => {
                    onEditField(field.id, 'defaultValue', e.target.value)
                  }}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CButton color='danger' onClick={() => onRemoveField(field.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {fields.length > 0 && (
        <CButton color='primary' onClick={onAddField}>
          Add Field
        </CButton>
      )}
    </>
  )
}

export default FieldColumns
