const dayjs = require('dayjs')

module.exports = {
    formatDate: (date) => {
        const parsedDate = Date.parse(date)
        return dayjs(parsedDate).format('HH:mm | MMM DD, YYYY')
    },

    isEqual: (val1, val2, options) => {
        console.log(val1, val2)
        if (val1 === val2) {
            return options.fn(this)
        }
    },

    getUserId: (id) => {
        console.log(id)
    }
}