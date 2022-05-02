import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', '..', '.env')});

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST,
      port: 13306,
      dialect: 'mysql',
      pool: { max: 30, min: 0, idle: 10000 },
      logging: false
    }
);

export default sequelize;