import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('sequelizenode_2025', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    
     
    });
    


export default sequelize;