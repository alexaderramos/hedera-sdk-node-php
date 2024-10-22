const {
  TokenCreateTransaction,
  AccountId,
  PrivateKey,
  Client,
} = require('@hashgraph/sdk');
const userRepository = require('../repositories/user.repository');
const tokenRepository = require('../repositories/token.repository');

const client = Client.forTestnet();
client.setOperator(
  AccountId.fromString(process.env.HEDERA_ACCOUNT_ID),
  PrivateKey.fromStringDer(process.env.HEDERA_PRIVATE_KEY),
);

class TokenService {
  /**
   * Create a new token
   */
  async createToken(req) {
    const { name, symbol, initialSupply } = req.body;
    const username = req.user.username;

    try {
      const tokenCreateTx = await new TokenCreateTransaction()
        .setTokenName(name)
        .setTokenSymbol(symbol)
        .setTreasuryAccountId(
          AccountId.fromString(process.env.HEDERA_ACCOUNT_ID),
        )
        .setInitialSupply(initialSupply)
        .freezeWith(client);

      const signedTx = await tokenCreateTx.sign(
        PrivateKey.fromStringDer(process.env.HEDERA_PRIVATE_KEY),
      );
      const txResponse = await signedTx.execute(client);

      const receipt = await txResponse.getReceipt(client);
      const tokenId = receipt.tokenId.toString();

      /**
       * Save the token in the database
       */
      const user = await userRepository.findByUsername(username);
      await tokenRepository.createToken({
        tokenId,
        name,
        symbol,
        initialSupply,
        userId: user.id,
      });

      return { tokenId, name, symbol, initialSupply };
    } catch (error) {
      throw new Error('Error al crear el token <<' + error.message);
    }
  }

  /**
   * List all tokens
   */
  async listTokens(req) {
    const { username } = req.user;
    const user = await userRepository.findByUsername(username);
    return tokenRepository.allByUser(user.id);
  }
}

module.exports = new TokenService();
