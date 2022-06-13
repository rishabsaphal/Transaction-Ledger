const sha256 = require("sha256");
class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createBlock(0, "00", "0000uugyg");
  }

  createBlock(nonce, hash, previousHash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: new Date(),
      pendingTransactions: this.pendingTransactions,
      nonce: nonce,
      hash: hash,
      previousHash: previousHash,
    };
    this.pendingTransactions = [];
    this.chain.push(newBlock);
  }

  returnLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  createNewTransaction(amount, sender, reciever) {
    const newTransaction = {
      amount: amount,
      sender: sender,
      reciever: reciever,
    };
    this.pendingTransactions.push(newTransaction);
    return this.returnLastBlock()["index"] + 1;
  }

  createHash(previousBlockHash, currentBlock, nonce) {
    return sha256(
      previousBlockHash + nonce.toString() + JSON.stringify(currentBlock)
    );
  }

  generateNonce(previousBlockHash, currentBlock) {
    let nonce = 0;
    while (true) {
      const hash = this.createHash(previousBlockHash, currentBlock, nonce);
      if (hash.slice(0, 4) == "0000") {
        return nonce;
      }
      nonce++;
    }
  }
}

module.exports = Blockchain;
