## Deploying Synthetix on Harmony
Deployment docs moved to harmony-one/h:
https://github.com/harmony-one/h/blob/main/docs/synthetix-v2-deployment.md

### Profitable trades script:

Add the private keys to the `.env` file in the root folder, as they will be used as signers:

```shell
PRIVATE_KEY1=0x123
PRIVATE_KEY2=0x123
PRIVATE_KEY3=0x123
```

Run the profitable trades script:

```shell
node profitable-trade.js
```

Input the Trade Values:

> Follow the prompts in the terminal to input the sizes and prices for the trades. The script will execute the trades on the blockchain.

After running `node profitable-trade.js`, you might see something like this in your terminal:

````Enter size for first long position (signer1): 50
Enter desired fill price for first long position (signer1): 1500
Opening long position with signer1...
Long position opened with signer1: 0x123...abc

Enter size for second long position (signer2): 100
Enter desired fill price for second long position (signer2): 1500
Opening long position with signer2...
Long position opened with signer2: 0x456...def

Enter size for short position (signer3): -50
Enter desired fill price for short position (signer3): 1500
Opening short position with signer3...
Short position opened with signer3: 0x789...ghi

Closing long position with signer1...
Long position closed profitably with signer1: 0x123...abc

Closing long position with signer2...
Long position closed profitably with signer2: 0x456...def

Closing short position with signer3...
Short position closed profitably with signer3: 0x789...ghi```
````
