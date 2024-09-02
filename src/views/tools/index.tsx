import { FC } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { LuArrowRightFromLine } from "react-icons/lu";
import { features } from "process";

interface ToolViewProps {
  setOpenAirDrop: (open: boolean) => void;
  setOpenContact: (open: boolean) => void;
  setOpenCreateModal: (open: boolean) => void;
  setOpenSendTransaction: (open: boolean) => void;
  setOpenTokenMetaData: (open: boolean) => void;
}

export const ToolView: FC<ToolViewProps> = ({
  setOpenAirDrop,
  setOpenContact,
  setOpenCreateModal,
  setOpenSendTransaction,
  setOpenTokenMetaData,
}) => {
  const tools = [
    {
      name: "Create Token",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
          className="lucide lucide-database"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
      ),
      description:
        "A Solana token is a digital asset that represents ownership of an asset on the Solana blockchain",
      function: setOpenCreateModal,
    },
    {
      name: "Token MetaData",
      description:
        "Token metadata is the additional information associated with a token on the Solana blockchain, such as its name, symbol, description, and image",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bitcoin"
        >
          <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
        </svg>
      ),
      function: setOpenTokenMetaData,
    },
    // {
    //   name: "Contact Us",
    //   icon: <MdGeneratingTokens />,
    //   function: setOpenContact,
    // },
    {
      name: "AirDrop",
      description:
        "An airdrop in Solana is the mass distribution of tokens to a list of wallets, typically as a promotional or reward method",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
          className="lucide lucide-plane"
        >
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      ),
      function: setOpenAirDrop,
    },
    {
      name: "Send Transaction",
      description:
        "The sendTransaction method in Solana submits a signed transaction to the cluster for processing.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
          className="lucide lucide-send-horizontal"
        >
          <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
          <path d="M6 12h16" />
        </svg>
      ),
      function: setOpenSendTransaction,
    },
    // {
    //   name: "Buddy Token",
    //   icon: <MdGeneratingTokens />,
    //   function: setOpenSendTransaction,
    // },
    // {
    //   name: "Top Token",
    //   icon: <MdGeneratingTokens />,
    //   function: setOpenSendTransaction,
    // },
    // {
    //   name: "Solana Explorer",
    //   icon: <MdGeneratingTokens />,
    //   function: setOpenSendTransaction,
    // },
  ];
  return (
    <section id="tools" className=" py-12">
      <div className="container">
        <div className="md-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center ">
            <h2 className="mb-4 text-4xl font-mono font-extrabold capitalize text-center text-white">
              Solana PowerFull tools
            </h2>
            <p className="text-default-200 text-sm font-mediums font-mono mb-8">
              Solana is a blockchain platform and cryptocurrency that allows for
              the creation and running of decentralized applications
            </p>
          </div>
        </div>
        <div className=" grid gap-6 sm:grid-col-2 lg:grid-cols-4 ">
          {tools.map((tool, index) => (
            <div
              className="bg-default-950/40 rounded-xl backdrop-blur-3xl hover:bg-red-800"
              onClick={() => tool.function(true)}
            >
              <div className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-white`}
                  >
                    <i data-lucide="dribble">{tool.icon}</i>
                  </div>
                  <h3 className="text-default-200 text-xl font-extrabold font-mono">
                    {tool.name}
                  </h3>
                </div>

                <p className="pb-4 text-white/60 font-mono text-sm max-h-38 h-full">
                  {tool.description}
                </p>
                <a className="cursor-pointer text-white bg-green-600 py-1 px-4 rounded-2xl hover:bg-green-700">
                  Try
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href=""
            className="cursor-pointer bg-black hover:bg-gray-800 flex py-2 px-4 items-center justify-center text-white rounded-3xl"
          >
            More Tools
            <IoIosArrowForward />
          </a>
        </div>
      </div>
    </section>
  );
};
