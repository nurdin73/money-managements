import React from 'react'
import AsyncSelect from 'react-select/async'
import debouncePromise, { DebouncedFunction } from '@/helpers/debounce'
import { TOptions } from '@/components/MTable/types'
import './style.css'
import axiosInterceptorInstance from '@/helpers/axiosInterceptor'
import { useFormikContext } from 'formik'
import { toast } from 'react-toastify'

export default function AutoComplete(props) {
  const formikContext = useFormikContext<any>()
  const [onRequest, setOnRequest] = React.useState(false)

  const fetchDataOptions = React.useCallback(
    async (inputValue: string) => {
      if (props.disabled) {
        return []
      }
      if (props.urlAutoComplete && !onRequest && !props.disabled) {
        setOnRequest(true)
        const response = await axiosInterceptorInstance.get(props.urlAutoComplete, {
          params: {
            search: inputValue,
            ...props.paramAutoComplete,
          },
        })
        const items: TOptions[] = response.data.data.map((item: any) => {
          if (!props.jsonOptions) {
            return {
              label: item.name,
              value: item.id,
            }
          }
          return props.jsonOptions(item)
        })
        setOnRequest(false)
        return items
      }
    },
    [props]
  )

  const delayedSearch: DebouncedFunction<typeof fetchDataOptions> = debouncePromise(
    fetchDataOptions,
    1000
  )

  const loadOptions = React.useCallback(
    (inputValue: string) =>
      new Promise((resolve: (options: TOptions[]) => void, reject) => {
        delayedSearch(inputValue)
          .then((results) => results)
          .then((results) => {
            if (results) {
              resolve(results)
            }
          })
          .catch((err) => {
            reject(err)
            toast.error(err?.message ?? '')
          })
      }),
    []
  )

  return (
    <>
      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions
        defaultValue={formikContext.values ? formikContext.values[props.name] : null}
        cacheOptions
        value={formikContext.values ? formikContext.values[props.name] : null}
        placeholder={props.placeholder ?? `Search ${props.label}`}
        isMulti={props.multiple}
        isDisabled={props.disabled}
        className='react-select-container'
        classNamePrefix='react-select'
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </>
  )
}
