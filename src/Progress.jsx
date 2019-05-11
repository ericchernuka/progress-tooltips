import clsx from 'clsx'
import React from 'react'

const ROUND_PRECISION = 1000

function getPercentage(now, min, max) {
  const percentage = ((now - min) / (max - min)) * 100
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION
}

const Progress = React.forwardRef(
  (
    {
      children,
      className,
      now = 0,
      min = 0,
      max = 100,
      style,
      multi = false,
      bar,
      srOnly = false,
      label,
      variant,
      ...attributes
    },
    ref
  ) => {
    const ProgressBar = multi ? (
      children
    ) : (
      <div
        {...attributes}
        ref={ref}
        role="progressbar"
        className={clsx(className, `progress-bar`, {
          [`bg-${variant}`]: variant,
        })}
        style={{ width: `${getPercentage(now, min, max)}%`, ...style }}
        aria-valuenow={now}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {srOnly ? <span className="sr-only">{label}</span> : label}
      </div>
    )

    if (bar) {
      return ProgressBar
    }

    return (
      <div
        ref={ref}
        {...attributes}
        style={multi ? style : null}
        className={clsx('progress', className)}
        children={ProgressBar}
      />
    )
  }
)

export default Progress
