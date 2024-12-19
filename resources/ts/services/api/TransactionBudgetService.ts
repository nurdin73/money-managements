import axiosInterceptorInstance from '@/helpers/axiosInterceptor'

export class TransactionBudgetService {
    static List(params?: any, signal?: any) {
        return axiosInterceptorInstance.get('/transaction/budgets', {
            params,
            signal
        })
    }
    static Exports(params?: any, signal?: any) {
        return axiosInterceptorInstance.get('/transaction/budgets/exports', {
            params,
            signal
        })
    }
    static Create(payload: any) {
        return axiosInterceptorInstance.post('/transaction/budgets', payload)
    }
    static Update(id: any, payload: any) {
        return axiosInterceptorInstance.put(`/transaction/budgets/${id}`, payload)
    }
    static Delete(id: any) {
        return axiosInterceptorInstance.delete(`/transaction/budgets/${id}`)
    }
    static BulkDelete(ids: any[]) {
        return axiosInterceptorInstance.delete('/transaction/budgets', {
            data: {
                ids
            }
        })
    }
}
