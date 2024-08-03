import clsx from 'clsx'
import React from 'react'

export default function CustomDay({ day, date }) {
  return (
    <span
      className={clsx('custom-day', {
        'fw-semibold': date.getMonth() === new Date().getMonth(),
        // active:
        //   date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth(),
        'text-muted': date.getMonth() !== new Date().getMonth(),
      })}
    >
      {day}
    </span>
  )
}
