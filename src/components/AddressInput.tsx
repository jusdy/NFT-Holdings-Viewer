import { Icon } from "@iconify/react";

export default function AddressInput({ value, setValue }: { value: string, setValue: (value: string) => void }) {
    return (
        <div className="relative flex-grow sm:w-fit w-full">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter Ethereum wallet address"
                className="px-3 py-2 border border-gray-300 w-full rounded focus-within:outline-none bg-transparent"
            />
            {value &&
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setValue('')}>
                    <Icon icon={"mingcute:close-fill"} className="w-4 h-4 text-white cursor-pointer" />
                </button>
            }
        </div>
    );
}