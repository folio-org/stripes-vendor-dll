// Builds vendor DLL based on the list
// of dependencies in modules listed under @folio namespace.

const { execSync } = require("child_process");
const { readdirSync } = require('fs');

// stripes-core pollutes dependencies with items which should
// belong to devDependencies so until that's cleaned up
// remove them.
const excluded = [
  '@babel',
  '@bigtest',
  '@folio',
  '@hot-loader',
  'awesome-typescript-loader',
  'babel',
  'babel-loader',
  'commander',
  'css-loader',
  'debug',
  'duplicate-package-checker-webpack-plugin',
  'express',
  'favicons-webpack-plugin',
  'file-loader',
  'handlebars-loader',
  'hard-source-webpack-plugin',
  'html-webpack-plugin',
  'lodash-webpack-plugin',
  'mini-css-extract-plugin',
  'miragejs',
  'optimize-css-assets-webpack-plugin',
  'postcss',
  'react-hot-loader',
  'react-svg-loader',
  'regenerator-runtime',
  'rimraf',
  'rtl-detect',
  'rxjs-compat',
  'serialize-javascript',
  'style-loader',
  'svgo',
  'svgo-loader',
  'typescript',
  'webpack'
].join('|');

const getDirectories = source => {
  return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

const readDependencies = (dir, excluded) => {
  const package = require(`${dir}/package.json`);
  const { dependencies } = package;
  let deps = [];
  let excludeRegex;

  if (excluded) {
    excludeRegex = new RegExp(`^(?!${excluded}.*$).*`, 'g');
  }

  if (dependencies) {
    deps = Object.keys(dependencies);

    if (excluded) {
      deps = deps.filter(dep => dep.match(excludeRegex));
    }
  }

  return deps;
}

const buildDependencyList = () => {
  const allDeps = [];
  const dirs = getDirectories('./node_modules/@folio');

  dirs.forEach((dir) => {
    const exclude = (dir !== 'stripes') ? excluded : '';
    const deps = readDependencies(`${process.cwd()}/node_modules/@folio/${dir}`, exclude);

    allDeps.push(...deps);
  });

  const deps = readDependencies(process.cwd(), '@folio/stripes');
  allDeps.push(...deps);

  return [... new Set(allDeps)].sort();
}

const deps = buildDependencyList();
const cmd = `stripes build --createDll ${deps} --dllName stripesVendorDll`;

try {
  console.log(cmd);

  execSync(cmd);

  // cleanup
  execSync('rm -f ./output/chunk*.js');
  execSync('rm -f ./output/style.*.css');
  execSync('rm -f ./output/index.html');
  execSync('rm -rf ./output/translations');
}
catch (error) {
  console.log(error);
}
