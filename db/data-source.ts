import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  // type: 'mysql',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'root',
  // database: 'demo-nestjs',
  // entities: ['dist/**/*.entity.js'],
  // migrations: ['dist/db/migration/*.js'],
  // migrationsTableName: 'custom_migration_table',
  // synchronize: false,

  type: 'mysql',
  host: 'mysql-graphql-graphql-gmail.e.aivencloud.com',
  port: 10177,
  username: 'avnadmin',
  password: 'AVNS_Pq88DUcTUIgqlkmWz39',
  database: 'defaultdb',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migration/*.js'],
  migrationsTableName: 'migration_db',
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
