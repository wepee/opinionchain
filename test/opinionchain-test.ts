import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

let opinionchain: Contract;
let accounts: SignerWithAddress[];
let addresses: string[];

let adminAccount: SignerWithAddress;
let adminAddress: string;

let randomAccount: SignerWithAddress;
let randomAddress: string;

type option = {
  score: number;
  name: string;
}

const option1: option = {
  score: 0,
  name: "bitcoin"
}

const option2: option = {
  score: 0,
  name: "ethereum"
}

describe("Opinionchain", function () {
  before(async function () {
    accounts = await ethers.getSigners();
    addresses = accounts.map((account) => account.address);

    adminAccount = accounts[0];
    adminAddress = addresses[0];

    randomAccount = accounts.slice(-1).pop()!;
    randomAddress = addresses.slice(-1).pop()!;
  });

  it("Should deploy the contract", async function () {
    const Opinionchain = await ethers.getContractFactory("Opinionchain");
    opinionchain = await Opinionchain.deploy();
    await opinionchain.deployed();

    expect(ethers.utils.isAddress(opinionchain.address)).to.equal(true);
    expect(await ethers.provider.getCode(opinionchain.address)).not.equal("0x");
  });

  it("Should add a new opinion", async function () {
    const initialOpinionNumber = (await opinionchain.getOpinions()).length

    const trx = await opinionchain.addOpinion([option1, option2]);
    await trx;

    const newOpinionNumber = (await opinionchain.getOpinions()).length

   expect(newOpinionNumber).to.equal(initialOpinionNumber+1);
  });

  it("Should add a new opinion with right options", async function () {

    const opinion = await opinionchain.getOpinion(0);

    expect([opinion[0].name, opinion[1].name]).to.deep.equal([option1.name, option2.name]);
    expect([opinion[0].score.toString(), opinion[1].score.toString()]).to.deep.equal([option1.score.toString(), option2.score.toString()]);
  });

  it("Should vote for an option", async function () {
    const choice = 1;

    const oldOptionVote = (await opinionchain.getOpinion(0))[choice].score;

    await opinionchain.vote(0, choice);

    const newOptionVote = (await opinionchain.getOpinion(0))[choice].score;

    expect(newOptionVote).to.equal(oldOptionVote.add(1));
  });
});
