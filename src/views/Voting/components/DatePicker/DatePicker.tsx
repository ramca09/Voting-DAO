import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Input, InputProps } from '@pancakeswap/uikit'

import 'react-datepicker/dist/react-datepicker.css'

export interface DatePickerProps extends ReactDatePickerProps {
  inputProps?: InputProps
}

const DatePicker: React.FC<React.PropsWithChildren<DatePickerProps>> = ({ inputProps = {}, ...props }) => {
  return (
    <ReactDatePicker
      customInput={<Input style={{ backgroundColor: 'transparent' }} {...inputProps} />}
      portalId="reactDatePicker"
      dateFormat="PPP"
      {...props}
    />
  )
}

export default DatePicker
