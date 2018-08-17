pragma solidity 0.4.24;

contract Election {
	string public candidate;
	struct Candidate {
			 uint id;
			 string name;
			 uint voteCount;
	 }
 	mapping(uint => Candidate) public candidates;

 	uint public candidatesCount;
	constructor () public {
		candidate = "candidato 1";
	}
}
