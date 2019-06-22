const Sequelize = require('sequelize')
const Op = Sequelize.Op

const determineQueryType = (query, field) => {
    let condition 
    if(field === 'title' || field === 'author' || field === 'genre'){
        condition = { [Op.substring]: query }
    }else if (field === 'year'){
        condition = { [Op.eq]: query }
    }

    return { [field]: condition }
}

module.exports = determineQueryType