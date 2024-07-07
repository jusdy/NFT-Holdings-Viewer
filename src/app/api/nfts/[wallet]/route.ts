import { NextApiRequest } from 'next';
import axios from 'axios';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextResponse } from 'next/server';
import { ApiResponse, Metadata } from '@/types';
import NodeCache from 'node-cache';

const API_KEY = process.env.OPENSEA_API_KEY;
const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes


export async function GET(_req: NextApiRequest, context: { params: Params }) {
  const { wallet } = context.params;

  if (!wallet || typeof wallet !== 'string') {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  const cacheKey = `nfts_${wallet}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("Cached Data");
    return NextResponse.json({ assets: cachedData }, { status: 200 });
  }

  try {
    const response = await axios.get<ApiResponse>(`https://api.opensea.io/api/v2/chain/ethereum/account/${wallet}/nfts`, {
      params: {
        collection: 'pudgypenguins',
      },
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

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

    cache.set(cacheKey, assets);
    return NextResponse.json({ assets }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}
