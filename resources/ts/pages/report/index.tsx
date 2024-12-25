import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'

const ReportPage: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Income',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'Expenses',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  }

  return (
    <div>
      <h2>Financial Report</h2>
      <CChartLine data={data} />
    </div>
  )
}

export default ReportPage
