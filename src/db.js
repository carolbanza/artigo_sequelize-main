import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('sequelizenode_2025', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    timezone: 'America/Sao_Paulo', // Define o fuso horário para o Brasil
})

export default sequelize;