'use client'

import { FormEvent, useState, useTransition } from 'react'
import { Icon } from '@iconify/react'
import axios from 'axios'
import AddressInput from '@/components/AddressInput'
import NftCard from '@/components/NftCard'
import { Metadata } from '@/types'

export default function Home() {
  const [wallet, setWallet] = useState('')
  const [nfts, setNfts] = useState<Metadata[]>([])
  const [isLoading, startTransition] = useTransition()
  const [error, setError] = useState('')

  const fetchNFTs = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        const response = await axios.get<{ assets: Metadata[] }>(
          `/api/nfts/${wallet}`,
        )
        setNfts(response.data.assets)
      } catch (error) {
        setError('Failed to fetch NFTs')
      }
    })
  }

  return (
    <div className='py-12'>
      <div className='container space-y-6'>
        <h1 className='text-center text-4xl font-bold text-blue-400'>
          Pudgy Penguins NFT Viewer
        </h1>
        <form
          className='mx-auto flex max-w-2xl items-center'
          onSubmit={fetchNFTs}
        >
          <AddressInput
            className='rounded-r-none border-r-0'
            value={wallet}
            setValue={setWallet}
          />
          <button
            type='submit'
            className='h-10 whitespace-nowrap rounded-r bg-blue-400 px-3 py-2 text-sm disabled:cursor-not-allowed'
            disabled={isLoading || !wallet}
          >
            {isLoading ? (
              <div className='flex items-center gap-1'>
                <Icon
                  icon='eos-icons:loading'
                  className='size-4 animate-spin'
                />
                Loading...
              </div>
            ) : (
              'View NFTs'
            )}
          </button>
        </form>

        {error && <p className='text-center text-red-600'>{error}</p>}

        <div className='grid grid-cols-4 gap-4 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1'>
          {isLoading ? (
            Array(4)
              .fill(0)
              .map((_, index) => <NftCard key={index} loading />)
          ) : (
            <>
              {nfts.length ? (
                nfts.map((nft) => <NftCard key={nft.id} nft={nft} />)
              ) : (
                <p className='col-span-4 text-center'>No NFTs</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
