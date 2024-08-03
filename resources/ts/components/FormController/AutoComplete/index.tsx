import React from 'react'
import AsyncSelect from 'react-select/async'
import debouncePromise, { DebouncedFunction } from '@/helpers/debounce'
import { TOptions } from '@/components/MTable/types'
import axios from 'axios'
import './style.css'

export default function AutoComplete(props) {
  const fetchDataOptions = React.useCallback(
    async (inputValue: string) => {
      if (props.urlAutoComplete) {
        const response = await axios.get(props.urlAutoComplete, {
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
          })
      }),
    []
  )

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      defaultOptions
      cacheOptions
      placeholder={props.placeholder}
      isMulti={props.multiple}
      isDisabled={props.disabled}
      className='react-select-container'
      classNamePrefix='react-select'
    />
  )
}
