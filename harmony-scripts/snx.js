const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// NOTE: run yarn compile first
const { abi: ProxyERC20 } = require('../build/artifacts/contracts/ProxyERC20.sol/ProxyERC20.json');

const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// const abi = [
// 	'function latestRound() external view returns (uint256)',
// ];

const contractAddress = '0x44B4760C786Ced6fE18A555ffe7b9D9cd5eE15a8';
const snxContract = new ethers.Contract(contractAddress, ProxyERC20, signer);

const run = async () => {
	try {
		const totalSupply = await snxContract.totalSupply();
		const owner = await snxContract.owner();
    console.log('owner', owner)
	} catch (e) {
		console.error('Failed to execute script:', e);
	}
};

run();
