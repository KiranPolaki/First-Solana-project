import { FC } from "react";
import dynamic from "next/dynamic";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import ns from "./SVG/NetworkSwitcherSVG";

const NetworkSwitcher = () => {
  const { networkConfiguration, setNetworkConfiguration } =
    useNetworkConfiguration();
  return (
    <>
      <input type="checkbox" id="checkbox" />
      <label className="rounded-lg bg-black p-1 font-mono text-gray-100 px-2">
        <select
          value={networkConfiguration}
          onChange={(e) => setNetworkConfiguration(e.target.value || "devnet")}
          className="select max-w-xs border-none outline-0 p-2 bg-black focus:outline-none"
        >
          //TODO: fix styling of the menu options
          <option value="mainnet-beta">main</option>
          <option value="devnet">dev</option>
          <option value="testnet">test</option>
        </select>
      </label>
    </>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), {
  ssr: false,
});
