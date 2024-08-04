import React from 'react'
import { TOptions } from '../MTable/types'
import {
  CButton,
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
import { BsEye, BsEyeSlash } from 'react-icons/bs'

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
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false)
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

  const togglePassword = React.useCallback(() => {
    setIsShowPassword((prev) => !prev)
  }, [])

  const render = React.useMemo(() => {
    const { handleChange, handleBlur, touched } = useFormikContext()
    const mapping = {
      email: (
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
      password: (
        <div className='position-relative'>
          <CFormInput
            invalid={!!errorMessage}
            {...props}
            type={isShowPassword ? 'text' : 'password'}
            feedbackInvalid={errorMessage}
            defaultValue={defaultValue}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <CButton
            onClick={togglePassword}
            variant='ghost'
            type='button'
            color='secondary'
            className='position-absolute d-flex justify-content-center align-items-center'
            style={{
              top: 32,
              right: 0,
              width: 42,
              height: 37,
            }}
          >
            {isShowPassword ? <BsEyeSlash /> : <BsEye />}
          </CButton>
        </div>
      ),
      autocomplete: <AutoComplete {...props} onChange={handleChange} onBlur={handleBlur} />,
      date: <DatePickerForm {...props} onChange={handleChange} onBlur={handleBlur} />,
    }
    return mapping[props.type]
  }, [props, errorMessage, defaultValue, togglePassword, isShowPassword])

  return (
    <div className='mb-2'>
      {props.required && (
        <CFormLabel>
          <sup className='text-danger'>*</sup>
        </CFormLabel>
      )}
      {render}
    </div>
  )
}

export default React.memo(FormControllerMemo)
