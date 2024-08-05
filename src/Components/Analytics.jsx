import React from 'react'
import BarGraph from './Bargraph'

const Analytics = ({allProducts}) => {
  return (
    <div className='analytics-container'>
        <h3>Analytics about the company products</h3>
        <BarGraph data = {allProducts} />
    </div>
  )
}

export default Analytics