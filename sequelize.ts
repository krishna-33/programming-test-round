#!/usr/bin/env ts-node

import { spawn } from 'child_process';
import path from 'path';

// Build args
const args = process.argv.slice(2);

// Setup env vars for TS config
process.env.SEQUELIZE_USE_TYPESCRIPT = 'true';

const sequelizeBin = path.resolve('node_modules/.bin/sequelize-cli');

const cmd = spawn(sequelizeBin, args, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    TS_NODE_PROJECT: path.resolve('tsconfig.json')
  }
});
