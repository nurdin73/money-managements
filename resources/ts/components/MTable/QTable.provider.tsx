import { IApiHooks, useApiHooks } from '@/app/hooks/api.hook'
import { createContext } from 'react'

interface IQTableContext extends IApiHooks {
    //
}

export const QTableContext = createContext<IQTableContext>(null as any)

const QTableProvider = ({ children }) => {
    const state = useApiHooks()

    const values = {
        ...state,
    }
    return <QTableContext.Provider value={values}>{children}</QTableContext.Provider>
}

export default QTableProvider
