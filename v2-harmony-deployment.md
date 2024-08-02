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

6. Create `.env` file in root folder and add envs:
```shell
PRIVATE_KEY=0x123
DEPLOY_PRIVATE_KEY=0x123
PROVIDER_URL_MAINNET=https://api.harmony.one
```

Note that deployer account should have ONE tokens on balance!

7. Run Synthetix deployment
```shell
node publish deploy --network harmony --deployment-path ./publish/deployed/harmony3 --ignore-safety-checks
```

8. Clone/open [synthetix-js-monorepo](https://github.com/ArtemKolodko/synthetix-js-monorepo/pull/1), install dependencies and copy content of a new folder `./publish/deployed/harmony3` to `js-monorepo/v2/contracts/publish/deployed/harmony` 

9. Navigate to `js-monorepo/v2/contracts` in synthetix-js-monorepo repository and run script to build contract bindings:
```shell
yarn build
```

10. In synthetix-js-monorepo repository, navigate to `v2/ui` and run client locally:
```shell
yarn dev
```

11. Open http://localhost:3000/, Synthetix V2 client page should be rendered


12. Launch BandOracleUpdater (afet going public): [https://github.com/harmony-one/band-oracle-updater](https://github.com/harmony-one/band-oracle-updater). It's a bot that pushing BandOracleReader contract updates with given interval.
