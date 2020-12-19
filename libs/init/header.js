/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 15:41
 */
const { formatDate } = require('date-utils-2020')

function getHeader() {
  return `/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: ${formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')}
*/`
}

module.exports = {
  getHeader
}
