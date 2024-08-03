import { createContext } from 'react'
import useQtableHook from './hooks/Qtable.hook'

interface IQTableContext {
    //
}

export const QTableContext = createContext<IQTableContext>(null as any)

const QTableProvider = ({ children }) => {
    const values = useQtableHook()
    return <QTableContext.Provider value={values}>{children}</QTableContext.Provider>
}

export default QTableProvider
