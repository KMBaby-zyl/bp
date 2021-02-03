#!/usr/bin/env node

const yParser = require('yargs-parser');
const args = yParser(process.argv.slice(2));
const cwd = process.cwd();
const bp = require('../index');
const path = require('path');
const pkg = require(path.resolve(cwd, 'package.json'));

// 获取环境配置
const config = require(path.resolve(cwd, '.bprc.js'));
bp.run(pkg, args, config);