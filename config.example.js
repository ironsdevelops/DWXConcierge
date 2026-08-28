// Copy this file to config.js and fill in real values. config.js is listed in
// .gitignore and is never committed — this file (config.example.js) is the
// only one that goes into git, and it should only ever hold placeholders.
window.LISA_CONFIG = {
  // Copilot Studio -> Lisa -> Settings -> Channels -> Custom website -> Token Endpoint
  TOKEN_ENDPOINT: 'https://<ENVIRONMENT_ID>.environment.api.powerplatform.com/powervirtualagents/botsbyschema/<LISA_SCHEMA_NAME>/directline/token?api-version=2022-03-01-preview',

  // Azure Portal -> your Speech resource -> Keys and Endpoint
  SPEECH_KEY: '<YOUR_AZURE_SPEECH_KEY>',
  SPEECH_REGION: 'eastus'
};
