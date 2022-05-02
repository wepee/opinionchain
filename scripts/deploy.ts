import { ethers } from "hardhat";

async function main() {
  const Opinionchain = await ethers.getContractFactory("Opinionchain");
  const opinionchain = await Opinionchain.deploy();

  await opinionchain.deployed();

  console.log("Opinionchain deployed to:", opinionchain.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
