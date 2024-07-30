const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// NOTE: run yarn compile first
const { abi: ProxyERC20 } = require('../build/artifacts/contracts/ProxyERC20.sol/ProxyERC20.json');
const deploymentJSON = require('../publish/deployed/harmony3/deployment.json');

const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const erc20Contract = new ethers.Contract(deploymentJSON.targets.ProxysBTC, ProxyERC20, signer);

const run = async () => {
	try {
		const totalSupply = await erc20Contract.totalSupply();
		const owner = await erc20Contract.owner();
    console.log('owner', owner, 'totalSupply', totalSupply.toString())
	} catch (e) {
		console.error('Failed to execute script:', e);
	}
};

run();
