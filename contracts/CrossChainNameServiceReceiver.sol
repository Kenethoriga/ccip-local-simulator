// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrossChainNameServiceReceiver {
    address public router;

    constructor(address _router) {
        router = _router;
    }

    function enableChain() public {
        // Logic to enable chain
    }
}
