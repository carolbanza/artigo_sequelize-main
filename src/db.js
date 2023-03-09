import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('sequelizenode', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

export default sequelize;