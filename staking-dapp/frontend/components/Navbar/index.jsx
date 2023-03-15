import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between m-5">
      <h2 className="text-2xl font-medium">Buidl Staking </h2>
      <ConnectButton
        chainStatus="icon"
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        showBalance={{
          smallScreen: false,
          largeScreen: true,
        }}
      />
    </nav>
  );
};

export default Navbar;
