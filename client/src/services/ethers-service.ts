import { ethers } from "ethers";
import { ABI } from "../constants";

export const metamaskInitialize = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const addresses = await provider.send("eth_requestAccounts", []);

  return addresses[0];
};

export const voteOnChain = async (opinionId: number, OptionId: number) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const opinionChainContract = new ethers.Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    ABI,
    provider
  );

  const signer = provider.getSigner();

  const OpinionChainContract = opinionChainContract.connect(signer);

  await OpinionChainContract.vote(opinionId, OptionId);
};
