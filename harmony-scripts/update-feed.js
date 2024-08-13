const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// NOTE: run yarn compile before first run
const { abi: ExchangeRatesABI } = require('../build/artifacts/contracts/ExchangeRates.sol/ExchangeRates.json');
const deploymentV2 = require('../publish/deployed/harmony2/deployment.json');
const { toBytes32 } = require("../index");

const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(
  deploymentV2.targets.ExchangeRates.address,
  ExchangeRatesABI,
  signer
);

const currencySymbol = 'SNX'
const currency = toBytes32(currencySymbol)
const newFeedAddress = '0x4EdeeB8efa8e8dA1a68699D19BA9B85d78EAc565' // BandOracle - BTC token feed

const run = async () => {
  try {
    const aggregators = await contract.aggregators(currency);
    console.log(`Current aggregators for ${currencySymbol}:`, aggregators);
    if(aggregators.length === 1) {
      // await contract.removeAggregator(currency);
      await contract.addAggregator(currency, newFeedAddress);
      console.log(`${currencySymbol}: feed replaced; new feed: ${newFeedAddress}`)
    }
  } catch (e) {
    console.error('Failed to execute script:', e);
  }
};

run();
