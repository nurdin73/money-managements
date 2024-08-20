import React from 'react'
import { OptionProps } from 'react-select'

function CustomOption(props: OptionProps) {
  const { innerProps, innerRef, label, setValue } = props
  const data: any = props.data
  return (
    <div ref={innerRef} {...innerProps}>
      {label}
    </div>
  )
}

export default CustomOption
