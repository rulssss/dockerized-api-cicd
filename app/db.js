const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

// cliente base
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "sa-east-1",
});

// cliente "amigable" (JSON directo)
const docClient = DynamoDBDocumentClient.from(client);

module.exports = docClient;