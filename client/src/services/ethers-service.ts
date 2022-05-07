import { ethers } from "ethers";
import { ABI, Option } from "../constants";

const provider = new ethers.providers.Web3Provider(window.ethereum, "maticmum");
const opinionChainContract = new ethers.Contract(
  import.meta.env.VITE_CONTRACT_ADDRESS,
  ABI,
  provider,
);
const signer = provider.getSigner();
const OpinionChainContract = opinionChainContract.connect(signer);

export const metamaskInitialize = async () => {
  const addresses = await provider.send('eth_requestAccounts', []);
  return addresses[0];
};

export const getOpinionsOnChain = async () => {
  return OpinionChainContract.getOpinions();
};

export const voteOnChain = async (opinionId: number, OptionId: number) => {
  return OpinionChainContract.vote(opinionId, OptionId);
};

export const addOpinionOnChain = async (options: Option[]) => {
  return OpinionChainContract.addOpinion(options);
};
