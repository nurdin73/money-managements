import { UniqueID } from '@/helpers/uniqueid'
import React, { createContext } from 'react'

type TField = {
  id: string
  field: string | null
  type: string | null
  nullable: boolean
  relationship: any
  defaultValue: any
}

type TFieldName = 'field' | 'type' | 'nullable' | 'relationship' | 'defaultValue'

interface IGenerator {
  fields: TField[]
  onAddField: () => void
  onRemoveField: (index) => void
  onEditField: (id: string, name: TFieldName, value: any) => void
}

export const GeneratorContext = createContext<IGenerator>(null as any)

const GeneratorProvider = ({ children }) => {
  const [fields, setFields] = React.useState<TField[]>([])
  // const timeout: any = React.useRef()
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

  const onAddField = React.useCallback(() => {
    const defaultField: TField = {
      id: UniqueID(),
      field: null,
      type: null,
      nullable: false,
      relationship: null,
      defaultValue: null,
    }
    setFields((prevFields) => {
      prevFields.push(defaultField)
      return prevFields
    })
    forceUpdate()
  }, [])

  const onRemoveField = React.useCallback((id) => {
    setFields((state) => {
      const newState = state
      const findIndex = newState.findIndex((item) => item.id === id)
      if (findIndex != -1) {
        newState.splice(findIndex, 1)
      }
      return newState
    })
    forceUpdate()
  }, [])

  const onEditField = React.useCallback(
    (id: string, name: TFieldName, value: any) => {
      const newFields = fields
      const findIndexField = newFields.findIndex((field) => field.id === id)
      if (findIndexField != -1) {
        newFields[findIndexField][name] = value
      }
      setFields(newFields)
      // TODO for check value of fields realtime
      forceUpdate()
    },
    [fields]
  )

  console.log(fields)

  const values = {
    fields,
    onAddField,
    onRemoveField,
    onEditField,
  }
  return <GeneratorContext.Provider value={values}>{children}</GeneratorContext.Provider>
}

export default GeneratorProvider
