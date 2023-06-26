const AWS = require("aws-sdk");

async function getSecret(secretName) {
    const secretsManager = new AWS.SecretsManager({ region: "us-east-1" }); // Specify the appropriate AWS region
  
    try {
      const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
      if ("SecretString" in data) {
        const secretValue = data.SecretString;
        return secretValue;
      } else {
        // If secret is binary, you can access it as `data.SecretBinary`
        throw new Error("Secret value is not available as a string.");
      }
    } catch (error) {
      console.error("Error retrieving secret:", error);
      throw error;
    }
}

module.exports = {getSecret};

  