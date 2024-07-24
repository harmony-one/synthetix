const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// NOTE: run yarn compile first
const { abi: SynthetixABI } = require('../build/artifacts/contracts/Synthetix.sol/Synthetix.json');

const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = '0xb6FC72aFF2e7707fACfdE8eD35D2128aC8875beF';
const snxContract = new ethers.Contract(contractAddress, SynthetixABI, signer);

const run = async () => {
	try {
		const totalSupply = await snxContract.totalSupply();
		console.log('totalSupply:', totalSupply);
		// const issueSynthsRes = await snxContract.migrateEscrowContractBalance();
		// console.log('issueSynthsRes:', issueSynthsRes);
	} catch (e) {
		console.error('Failed to execute script:', e);
	}
};

run();
