import React, { useContext } from 'react'
import { GeneratorContext } from './provider'

const useGenerator = () => {
  const state = useContext(GeneratorContext)

  const handleSubmit = React.useCallback(() => {
    //
  }, [])

  return {
    ...state,
    handleSubmit,
  }
}

export default useGenerator
