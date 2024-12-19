import React from 'react'
import { TOptions } from '../MTable/types'
import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { getIn, useFormikContext } from 'formik'
import DatePickerForm from './DatePicker'
import AutoComplete from './AutoComplete'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import clsx from 'clsx'

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
  readOnly?: boolean
  direction?: 'horizontal' | 'vertical'
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
    const mapping = {
      email: (
        <CFormInput
          invalid={!!errorMessage}
          valid={getIn(formikContext.touched, props.name) && !errorMessage}
          name={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readOnly={props.readOnly}
          size={props.size}
          feedbackInvalid={errorMessage}
          defaultValue={defaultValue}
          onChange={(e) => {
            formikContext.handleChange(e)
            if (props.onChange) {
              props.onChange(e)
            }
          }}
          onBlur={formikContext.handleBlur}
        />
      ),
      text: (
        <CFormInput
          invalid={!!errorMessage}
          valid={getIn(formikContext.touched, props.name) && !errorMessage}
          name={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          size={props.size}
          readOnly={props.readOnly}
          feedbackInvalid={errorMessage}
          defaultValue={defaultValue}
          onChange={(e) => {
            formikContext.handleChange(e)
            if (props.onChange) {
              props.onChange(e)
            }
          }}
          onBlur={formikContext.handleBlur}
        />
      ),
      number: (
        <CFormInput
          invalid={!!errorMessage}
          valid={getIn(formikContext.touched, props.name) && !errorMessage}
          name={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          size={props.size}
          readOnly={props.readOnly}
          feedbackInvalid={errorMessage}
          defaultValue={defaultValue}
          value={defaultValue}
          type={props.type}
          onChange={(e) => {
            formikContext.handleChange(e)
            if (props.onChange) {
              props.onChange(e)
            }
          }}
          onBlur={formikContext.handleBlur}
        />
      ),
      textarea: (
        <CFormTextarea
          invalid={!!errorMessage}
          valid={getIn(formikContext.touched, props.name) && !errorMessage}
          name={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readOnly={props.readOnly}
          feedbackInvalid={errorMessage}
          defaultValue={defaultValue}
          onChange={(e) => {
            formikContext.handleChange(e)
            if (props.onChange) {
              props.onChange(e)
            }
          }}
          onBlur={formikContext.handleBlur}
          rows={7}
        />
      ),
      switch: (
        <CFormSwitch
          invalid={!!errorMessage}
          valid={getIn(formikContext.touched, props.name) && !errorMessage}
          defaultChecked={defaultValue}
          onChange={(e) => {
            formikContext.setFieldValue(props.name, e.target.checked)
            formikContext.handleChange(e)
            if (props.onChange) {
              props.onChange(e)
            }
          }}
          onBlur={formikContext.handleBlur}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      ),
      select: (
        <CFormSelect
          invalid={!!errorMessage}
          valid={getIn(formikContext.touched, props.name) && !errorMessage}
          name={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          size={props.size}
          readOnly={props.readOnly}
          options={props.options}
          feedbackInvalid={errorMessage}
          defaultValue={defaultValue}
          onChange={(e) => {
            formikContext.handleChange(e)
            if (props.onChange) {
              props.onChange(e)
            }
          }}
          onBlur={formikContext.handleBlur}
        />
      ),
      checkbox: (
        <CFormCheck
          invalid={!!errorMessage}
          valid={getIn(formikContext.touched, props.name) && !errorMessage}
          defaultChecked={defaultValue}
          onChange={(e) => {
            formikContext.setFieldValue(props.name, e.target.checked)
            formikContext.handleChange(e)
            if (props.onChange) {
              props.onChange(e)
            }
          }}
          onBlur={formikContext.handleBlur}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      ),
      radio: (
        <CFormCheck
          type='radio'
          invalid={!!errorMessage}
          valid={getIn(formikContext.touched, props.name) && !errorMessage}
          defaultChecked={defaultValue}
          onChange={(e) => {
            formikContext.setFieldValue(props.name, e.target.checked)
            formikContext.handleChange(e)
            if (props.onChange) {
              props.onChange(e)
            }
          }}
          onBlur={formikContext.handleBlur}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      ),
      password: (
        <div className='position-relative'>
          <CFormInput
            invalid={!!errorMessage}
            name={props.name}
            placeholder={props.placeholder}
            disabled={props.disabled}
            size={props.size}
            type={isShowPassword ? 'text' : 'password'}
            feedbackInvalid={errorMessage}
            defaultValue={defaultValue}
            onChange={(e) => {
              formikContext.handleChange(e)
              if (props.onChange) {
                props.onChange(e)
              }
            }}
            onBlur={formikContext.handleBlur}
          />
          <CButton
            onClick={togglePassword}
            variant='ghost'
            type='button'
            color=''
            className='position-absolute d-flex justify-content-center align-items-center'
            style={{
              top: 0,
              right: 0,
              width: 42,
              height: 37,
            }}
          >
            {isShowPassword ? <BsEyeSlash /> : <BsEye />}
          </CButton>
        </div>
      ),
      autocomplete: (
        <AutoComplete
          {...props}
          onChange={(val) => {
            formikContext.setFieldValue(props.name, val)
            formikContext.setFieldTouched(props.name)
            if (props.onChange) {
              props.onChange(val)
            }
          }}
          onBlur={() => formikContext.setFieldTouched(props.name)}
        />
      ),
      date: (
        <DatePickerForm
          {...props}
          defaultValue={defaultValue}
          onChange={(val) => {
            formikContext.setFieldValue(props.name, val)
            if (props.onChange) {
              props.onChange(val)
            }
          }}
          onBlur={formikContext.handleBlur}
        />
      ),
    }
    return mapping[props.type]
  }, [props, errorMessage, defaultValue, togglePassword, isShowPassword])

  return (
    <CRow className='mb-2'>
      <CFormLabel
        htmlFor={props.name}
        className={clsx('col-form-label text-truncate', {
          'col-md-2': props.direction === 'horizontal',
          'd-none': props.type === 'checkbox',
        })}
      >
        {props.label} {props.required && <sup className='text-danger'>*</sup>}
      </CFormLabel>
      <CCol md={props.direction === 'horizontal' ? 10 : 12}>{render}</CCol>
    </CRow>
  )
}

export default React.memo(FormControllerMemo)
