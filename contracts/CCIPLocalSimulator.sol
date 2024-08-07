// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CCIPLocalSimulator {
    address public router;

    constructor() {
        router = msg.sender;
    }

    function configuration() public view returns (address) {
        return router;
    }
}
