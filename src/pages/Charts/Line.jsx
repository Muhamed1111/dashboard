import React from 'react'
import { ChartsHeader,Header,LineChart } from '../../components'
const Line = () => {
  return (
    <div className='dark:bg-secondary-dark-bg dark:text-white m-4 md-10 mt-24 p-10 bg-white rounded-3xl'>
      <Header title="Infaltion Rate" category="Chart"/>
        <div className='w-full'>
          <LineChart/>

        </div>
    </div>
  )
}

export default Line