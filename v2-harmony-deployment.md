### Steps to deploy Synthetix on Harmony

1. Deploy Band oracles for each token from `publish/deployed/harmony3/feeds.json` (SNX, BTC, ETH, ...):

https://github.com/polymorpher/synthetix-v2/blob/band-oracle/oracle-notes.md

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

5. Create `.env` file in root folder and add envs:
```shell
PRIVATE_KEY=0x123
DEPLOY_PRIVATE_KEY=0x123
PROVIDER_URL_MAINNET=https://api.harmony.one
```

Note that deployer account should have ONE tokens on balance!

6. Run Synthetix deployment
```shell
node publish deploy --network harmony --deployment-path ./publish/deployed/harmony3 --ignore-safety-checks
```

7. Clone/open [synthetix-js-monorepo](https://github.com/ArtemKolodko/synthetix-js-monorepo/pull/1), install dependencies and copy content of a new folder `./publish/deployed/harmony3` to `js-monorepo/v2/contracts/publish/deployed/harmony` 

8. Navigate to `js-monorepo/v2/contracts` in synthetix-js-monorepo repository and run script to build contract bindings:
```shell
yarn build
```

9. In synthetix-js-monorepo repository, navigate to `v2/ui` and run client locally:
```shell
yarn dev
```

10. Open http://localhost:3000/, Synthetix V2 client page should be rendered
