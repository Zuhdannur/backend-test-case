import 'dotenv/config';
import { User } from 'src/modules/user/domain/user.entity';
import { DataSourceOptions } from 'typeorm';
// FOR RUNNING MIGRATION ONLY
const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'test',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export default ormconfig;
