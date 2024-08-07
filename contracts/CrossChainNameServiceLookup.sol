// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrossChainNameServiceLookup {
    address public router;
    mapping(string => address) public names;

    constructor(address _router) {
        router = _router;
    }

    function enableChain() public {
        // Logic to enable chain
    }

    function lookup(string memory name) public view returns (address) {
        return names[name];
    }
}
