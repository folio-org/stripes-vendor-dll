const { execSync } = require("child_process");

const package = require('../package.json');

const { devDependencies } = package;
const deps = Object.keys(devDependencies).join(',');
const cmd = `stripes build --createDll ${deps} --dllName stripesVendorDll`;

try {
  console.log(cmd);

  execSync(cmd);

  // cleanup
  execSync('mv -f ./output/stripesVendorDll.*.js ./output/stripesVendorDll.js');
  execSync('rm -f ./output/chunk*.js');
  execSync('rm -f ./output/style.*.css');
  execSync('rm -f ./output/index.html');
  execSync('rm -rf ./output/translations');
}
catch (error) {
  console.log(error);
}
