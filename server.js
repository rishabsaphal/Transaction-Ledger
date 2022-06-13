const express = require("express");
const app = express();
const Blockchain = require("./blockchain");
var bodyParser = require("body-parser");

const { v4: uuidv4 } = require("uuid");
let id = uuidv4();
id = id.split("-").join("");
const bitcoin = new Blockchain();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/blockchain", function (req, res) {
  res.json(bitcoin);
});

app.post("/transaction", function (req, res) {
  let index = bitcoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.reciever
  );
  res.json({ note: `Will be added to block number ${index}` });
});

app.get("/mine", function (req, res) {
  const currentBlockData = {
    index: bitcoin.chain[bitcoin.chain.length - 1] + 1,
    transactions: bitcoin.pendingTransactions,
  };
  const previousHash = bitcoin.returnLastBlock()["hash"];
  const nonce = bitcoin.generateNonce(previousHash, currentBlockData);
  const hash = bitcoin.createHash(previousHash, currentBlockData, nonce);
  bitcoin.createNewTransaction(12.5, "00", id);
  bitcoin.createBlock(nonce, hash, previousHash);
  res.json({ note: "mining success!" });
});

app.listen(3000);
