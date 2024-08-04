import { createContext } from 'react'

interface IMTableContext {
  //
}

export const MTableContext = createContext<IMTableContext>(null as any)

const MTableProvider = ({ children }) => {
  const values = {
    //
  }
  return <MTableContext.Provider value={values}>{children}</MTableContext.Provider>
}

export default MTableProvider
