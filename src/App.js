import '@reach/tooltip/styles.css'
import React, { useState } from 'react'
import './App.css'
import Progress from './Progress'
import TriangleTooltip from './TriangleTooltip'

const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

function getSum(total, num) {
  return total + num
}

function App() {
  const [, setCount] = useState(0)
  const max = 10000

  const emailValues = [
    { value: randomIntegerInRange(0, max), type: 'pending' },
    { value: randomIntegerInRange(0, max), type: 'scheduled' },
    { value: randomIntegerInRange(0, max), type: 'sent' },
    { value: randomIntegerInRange(0, max), type: 'delivered' },
    { value: randomIntegerInRange(0, max), type: 'undelivered' },
  ]

  const emailTotal = emailValues.map(v => v.value).reduce(getSum)

  const smsValues = [
    { value: randomIntegerInRange(0, max), type: 'pending' },
    { value: randomIntegerInRange(0, max), type: 'sent' },
    { value: randomIntegerInRange(0, max), type: 'undelivered' },
  ]

  const smsTotal = smsValues.map(v => v.value).reduce(getSum)

  const colorMap = {
    pending: 'warning',
    scheduled: 'info',
    sent: 'primary',
    delivered: 'success',
    undelivered: 'danger',
  }

  const legend = Object.keys(colorMap)

  return (
    <div className="App p-4" style={{ marginTop: 100 }}>
      <div className="d-flex">
        <div className="w-50 mr-2">
          <Progress multi style={{ height: '2rem' }}>
            {emailValues.map(({ value, type }) => (
              <TriangleTooltip
                key={`${type}:1`}
                label={<strong>{value}</strong>}
                ariaLabel={`${value} ${type} email messages`}
              >
                <Progress
                  bar
                  now={value}
                  max={emailTotal}
                  variant={colorMap[type]}
                  style={{ minWidth: value > 0 && '8px' }}
                  tabIndex={0}
                />
              </TriangleTooltip>
            ))}
          </Progress>
        </div>

        <div className="w-50 ml-2">
          <Progress multi style={{ height: '2rem' }}>
            {smsValues.map(({ value, type }) => (
              <TriangleTooltip
                key={`${type}:2`}
                label={<strong>{value}</strong>}
                ariaLabel={`${value} ${type} sms messages`}
              >
                <Progress
                  bar
                  now={value}
                  max={smsTotal}
                  variant={colorMap[type]}
                  style={{ minWidth: value > 0 && '8px' }}
                  tabIndex={0}
                />
              </TriangleTooltip>
            ))}
          </Progress>
        </div>
      </div>

      <div>
        <div className="d-flex justify-content-between flex-wrap">
          {legend.map(leg => (
            <div key={leg} className="d-flex align-items-center">
              <span className={`badge badge-pill badge-${colorMap[leg]} mr-2`}>
                {'   '}
              </span>
              <span>{leg}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setCount(c => c + 1)}
        >
          Randomize
        </button>
      </div>
    </div>
  )
}

export default App
