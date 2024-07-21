const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// NOTE: run yarn compile first
const {
	abi: BandOracleABI,
} = require('../build/artifacts/contracts/BandOracleReader.sol/BandOracleReader.json');

const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// const abi = [
// 	'function latestRound() external view returns (uint256)',
// ];

// Deployed band oracle aggregator (BTC)
const contractAddress = '0x38286Ecd15c1c9D69DC73D940C2e39Fb5De878A5';
const bandOracleReader = new ethers.Contract(contractAddress, BandOracleABI, signer);

const latestRound = async () => {
	try {
		const latestRound = await bandOracleReader.latestRound();
		console.log('latestRound:', latestRound);
	} catch (e) {
		console.error('Failed to execute script:', e);
	}
};

const pullDataAndCache = async () => {
	try {
		const result = await bandOracleReader.pullDataAndCache();
		console.log('result:', result);
	} catch (e) {
		console.error('Failed to execute script:', e);
	}
};

const run = () => {
	latestRound();
	// pullDataAndCache();
};

run();
