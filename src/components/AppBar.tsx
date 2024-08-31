import { FC } from "react";
import { LuMenu } from "next/link";
import NetworkSwitcher from "./NetworkSwitcher";

export const AppBar: FC = (props) => {
  const menu = [
    { name: "Home", link: "#home" },
    { name: "Features", link: "#features" },
    { name: "Price", link: "#price" },
    { name: "Tools", link: "#tools" },
    { name: "Faq", link: "#faq" },
  ];
  return (
    <div>
      <header id="navbar-sticky" className="navbar"></header>
    </div>
  );
};
