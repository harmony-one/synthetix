const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const {
	abi: BandOracleABI,
	bytecode: BandOracleBytecode,
} = require('./BandOracleReader.json');

const bandOracleAddress = '0xA55d9ef16Af921b70Fed1421C1D298Ca5A3a18F1';
const base = 'ETH';
const quote = 'USD';
const updateFee = 0;

const provider = new ethers.providers.JsonRpcProvider('https://api.harmony.one');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const run = async () => {
	try {
		const factory = new ethers.ContractFactory(BandOracleABI, BandOracleBytecode, signer);
		const deployArgs = [bandOracleAddress, base, quote, updateFee];
		const contract = await factory.deploy(deployArgs);
		console.log('Deployed BandOracleReader:', contract.address, 'base: ', base);
	} catch (e) {
		console.error('Failed to deploy oracle reader', e);
	}
};

run();
