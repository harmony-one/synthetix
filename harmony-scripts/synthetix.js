const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// NOTE: run yarn compile first
const { abi: SynthetixABI } = require('../build/artifacts/contracts/Synthetix.sol/Synthetix.json');
const { abi: LegacyTokenStateABI } = require('../build/artifacts/contracts/legacy/LegacyTokenState.sol/LegacyTokenState.json');
const { abi: SupplyScheduleABI } = require('../build/artifacts/contracts/SupplySchedule.sol/SupplySchedule.json');

const deploymentJSON = require('../publish/deployed/harmony3/deployment.json');

const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const snxContract = new ethers.Contract(
	deploymentJSON.targets.Synthetix.address,
	SynthetixABI,
	signer
);
const tokenState = new ethers.Contract(
	deploymentJSON.targets.TokenStateSynthetix,
	LegacyTokenStateABI,
	signer
);
const supplySchedule = new ethers.Contract(
	deploymentJSON.targets.SupplySchedule.address,
	SupplyScheduleABI,
	signer
);

const run = async () => {
	try {
		const mintableSupply = await supplySchedule.mintableSupply();
		console.log('mintableSupply:', mintableSupply);
		// const inflationAmount = await supplySchedule.setInflationAmount(100000);
		// console.log('inflationAmount:', inflationAmount.hash);
		const mintResult = await snxContract.mint();
		console.log('mintResult:', mintResult);
	} catch (e) {
		console.error('Failed to execute script:', e);
	}
};

run();
