import { Metadata } from "@/types";
import Image from "next/image";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function NftCard({ nft, loading = false }: { nft?: Metadata, loading?: boolean }) {
    return (
        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-md m-2 w-80 bg-slate-700">
            {loading ? (
                <Skeleton height={300} width="100%" />
            ) : (
                <Image src={nft!.image} alt={nft!.name} className="w-full h-auto" width={300} height={300} />
            )}
            <div className="p-4">
                <h2 className="text-xl my-2 font-bold">{loading ? <Skeleton /> : nft!.name}</h2>
                <p>{loading ? <Skeleton width={100} /> : `ID: ${nft!.id}`}</p>
                <p className="text-sm">{loading ? <Skeleton count={3} /> : nft!.description}</p>
                <div className="mt-2">
                    <h3 className="text-lg">{loading ? <Skeleton width={80} /> : 'Attributes:'}</h3>
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <li key={index}><Skeleton width={150} /></li>
                        ))
                    ) : (
                        nft!.attributes.map((attr, index) => (
                            <li key={index}>
                                <strong>{attr.trait_type}:</strong> {attr.value}
                            </li>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}