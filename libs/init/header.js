/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-18 15:41
 */
const { formatDate } = require('date-utils-2020')

function getHeader() {
  return `/**
 * Created by devcli.
 * https://github.com/capricorncd/devcli
 * Date: ${formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')}
*/`
}

module.exports = {
  getHeader
}
