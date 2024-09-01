import { FC, useState } from "react";
import { LuMenu } from "react-icons/lu";
import NetworkSwitcher from "./NetworkSwitcher";
import Link from "next/link";

export const AppBar: FC = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menu = [
    { name: "Home", link: "#home" },
    { name: "Features", link: "#features" },
    { name: "Price", link: "#price" },
    { name: "Tools", link: "#tools" },
    { name: "Faq", link: "#faq" },
  ];

  return (
    <div>
      <header id="navbar-sticky" className="navbar">
        <div className="container">
          <nav>
            <a href="/" className="logo">
              <img src="assets/images/logo1.png" alt="logo" className="h-10" />
            </a>
            <div className="ms-auto items-center flex px-2.5 lg:hidden">
              <button
                className="bg-default-100/5 inline-flex h-9 w-12 items-center justify-center rounded-md border border-white/20"
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <LuMenu />
              </button>
            </div>
            <div
              className={`mx-auto mt-2 ${
                isMenuOpen ? "flex" : "hidden"
              } grow basis-full items-center justify-center transition-all duration-300 lg:mt-0 lg:flex lg:basis-auto`}
              id="mobileMenu"
            >
              <ul id="navbar-navlist" className="navbar-nav">
                {menu.map((list, i) => (
                  <li className="nav-item" key={i}>
                    <a className="nav-link" href={`${list.link}`}>
                      {list.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <NetworkSwitcher />
          </nav>
        </div>
      </header>
      {props.children}
    </div>
  );
};
