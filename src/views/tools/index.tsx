import { FC } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { LuArrowRightFromLine } from "react-icons/lu";

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
      icon: <MdGeneratingTokens />,
      function: setOpenCreateModal,
    },
    {
      name: "Token MetaData",
      icon: <MdGeneratingTokens />,
      function: setOpenTokenMetaData,
    },
    // {
    //   name: "Contact Us",
    //   icon: <MdGeneratingTokens />,
    //   function: setOpenContact,
    // },
    {
      name: "AirDrop",
      icon: <MdGeneratingTokens />,
      function: setOpenAirDrop,
    },
    {
      name: "Send Transaction",
      icon: <MdGeneratingTokens />,
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
    <section id="tools" className="">
      <div className="container">
        <div className="md-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center ">
            <h2 className="mb-4 text-3xl font-medium capitalize text-center text-white">
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
                  <h3 className="text-default-200 text-xl font-medium">
                    {tool.name}
                  </h3>
                </div>

                <a className="cursor-pointer text-white bg-gray-600 py-1 px-4 rounded-2xl hover:bg-gray-800">
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
