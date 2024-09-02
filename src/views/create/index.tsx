import React, { FC, useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
  createCreateMetadataAccountInstruction,
} from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { notify } from "utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import { AiOutlineClose } from "react-icons/ai";
import CreateSVG from "../../components/SVG/CreateSVG";
import Branding from "../../components/Branding";
import { InputView } from "views";

interface CreateViewProps {
  setOpenCreateModal: (open: boolean) => void;
}

export const CreateView: FC<CreateViewProps> = ({ setOpenCreateModal }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const [tokenUri, setTokenUri] = useState("");
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState({
    name: "",
    symbol: "",
    amount: "",
    image: "",
    description: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setToken({ ...token, [fieldName]: e.target.value });
  };

  const createToken = useCallback(
    async (token) => {
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeyPair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(
        mintKeyPair.publicKey,
        publicKey
      );
      try {
        const metadataUrl = await uploadMetadata(token);
        console.log(metadataUrl);
        const createMetadataInstrcution =
          createCreateMetadataAccountV3Instruction(
            {
              metadata: PublicKey.findProgramAddressSync(
                [
                  Buffer.from("metadata"),
                  PROGRAM_ID.toBuffer(),
                  mintKeyPair.publicKey.toBuffer(),
                ],
                PROGRAM_ID
              )[0],
              mint: mintKeyPair.publicKey,
              mintAuthority: publicKey,
              payer: publicKey,
              updateAuthority: publicKey,
            },
            {
              createMetadataAccountArgsV3: {
                data: {
                  name: token.name,
                  symbol: token.symbol,
                  uri: metadataUrl,
                  creators: null,
                  sellerFeeBasisPoints: 0,
                  uses: null,
                  collection: null,
                },
                isMutable: false,
                collectionDetails: null,
              },
            }
          );

        const createNewTokenTransaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintKeyPair.publicKey,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMintInstruction(
            mintKeyPair.publicKey,
            Number(token.decimals),
            publicKey,
            publicKey,
            TOKEN_PROGRAM_ID
          ),
          createAssociatedTokenAccountInstruction(
            publicKey,
            tokenATA,
            publicKey,
            mintKeyPair.publicKey
          ),
          createMintToInstruction(
            mintKeyPair.publicKey,
            tokenATA,
            publicKey,
            Number(token.amount) * Math.pow(10, Number(token.decimals))
          ),
          createMetadataInstrcution
        );

        const signature = await sendTransaction(
          createNewTokenTransaction,
          connection,
          {
            signers: [mintKeyPair],
          }
        );

        {
          console.log(
            "mintKeyPair.publicKey.toString()",
            mintKeyPair.publicKey.toString()
          );
        }

        setTokenMintAddress(mintKeyPair.publicKey.toString());
        notify({
          type: "success",
          message: "Token created successfully",
          txid: signature,
        });
      } catch (error: any) {
        notify({ type: "error", message: "Token Creation failed, try later" });
      }
      setIsLoading(false);
    },
    [publicKey, connection, sendTransaction]
  );

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = await uploadImagePinata(file);
      setToken({ ...token, image: imgUrl });
    }
  };

  const uploadImagePinata = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "312c648735964a92cb3b",
            pinata_secret_api_key:
              "37c91d0ac3e7c65ef92c33ee326ea45feeb9a9cba7103c0a92d1e22273298904",
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash =
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash;
        return ImgHash;
      } catch (error: any) {
        notify({ type: "erorr", message: "Upload to pinnata Image failed" });
      }
      setIsLoading(false);
    }
  };

  const uploadMetadata = async (token) => {
    setIsLoading(true);
    const { name, symbol, description, image } = token;
    if (!name || !symbol || !description || !image) {
      notify({ type: "erorr", message: "Data is missing" });
    }
    const data = JSON.stringify({ name, symbol, description, image });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: "312c648735964a92cb3b",
          pinata_secret_api_key:
            "37c91d0ac3e7c65ef92c33ee326ea45feeb9a9cba7103c0a92d1e22273298904",
          "Content-Type": "application/json",
        },
      });
      const url = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash;
      return url;
    } catch (error: any) {
      notify({
        type: "erorr",
        message: "Upload to pinata JSON failed",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex  h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]">
          <ClipLoader />
        </div>
      )}
      {!tokenMintAddress ? (
        <section className="flex w-full items-center py-6 px-0 lg:h-screen lg:p-10">
          <div className="container">
            <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="ps-4 hidden py-4 lg:block">
                  <div className="upload relative w-full overflow-hidden rounded-xl ">
                    {token.image ? (
                      <img src={token.image} alt="token" className="w-2/5" />
                    ) : (
                      <label htmlFor="file" className="custom-file-upload">
                        <div className="icon">
                          <CreateSVG />
                        </div>
                        <div className="text">
                          <span className="">Click to Upload</span>
                        </div>
                        <input
                          type="file"
                          id="file"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                  <textarea
                    rows={6}
                    onChange={(e) => handleFormFieldChange("description", e)}
                    className="mt-48 block border-default-200 relative w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                    placeholder="Description of your token"
                  ></textarea>
                </div>

                <div className="lg:ps-0 flex flex-col p-10">
                  <div className="pb-6 my-auto">
                    <h4 className="mb-4 tex-2xl font-bold text-white">
                      Solana TOken Creator
                    </h4>
                    <p className="text-default-300 mb-8 max-w-sm">
                      Kindly provide all the details about your token
                    </p>

                    <div className="">
                      <InputView
                        name="Name"
                        placeholder="name"
                        clickhandle={(e) => handleFormFieldChange("name", e)}
                      />
                      <InputView
                        name="Symbol"
                        placeholder="symbol"
                        clickhandle={(e) => handleFormFieldChange("symbol", e)}
                      />
                      <InputView
                        name="Decimals"
                        placeholder="decimals"
                        clickhandle={(e) =>
                          handleFormFieldChange("decimals", e)
                        }
                      />
                      <InputView
                        name="Amount"
                        placeholder="amount"
                        clickhandle={(e) => handleFormFieldChange("amount", e)}
                      />
                      <div className="mb-6 text-center">
                        <button
                          onClick={() => createToken(token)}
                          className="bg-primary-600/90 hover:bg-primary/100 group  mt-5 w-full inline-flex items-center justify-center rounded-lg text-white px-6 py-2 backdrop-blur-2xl transition-all duration-500 "
                          type="submit"
                        >
                          <span className="fw-build">Create Token</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-center">
                      <ul className="flex flex-wrap items-center justify-center gap-2 ">
                        <li>
                          <a
                            onClick={() => setOpenCreateModal(false)}
                            className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 duration-500 transition-all hover:bg-blue-600/60"
                          >
                            <i className="text-2xl text-white group-hover:text-white">
                              <AiOutlineClose />
                            </i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex w-full items-center py-6 px-0 lg:h-screen lg:p-10">
          <div className="container">
            <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
              <div className="grid gap-10 lg:grid-cols-2"></div>
              <Branding
                image="auth-img"
                title="solana token creator"
                message="Have some patience"
              />
              <div className="lg:ps-0 flex h-full flex-col p-10">
                <div className="pb-10">
                  <a className="flex">
                    <img src="assets/images/logo1.png" className="h-10 " />
                  </a>
                </div>

                <div className="my-auto pb-6 text-center">
                  <h4 className="mb-4 text-2xl fomt-bold text-white ">
                    Link your new Token
                  </h4>
                  <p className="text-white mx-auto mb-5 max-w-sm ">
                    Your Solana Token is successfully created check explorer
                  </p>
                  <div className="flex items-center justify-center">
                    <img
                      src={token.image || "assetslogo/logo1.png"}
                      alt=""
                      className="h-40"
                    />
                  </div>
                  <div className="mt-5 w-full text-center">
                    <p className="text-white text-base font-medium leading-6">
                      {/* <InputView
                        name={"Token Address"}
                        placeholder={tokenMintAddress}
                      /> */}
                      <p className="p-2 border-white">{tokenMintAddress}</p>
                      <span
                        onClick={() =>
                          navigator.clipboard.writeText(tokenMintAddress)
                        }
                      >
                        COPY
                      </span>
                    </p>
                    <div className="mb-6 text-center ">
                      <a
                        href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inlin-flex w-full items-center"
                      >
                        View on Solana
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
