const dotEnvConfig = require('dotenv').config().parsed;
const TABLE_PREFIX = dotEnvConfig.ENV ? dotEnvConfig.ENV.toLowerCase() + '_' : '';

module.exports = {
  table_prefix: TABLE_PREFIX
}