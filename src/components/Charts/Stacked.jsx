import React from 'react'
import { Tooltip } from '@syncfusion/ej2-react-popups'
import { Category, ChartComponent, Inject, Legend, StackingColumnSeries } from '@syncfusion/ej2-react-charts'
import {
  stackedCustomSeries,stackedPrimaryXAxis,stackedPrimaryYAxis
} from '../../data/dummy'

const Stacked = ({width,height}) => {
  return (
   <ChartComponent
   width={width}
   height={height}
   id="stack chart"
   primaryXAxis={stackedPrimaryXAxis}
   primaryYAxis={stackedPrimaryYAxis}
   
   >
    <Inject services={[Legend,Category,StackingColumnSeries,Tooltip]}/>

   </ChartComponent>

  )
}

export default Stacked