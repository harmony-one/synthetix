### Steps to deploy Synthetix on Harmony

1. Deploy Band oracles for each token from `publish/deployed/harmony3/feeds.json` (SNX, BTC, ETH, ...):

Instructions:

https://github.com/polymorpher/synthetix-v2/blob/band-oracle/oracle-notes.md

BandOracleReader sources:

[https://github.com/harmony-one/band-oracle-reader](https://github.com/harmony-one/band-oracle-reader)

2. Build Synthetix contracts:
```shell
yarn compile
```

3. Compile contracts into build/compiled:
```shell
node publish build
```

4. Create new folder for deployment:
```shell
mkdir ./publish/deployed/harmony3
```

5. Change oracle feed addresses, using contracts deployed on Step 1:

Path: `/publish/deployed/harmony3/feeds.json`

Example with single token:
```shell
{
	"BTC": {
		"asset": "BTC",
		"feed": "0x4EdeeB8efa8e8dA1a68699D19BA9B85d78EAc565"
	}
}

```

Replace `deployment.json` file with content:
```shell
{
	"targets": {},
	"sources": {}
}
```

Set all values in `config.json` to `"deploy":true`.

Example:
```shell
{
	"SystemSettings": {
		"deploy": true
	},
	"SynthetixBridgeToOptimism": {
		"deploy": true
	},
	...
}
```

6. Create `.env` file in root folder and add envs:
```shell
PRIVATE_KEY=0x123
DEPLOY_PRIVATE_KEY=0x123
PROVIDER_URL_MAINNET=https://api.harmony.one
```

Note that deployer account should have ONE tokens on balance!

7. Run Synthetix deployment
```shell
node publish deploy --network harmony --deployment-path ./publish/deployed/harmony4 --ignore-safety-checks
```

8. Clone/open [synthetix-js-monorepo](https://github.com/ArtemKolodko/synthetix-js-monorepo/pull/1), install dependencies and copy content of a new folder `./publish/deployed/harmony3` to `js-monorepo/v2/contracts/publish/deployed/harmony` 

9. Open `js-monorepo` repository (Synthetix UI)

10. Copy content of deployed Synthetix folder (`./publish/deployed/harmony4`) to `js-monorepo/v2/contracts/publish/deployed/harmony`

11. Navigate to `js-monorepo/v2/contracts` in synthetix-js-monorepo repository and run script to build contract bindings:
```shell
cd /v2/contracts
yarn build
```

12. In synthetix-js-monorepo repository, navigate to `v2/ui` and run client locally:
```shell
yarn dev
```

13. Open http://localhost:3000/, Synthetix V2 client page should be rendered

14. Launch BandOracleUpdater (afet going public): [https://github.com/harmony-one/band-oracle-updater](https://github.com/harmony-one/band-oracle-updater). It's a bot that pushing BandOracleReader contract updates with given interval.


### Deploy new oracle feed for swap.country token

1) Create new liquidity pool:
      https://info.swap.harmony.one/#/harmony/pools/0xbc4af4ee9164c469b9e90f7d9b5f7854556133d6

2) Clone https://github.com/polymorpher/synth-oracle and run `forge build`
3) Change POOL_ADDRESS to the pool for USDC/1SY and fill in your DEPLOYER_PRIVATE_KEY
   
also might need to change true to false here, depending on whether the pair is USDC/1SY or 1SY/USDC

4) Deploy new oracle contract:
```shell
./deploy.sh
Oracle address: 0xe3EAB0d319908c3Ca68076b208a9870571dDb03F
```

5) Complete one trade on swap.country and check the price:
```shell
cast call 0xe3EAB0d319908c3Ca68076b208a9870571dDb03F "latestAnswer()(int256)" --rpc-url https://api.harmony.one
```
