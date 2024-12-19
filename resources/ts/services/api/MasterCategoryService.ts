import axiosInterceptorInstance from '@/helpers/axiosInterceptor'

export class MasterCategoryService {
    static List(params?: any, signal?: any) {
        return axiosInterceptorInstance.get('/master/categories', {
            params,
            signal
        })
    }
    static Exports(params?: any, signal?: any) {
        return axiosInterceptorInstance.get('/master/categories/exports', {
            params,
            signal
        })
    }
    static Create(payload: any) {
        return axiosInterceptorInstance.post('/master/categories', payload)
    }
    static Update(id: any, payload: any) {
        return axiosInterceptorInstance.put(`/master/categories/${id}`, payload)
    }
    static Delete(id: any) {
        return axiosInterceptorInstance.delete(`/master/categories/${id}`)
    }
    static BulkDelete(ids: any[]) {
        return axiosInterceptorInstance.delete('/master/categories', {
            data: {
                ids
            }
        })
    }
}
