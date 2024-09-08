import axiosInterceptorInstance from '@/helpers/axiosInterceptor'

export class MasterUserService {
    static List(params?: any, signal?: any) {
        return axiosInterceptorInstance.get('/master/users', {
            params,
            signal
        })
    }
    static Exports(params?: any) {
        return axiosInterceptorInstance.get('/master/users/exports', {
            params,
        })
    }
    static Create(payload: any) {
        return axiosInterceptorInstance.post('/master/users', payload)
    }
    static Update(id: any, payload: any) {
        return axiosInterceptorInstance.put(`/master/users/${id}`, payload)
    }
    static Delete(id: any) {
        return axiosInterceptorInstance.delete(`/master/users/${id}`)
    }
    static BulkDelete(ids: any[]) {
        return axiosInterceptorInstance.delete(`/master/users`, {
            data: {
                ids
            }
        })
    }
}
