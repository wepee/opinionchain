//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Opinionchain is Ownable {
    struct option {
        uint256 score;
        string name;
    }

    option[][] public opinions;

    function addOpinion(option[] memory _newOpinions) public onlyOwner {
        uint256 idx = opinions.length;
        opinions.push();
        option[] storage opinionTemp = opinions[idx];

        for(uint i = 0; i < _newOpinions.length; i++) {
            opinionTemp.push(_newOpinions[i]);
        }
    }

    function getOpinions() public view returns(option[][] memory) {
        return opinions;
    }

    function getOpinion(uint _opinionId) public view returns(option[] memory) {
        require(opinions.length > _opinionId, "this opinion does not exist");
        return opinions[_opinionId];
    }

    function vote(uint _opinionId, uint _choice) public {
        require(opinions.length > _opinionId, "this opinion does not exist");
        require(opinions[_opinionId].length > _choice, "this choice does not exist");
        opinions[_opinionId][_choice].score++;
    }
}
