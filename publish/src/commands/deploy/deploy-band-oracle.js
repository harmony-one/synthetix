'use strict';

const { gray } = require('chalk');

module.exports = async ({
	account,
	addressOf,
	currentLastMintEvent,
	currentSynthetixSupply,
	currentWeekOfInflation,
	deployer,
	useOvm,
}) => {
	console.log(gray(`\n------ DEPLOY BAND ORACLES ------\n`));

	const bandOracleAddress = '0xA55d9ef16Af921b70Fed1421C1D298Ca5A3a18F1';
	const base = 'BTC';
	const quote = 'USD';
	const updateFee = 0;

	const contract = await deployer.deployContract({
		name: 'BandOracleReader',
		source: 'BandOracleReader',
		deps: [],
		args: [bandOracleAddress, base, quote, updateFee],
	});
	console.log('deployed contract:', contract);
};
