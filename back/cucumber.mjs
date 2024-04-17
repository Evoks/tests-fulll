const defaultProfile = [
  'tests/bdd/features/**/*.feature',
  '--require-module ts-node/register', //typescript cucumber
  '--require ./tests/bdd/steps/**/*.ts',
  '--format progress-bar',
  `--format-options '{"snippetInterface": "synchronous"}'`,
].join(' ');

export const critical = defaultProfile + ['--tags @critical'].join(' ');

export default defaultProfile;
