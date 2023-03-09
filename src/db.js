import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('sequelizenode', 'root', '', {
    dialect: 'mysql',
    host: dbHost
})

export default sequelize;