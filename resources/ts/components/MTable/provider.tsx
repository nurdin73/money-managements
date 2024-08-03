import { createContext } from 'react'
import useQtableHook from './hooks/Qtable.hook'

interface IMTableContext {
    //
}

export const MTableContext = createContext<IMTableContext>(null as any)

const QTableProvider = ({ children }) => {
    const values = useQtableHook()
    return <MTableContext.Provider value={values}>{children}</MTableContext.Provider>
}

export default QTableProvider
