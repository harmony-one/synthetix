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

5. Run Synthetix deployment
```shell
node publish deploy --network harmony --deployment-path ./publish/deployed/harmony3 --ignore-safety-checks
```

6. Clone/open [synthetix-js-monorepo](https://github.com/ArtemKolodko/synthetix-js-monorepo/pull/1), install dependencies and copy content of a new folder `./publish/deployed/harmony3` to `js-monorepo/v2/contracts/publish/deployed/harmony` 

7. Navigate to `js-monorepo/v2/contracts` in synthetix-js-monorepo repository and run script to build contract bindings:
```shell
yarn build
```

8. In synthetix-js-monorepo repository, navigate to `v2/ui` and run client locally:
```shell
yarn dev
```

9. Open http://localhost:3000/, Synthetix V2 client page should be rendered
