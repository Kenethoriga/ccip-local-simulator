const { ethers } = require("hardhat");

async function main() {
  // Deploy CCIPLocalSimulator.sol
  const CCIPLocalSimulator = await ethers.getContractFactory("CCIPLocalSimulator");
  const ccipLocalSimulator = await CCIPLocalSimulator.deploy();
  await ccipLocalSimulator.deployed();
  console.log("CCIPLocalSimulator deployed to:", ccipLocalSimulator.address);

  // Get Router contract address
  const routerAddress = await ccipLocalSimulator.configuration();
  console.log("Router contract address:", routerAddress);

  // Deploy CrossChainNameServiceRegister.sol
  const CrossChainNameServiceRegister = await ethers.getContractFactory("CrossChainNameServiceRegister");
  const ccnsRegister = await CrossChainNameServiceRegister.deploy(routerAddress);
  await ccnsRegister.deployed();
  console.log("CrossChainNameServiceRegister deployed to:", ccnsRegister.address);

  // Deploy CrossChainNameServiceReceiver.sol
  const CrossChainNameServiceReceiver = await ethers.getContractFactory("CrossChainNameServiceReceiver");
  const ccnsReceiver = await CrossChainNameServiceReceiver.deploy(routerAddress);
  await ccnsReceiver.deployed();
  console.log("CrossChainNameServiceReceiver deployed to:", ccnsReceiver.address);

  // Deploy CrossChainNameServiceLookup.sol
  const CrossChainNameServiceLookup = await ethers.getContractFactory("CrossChainNameServiceLookup");
  const ccnsLookup = await CrossChainNameServiceLookup.deploy(routerAddress);
  await ccnsLookup.deployed();
  console.log("CrossChainNameServiceLookup deployed to:", ccnsLookup.address);

  // Enable chain
  await ccnsRegister.enableChain();
  await ccnsReceiver.enableChain();
  await ccnsLookup.enableChain();
  console.log("Chains enabled");

  // Register "alice.ccns" with Alice's EOA address
  const aliceEOA = "0x1234567890abcdef1234567890abcdef12345678";
  await ccnsRegister.register("alice.ccns", aliceEOA);
  console.log("Registered alice.ccns with address:", aliceEOA);

  // Lookup "alice.ccns" and assert the returned address
  const lookupAddress = await ccnsLookup.lookup("alice.ccns");
  console.log("Lookup address for alice.ccns:", lookupAddress);
  if (lookupAddress === aliceEOA) {
    console.log("Test passed: Address matches Alice's EOA address");
  } else {
    console.error("Test failed: Address does not match Alice's EOA address");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
