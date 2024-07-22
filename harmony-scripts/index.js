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
const contractAddress = '0x4EdeeB8efa8e8dA1a68699D19BA9B85d78EAc565';
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

const run = async () => {
	try {
		const latestRound = await bandOracleReader.latestRound();
		console.log('latestRound', latestRound.toString());
	} catch (e) {
		console.error('Failed to execute script:', e);
	}
};

run();
