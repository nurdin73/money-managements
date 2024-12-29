import axiosInterceptorInstance from "@/helpers/axiosInterceptor";

class DashboardService {
  static BasicStatistic(params: any) {
    return axiosInterceptorInstance.get('/dashboard/basic-statistic', {
      params
    })
  }
  static ExpenseDetail(params: any) {
    return axiosInterceptorInstance.get('/dashboard/expense-detail', {
      params
    });
  }

  static FinancialIndicator(params: any) {
    return axiosInterceptorInstance.get('/dashboard/financial-indicator', {
      params
    });
  }

  static BudgetSummary(params: any) {
    return axiosInterceptorInstance.get('/dashboard/budget-summary', {
      params
    });
  }

  static LastTransaction(params: any) {
    return axiosInterceptorInstance.get('/dashboard/last-transaction', {
      params
    });
  }

  static BudgetEffeciency(params: any) {
    return axiosInterceptorInstance.get('/dashboard/budget-effeciency', {
      params
    })
  }
}

export default DashboardService