import { Icon } from '@iconify/react'
import clsx from 'clsx'

interface Props {
  className?: string
  value: string
  setValue: React.Dispatch<string>
}

const AddressInput: React.FC<Props> = ({ className, value, setValue }) => {
  return (
    <div
      className={clsx(
        'relative h-10 w-full rounded border border-gray-300/50',
        className,
      )}
    >
      <input
        type='text'
        className='h-full w-full bg-transparent py-2 pl-3 pr-7 text-sm outline-none'
        placeholder='Enter Ethereum wallet address'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <Icon
          icon={'mingcute:close-fill'}
          className='absolute right-2 top-1/2 size-4 -translate-y-1/2 cursor-pointer'
          onClick={() => setValue('')}
        />
      )}
    </div>
  )
}

export default AddressInput
