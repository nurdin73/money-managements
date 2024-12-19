import axiosInterceptorInstance from '@/helpers/axiosInterceptor'

export class TransactionIncomeExpenseService {
    static List(params?: any, signal?: any) {
        return axiosInterceptorInstance.get('/transaction/income-expenses', {
            params,
            signal
        })
    }
    static Exports(params?: any, signal?: any) {
        return axiosInterceptorInstance.get('/transaction/income-expenses/exports', {
            params,
            signal
        })
    }
    static Create(payload: any) {
        return axiosInterceptorInstance.post('/transaction/income-expenses', payload)
    }
    static Update(id: any, payload: any) {
        return axiosInterceptorInstance.put(`/transaction/income-expenses/${id}`, payload)
    }
    static Delete(id: any) {
        return axiosInterceptorInstance.delete(`/transaction/income-expenses/${id}`)
    }
    static BulkDelete(ids: any[]) {
        return axiosInterceptorInstance.delete('/transaction/income-expenses', {
            data: {
                ids
            }
        })
    }
}
