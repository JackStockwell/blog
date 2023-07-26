const dayjs = require('dayjs')

module.exports = {
    formatDate: (date) => {
        const parsedDate = Date.parse(date)
        return dayjs(parsedDate).format('HH:mm | MMM DD, YYYY')
    },
}