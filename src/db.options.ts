import { ConnectionOptions } from 'typeorm';
import projectPath from './project.path';

const options: ConnectionOptions = {
  type: 'sqlite',
  database: `${projectPath}/data/database.db3`,
  logging: true,
};

export default options;
