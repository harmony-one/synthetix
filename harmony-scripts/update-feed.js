const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// NOTE: run yarn compile before first run
const {
	abi: ExchangeRatesABI,
} = require('../build/artifacts/contracts/ExchangeRates.sol/ExchangeRates.json');
const { toBytes32 } = require('../index');

const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ExchangeRates contract (/publish/deployed/harmony4)
const exchangeRatesAddress = '0x4d6A3E4524a1b269C7E3564a22b908693Aa5186A';
const contract = new ethers.Contract(exchangeRatesAddress, ExchangeRatesABI, signer);

const currencySymbol = 'SNX';
const currency = toBytes32(currencySymbol);

// 1SY token feed: 0xa84e54837AAb0045745e3B00C0A30b311Bc57FC5 (1SY / 1USDC)
// Deployed with synth-oracle: https://github.com/polymorpher/synth-oracle
// POOL_ADDRESS=0xbc4af4ee9164c469b9e90f7d9b5f7854556133d6
const newFeedAddress = '0xa84e54837AAb0045745e3B00C0A30b311Bc57FC5';

const run = async () => {
	try {
		const aggregators = await contract.aggregators(currency);
		console.log(`Current aggregators for ${currencySymbol}:`, aggregators);
		// await contract.removeAggregator(currency);
		await contract.addAggregator(currency, newFeedAddress);
		console.log(`${currencySymbol}: feed replaced; new feed: ${newFeedAddress}`);
	} catch (e) {
		console.error('Failed to execute script:', e);
	}
};

run();
