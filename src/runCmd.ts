import signale from 'signale';
import { spawn } from 'child_process';
import { BpConfig } from '../type';

const defaultConfig: BpConfig = {
  registry: 'https://registry.npmjs.org/'
}

export default function runCmd(cmd: string, args: string[], config: BpConfig = defaultConfig) {
  
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
