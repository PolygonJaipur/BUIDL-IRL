import { Web3Button } from "@web3modal/react";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between m-5">
      <h2 className="text-2xl font-medium">Buidl Staking </h2>
      <Web3Button />
    </nav>
  );
};

export default Navbar;
