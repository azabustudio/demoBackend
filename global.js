const dotEnvConfig = require('dotenv').config().parsed;
const TABLE_SUFFIX = dotEnvConfig.ENV ? '-' + dotEnvConfig.ENV.toLowerCase() : '';

module.exports = {
  table_suffix: TABLE_SUFFIX
}