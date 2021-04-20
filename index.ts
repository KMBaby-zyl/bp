import { spawn } from 'child_process';
import branchName from 'branch-name';
import { BpConfig } from './type';
const execa = require('execa');
const signale = require('signale');
const chalk = require('chalk');
const yParser = require('yargs-parser');
const args = yParser(process.argv.slice(2));
const cwd = process.cwd();
const path = require('path');

// 获取环境配置
const config = require(path.resolve(cwd, '.bprc.js'));

console.log('config', config);

const defaultConfig: BpConfig = {
  registry: 'https://registry.npmjs.org/'
}

function runCmd(cmd: string, args: string[], config: BpConfig = defaultConfig) {
  
  if (cmd === 'npm') {
    args.unshift(`--registry=${config.registry}`);
  }

  return new Promise((resolve, reject) => {
    args = args || [];
    const runner = spawn(cmd, args, {
      // keep color
      stdio: 'inherit',
    });
    runner.on('close', (code: any) => {
      if (code) {
        signale.error(`Error on execution: ${cmd} ${(args || []).join(' ')}`);
        reject(code);
        return;
      }
      resolve();
    });
  });
}

async function updateVersion(packageJSON: any, args: any) {
  const version = packageJSON.version;
  const mainVersion = version.split('-')[0];
  const beta = version.split('-')[1];
  let newVersion = version;

  if (args['tag']) {
    let newBetaVersion = 1;
    if (beta) {
      const betaVersion = beta.split('.')[1];
      newBetaVersion = ~~betaVersion + 1;
    }
    newVersion = `${mainVersion}-${args['tag']}.${newBetaVersion}`;
  } else {
    const arr: any[] = mainVersion.split('.');
    arr[2] = ~~arr[2] + 1;
    newVersion = arr.join('.');
  }
  // 自动会做代码未提交判断
  await runCmd('npm', ['version', newVersion])
  await runCmd('git', ['push']);

  return newVersion;
}

async function publish(args: any) {
  // 发beta
  if (args['tag']) {
    await runCmd('npm', ['publish', '--tag', args['tag']]);
  } else {
    // 发正式
    await runCmd('npm', ['publish']);
  }
}

async function check(args: any) {
  if (args['nocheck']) {
    signale.success(`跳过前置检查`);
    return true;
  }
  const name = await branchName.get();
  if (name !== 'master' && !/^release\//.test(name)) {
    signale.error(`请在master分支或者release执行pub命令`);
    return false;
  }
  
  return true;
}


function printErrorAndExit(message) {
  console.error(chalk.red(message));
  process.exit(1);
}
function logStep(name) {
  console.log(`${chalk.gray('>> Release:')} ${chalk.magenta.bold(name)}`);
}

function checkStatus() {
  // Check git status
  if (!args.skipGitStatusCheck) {
    const gitStatus = execa.sync('git', ['status', '--porcelain']).stdout;
    if (gitStatus.length) {
      printErrorAndExit(`Your git status is not clean. Aborting.`);
    }
  } else {
    logStep(
      'git status check is skipped, since --skip-git-status-check is supplied',
    );
  }
}
 
export async function run(packageJSON: any, args: any, config: BpConfig = defaultConfig) {
  signale.success(`better-publish 开始发版`);
  // pub必须在master分支
  // const checkRes = await check(args);
  // if (!checkRes) return false;
  // 更新版本号 -> commit ${版本号} -> push
  const newVersion = await updateVersion(packageJSON, args);
  signale.success(`版本号升级: ${newVersion}`);
  // publish
  await publish(args);
  signale.success(`新版本${newVersion}发布成功`);
}
