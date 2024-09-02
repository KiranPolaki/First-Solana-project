import { FC } from "react";

import {} from "react-icons/md";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import pkg from "../../../package.json";

interface HomeViewProps {
  setOpenCreateModal: (open: boolean) => void;
}

export const HomeView: FC<HomeViewProps> = ({ setOpenCreateModal }) => {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-[72px] ">
      <div className="px-20 py-12 w-full h-full">
        <div className="bg-default-950/40 rounded-2xl container-hero">
          <div className="container">
            <div className="p-6 py-20">
              <div className="flex items-center justify-center flex-col">
                <span className="text-white bg-gray-800 rounded-2xl px-4 py-1 text-sm font-medium uppercase tracking-wider hover:bg-red-500 cursor-pointera">
                  Create Solana Token {pkg.version}
                </span>
                <h1 className="md:text-6xl/tight my-4 max-w-4xl text-6xl tracking-wider text-white text-center font-mono font-extrabold p-12">
                  Create Solana Tokens and many more With ease
                </h1>
                <p className="text-gray-400 md:text-lg font-mono max-w-3xl text-center tracking-tighter">
                  Launch Your Solana token and get Airdrops, MetaData, All in
                  one Solana token development and deployment.
                </p>
                <div className="new_add_css p-7">
                  <a
                    onClick={() => setOpenCreateModal(true)}
                    className="text-white px-6 py-2 font-bold bg-green-500 rounded-2xl cursor-pointer hover:bg-green-700"
                  >
                    Create Token
                  </a>
                  <a className="">
                    <WalletMultiButton />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
