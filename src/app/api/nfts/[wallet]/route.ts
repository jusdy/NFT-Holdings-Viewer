import { type NextRequest } from 'next/server'
import axios from 'axios';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextResponse } from 'next/server';
import { ApiResponse, Metadata } from '@/types';
import NodeCache from 'node-cache';

const API_KEY = process.env.OPENSEA_API_KEY;

// Create a cache instance with a standard TTL of 300 seconds (5 minutes)
const cache = new NodeCache({ stdTTL: 300 });

export async function GET(_req: NextRequest, context: { params: Params }) {
  const { wallet } = context.params;

  if (!wallet || typeof wallet !== 'string') {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  // Define cache key based on wallet address
  const cacheKey = `nfts_${wallet}`;

  // Check if the data is already in cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Cached Data");
    return NextResponse.json({ assets: cachedData }, { status: 200 });
  }

  try {
    // Fetch NFTs data from OpenSea API
    const response = await axios.get<ApiResponse>(`https://api.opensea.io/api/v2/chain/ethereum/account/${wallet}/nfts`, {
      params: {
        collection: 'pudgypenguins',
      },
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    // Fetch metadata for each NFT and format the data
    const assets = await Promise.all(response.data.nfts.map(async asset => {
      const metadataResponse = await axios.get<Metadata>(asset.metadata_url);
      return {
        id: asset.identifier,
        name: metadataResponse.data.name,
        image: asset.display_image_url,
        description: metadataResponse.data.description,
        attributes: metadataResponse.data.attributes,
      };
    }));

    // Cache the fetched data
    cache.set(cacheKey, assets);

    return NextResponse.json({ assets }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}