import { FC } from "react";

import {} from "react-icons/md";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import pkg from "../../../package.json";

export const HomeView: FC = ({ setOpenCreateModal }) => {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-[72px]">
      <div className="px-6 py-4">
        <div className="bg-default-950/40 rounded-2xl">
          <div className="container">
            <div className="p-6">
              <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="bg-primary/10 -z-1 start-0 absolute top-0 h-14 w-14 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none"></div>
              </div>
              <div>
                <span className="text-primary bg-primary/20 rounded-md px-3 py-1 text-sm font-medium uppercase tracking-wider">
                  Create Solana TOken {pkg.version}
                </span>
                <h1 className="md:text-5xl/tight my-4 max-w-lg text-4xl font-medium text-white">
                  Now Solana Create token without code
                </h1>
                <p className="text-default-300 md:text-lg">
                  Launch Your Solana token, All in one Solana token development
                  and deployment
                </p>
                <div className="new_add_css">
                  <a
                    onClick={() => setOpenCreateModal(true)}
                    className="pe-4 group mt-10 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-1 text-white "
                  >
                    Create
                  </a>
                  <a className="mt-8">
                    <WalletMultiButton />
                  </a>
                </div>
              </div>
              <div className="mx-auto h-[595px] overflow-hidden">
                <div className="marquee grid grid-col gap-6">
                  <div className="relative m-auto flex flex-col gap-6 overflow-hidden">
                    <div className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6">
                      {["img-9", "img-6", "img-7", "img-21"].map(
                        (image, index) => (
                          <img
                            src={`assets/images/ai/${image}.jpg`}
                            alt="ai-generated images"
                            key={index}
                            className="aspect-1 h-full w-60 rounded-xl object-cover"
                          />
                        )
                      )}
                    </div>
                    <div
                      arial-hideen="true"
                      className="marquee-hero flex min-h-full flex-shirnk-0 flex-col items-center justify-around gap-6"
                    >
                      {["img-9", "img-6", "img-7", "img-21"].map(
                        (image, index) => (
                          <img
                            src={`assets/images/ai/${image}.jpg`}
                            alt="ai-generated images"
                            key={index}
                            className="aspect-1 h-full w-60 rounded-xl object-cover"
                          />
                        )
                      )}
                    </div>
                    <div className="marquee-reverse m-auto flex flex-col gap-6 overflow-hidden">
                      <div className="marquee-hero flex min-h-full flex-shirnk-0 flex-col items-center justify-around gap-6">
                        {["img-9", "img-6", "img-7", "img-21"].map(
                          (image, index) => (
                            <img
                              src={`assets/images/ai/${image}.jpg`}
                              alt="ai-generated images"
                              key={index}
                              className="aspect-1 h-full w-60 rounded-xl object-cover"
                            />
                          )
                        )}
                      </div>
                      <div
                        arial-hideen="true"
                        className="marquee-hero flex min-h-full flex-shirnk-0 flex-col items-center justify-around gap-6"
                      >
                        {["img-9", "img-6", "img-7", "img-21"].map(
                          (image, index) => (
                            <img
                              src={`assets/images/ai/${image}.jpg`}
                              alt="ai-generated images"
                              key={index}
                              className="aspect-1 h-full w-60 rounded-xl object-cover"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
