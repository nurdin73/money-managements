import React from 'react'
import { TOptions } from '../MTable/types'
import {
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CFormTextarea,
} from '@coreui/react'
import { getIn, useFormikContext } from 'formik'
import DatePickerForm from './DatePicker'
import axios from 'axios'
import debouncePromise, { DebouncedFunction } from '@/helpers/debounce'
import AutoComplete from './AutoComplete'

type JsonOptions = {
  label: any
  value: any
}

export interface FormControllerProps {
  name: string
  label: string
  size?: any
  type:
    | 'email'
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'autocomplete'
    | 'textarea'
    | 'creatable'
    | 'file'
    | 'password'
    | 'switch'
    | 'checkbox'
  urlAutoComplete?: string
  options?: TOptions[]
  placeholder?: string
  multiple?: boolean
  disabled?: boolean
  accept?: string
  checked?: boolean
  dateFormat?: string
  jsonOptions?: (row: any) => JsonOptions
  paramAutoComplete?: object
  onChange?: (event: any) => void
  asSingle?: boolean
  required?: boolean
  children?: React.ReactNode
}

function FormControllerMemo(props: FormControllerProps) {
  const formikContext = useFormikContext()
  const errorMessage = React.useMemo(() => {
    if (formikContext) {
      const { errors, touched } = formikContext
      return getIn(touched, props.name) && getIn(errors, props.name)
        ? getIn(errors, props.name)
        : null
    }
  }, [formikContext, props.name])

  const defaultValue = React.useMemo(() => {
    if (formikContext) {
      const { values } = formikContext
      return getIn(values, props.name)
    }
  }, [formikContext])

  const render = React.useMemo(() => {
    const { handleChange, handleBlur, touched } = useFormikContext()
    const mapping = {
      text: (
        <CFormInput
          invalid={!!errorMessage}
          valid={getIn(touched, props.name) && !errorMessage}
          {...props}
          feedbackInvalid={errorMessage}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ),
      textarea: (
        <CFormTextarea
          invalid={!!errorMessage}
          valid={getIn(touched, props.name) && !errorMessage}
          {...props}
          feedbackInvalid={errorMessage}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ),
      switch: (
        <CFormSwitch
          invalid={!!errorMessage}
          valid={getIn(touched, props.name) && !errorMessage}
          defaultChecked={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      ),
      select: (
        <CFormSelect
          invalid={!!errorMessage}
          valid={getIn(touched, props.name) && !errorMessage}
          {...props}
          feedbackInvalid={errorMessage}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ),
      checkbox: (
        <CFormCheck
          invalid={!!errorMessage}
          valid={getIn(touched, props.name) && !errorMessage}
          defaultChecked={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      ),
      autocomplete: <AutoComplete {...props} onChange={handleChange} onBlur={handleBlur} />,
      date: <DatePickerForm {...props} onChange={handleChange} onBlur={handleBlur} />,
    }
    return mapping[props.type]
  }, [props, errorMessage, defaultValue])

  return (
    <div className='mb-3'>
      <CFormLabel>{props.required && <sup className='text-danger'>*</sup>}</CFormLabel>
      {render}
    </div>
  )
}

export default React.memo(FormControllerMemo)
