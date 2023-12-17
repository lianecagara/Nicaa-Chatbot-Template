const { spawn } = require("child_process");
const { retro } = require("gradient-string");

const child = spawn("node", ["main.js"], {
  stdio: "pipe",
  shell: true,
  cwd: __dirname
});
child.stdout.on('data', (data) => {
  const retroOutput = retro(data.toString());
  process.stdout.write(retroOutput);
});

child.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});

child.on('exit', (code) => {
  console.log(`Child process exited with code ${code}`);
});
