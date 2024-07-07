"use client";

import { Metadata } from '@/types';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import LoadingIcon from "@/assets/loading.svg";
import Image from 'next/image';
import NftCard from '@/components/NftCard';
import AddressInput from '@/components/AddressInput';

export default function Home() {
  const [wallet, setWallet] = useState('');
  const [nfts, setNfts] = useState<Metadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNFTs = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<{ assets: Metadata[] }>(`/api/nfts/${wallet}`);
      setNfts(response.data.assets);
    } catch (error) {
      setError('Failed to fetch NFTs');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-center text-blue-400 text-4xl mb-6">Pudgy Penguins NFT Viewer</h1>
      <form className="max-w-2xl mx-auto flex sm:flex-row flex-col items-center justify-center gap-2 mb-6" onSubmit={fetchNFTs}>
        <AddressInput value={wallet} setValue={setWallet} />
        <button type='submit' className="px-3 py-2 bg-blue-400 text-white rounded" disabled={loading || !wallet}>
          {loading ?
            <div className='flex items-center gap-1'>
              <Image src={LoadingIcon} alt={'loading'} className='animate-spin h-4 w-4 text-white' />
              Loading...
            </div>
            :
            "View NFTs"
          }
        </button>
      </form>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="flex flex-wrap justify-center">
        {loading ? Array(5).fill(0).map((_, index) => (
          <NftCard key={index} loading />
        )) :
          <>
            {nfts.length ? nfts.map((nft) => (
              <NftCard key={nft.id} nft={nft} />
            )) :
              <p>No NFTs</p>
            }
          </>
        }
      </div>
    </div>
  );
}
