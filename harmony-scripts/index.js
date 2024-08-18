const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// NOTE: run yarn compile first
const BandOracleABI = require('./BandOracleReaderABI.json');

const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// const abi = [
// 	'function latestRound() external view returns (uint256)',
// ];

// Deployed band oracle aggregator (BTC)
// BTC: 0x4EdeeB8efa8e8dA1a68699D19BA9B85d78EAc565
// ONE: 0x6cb4f021d163d38766e90534b21a71b2085b61a8
// ETH: 0xf0184d340660cd3ce4944f0c6e1b63c85d78dbcd
// 1SY: 0xe3EAB0d319908c3Ca68076b208a9870571dDb03F 0xC0565A0aeccC60Ff1636f53c4dF26e228C4Dc139
const contractAddress = '0xC0565A0aeccC60Ff1636f53c4dF26e228C4Dc139';
const bandOracleReader = new ethers.Contract(contractAddress, BandOracleABI, signer);

const run = async () => {
	try {
		// const latestRound = await bandOracleReader.latestRound();
		// console.log('latestRound', latestRound.toString());
		const latestRoundData = await bandOracleReader.latestRoundData();
		latestRoundData.forEach((value, index) => {
			if (index === 1) {
				console.log('latestRoundData', value.toString());
			}
		});
	} catch (e) {
		console.error('Failed to execute script:', e);
	}
};

run();
