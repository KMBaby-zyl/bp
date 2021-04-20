#!/usr/bin/env node
const yParser = require('yargs-parser');
const args = yParser(process.argv.slice(2));
const cwd = process.cwd();
const path = require('path');
const pkg = require(path.resolve(cwd, 'package.json'));
const bp = require('../index');


bp.run(pkg, args);