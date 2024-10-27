import axiosInterceptorInstance from '@/helpers/axiosInterceptor'

export class MasterRoleService {
    static List(params?: any, signal?: any) {
        return axiosInterceptorInstance.get('/master/roles', {
            params,
            signal
        })
    }
    static Exports(params?: any, signal?: any) {
        return axiosInterceptorInstance.get('/master/roles/exports', {
            params,
            signal
        })
    }
    static Create(payload: any) {
        return axiosInterceptorInstance.post('/master/roles', payload)
    }
    static Update(id: any, payload: any) {
        return axiosInterceptorInstance.put(`/master/roles/${id}`, payload)
    }
    static Delete(id: any) {
        return axiosInterceptorInstance.delete(`/master/roles/${id}`)
    }
    static BulkDelete(ids: any[]) {
        return axiosInterceptorInstance.delete('/master/roles', {
            data: {
                ids
            }
        })
    }
}
