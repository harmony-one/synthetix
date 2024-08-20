const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// NOTE: run yarn compile before first run
const { abi: ProxyERC20 } = require('../build/artifacts/contracts/ProxyERC20.sol/ProxyERC20.json');
const deploymentJSON = require('../publish/deployed/harmony4/deployment.json');

const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const erc20Contract = new ethers.Contract(
	deploymentJSON.targets.ProxySynthetix.address,
	ProxyERC20,
	signer
);

const run = async () => {
	try {
		const totalSupply = await erc20Contract.totalSupply();
		const owner = await erc20Contract.owner();
		const symbol = await erc20Contract.symbol();
		console.log('owner', owner, 'totalSupply', totalSupply.toString(), 'symbol', symbol);
	} catch (e) {
		console.error('Failed to execute script:', e);
	}
};

run();
