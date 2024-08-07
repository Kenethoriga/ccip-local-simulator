// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrossChainNameServiceRegister {
    address public router;
    mapping(string => address) public names;

    constructor(address _router) {
        router = _router;
    }

    function enableChain() public {
        // Logic to enable chain
    }

    function register(string memory name, address owner) public {
        names[name] = owner;
    }
}
