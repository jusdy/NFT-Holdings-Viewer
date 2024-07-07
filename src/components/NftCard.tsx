import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import clsx from 'clsx'
import { Metadata } from '@/types'

export default function NftCard({
  nft,
  loading = false,
}: {
  nft?: Metadata
  loading?: boolean
}) {
  return (
    <div className='w-full overflow-hidden rounded-xl border border-gray-300/50 bg-slate-700 shadow-md'>
      {loading ? (
        <Skeleton
          width='100%'
          containerClassName='aspect-square flex'
          className='h-full !rounded-none'
        />
      ) : (
        <Image
          src={nft!.image}
          alt={nft!.name}
          className='aspect-square w-full object-cover'
          width={360}
          height={360}
        />
      )}
      <div className='space-y-4 p-4 pt-6'>
        <h2 className='text-xl font-bold'>
          {loading ? <Skeleton className='opacity-70' /> : nft!.name}
        </h2>
        <p className='text-sm'>
          {loading ? (
            <Skeleton count={3} className='opacity-70' />
          ) : (
            nft!.description
          )}
        </p>
        <div className='space-y-2'>
          <h3 className='text-lg'>
            {loading ? (
              <Skeleton width={80} className='opacity-70' />
            ) : (
              'Attributes:'
            )}
          </h3>
          <ul
            className={clsx(
              'space-y-1 text-sm',
              loading ? 'list-none' : 'list-inside list-disc',
            )}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <li key={index}>
                    <Skeleton width='100%' className='opacity-70' />
                  </li>
                ))
              : nft!.attributes.map((attr, index) => (
                  <li key={index}>
                    <strong>{attr.trait_type}:</strong> {attr.value}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
