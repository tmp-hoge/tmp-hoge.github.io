/* eslint no-console: off */
const fs = require('fs');
const chalk = require('chalk');
const path = require("path");
const fetch = require('node-fetch');

const verbose = (msg) => {
  if (global.AUSPICE_VERBOSE) {
    console.log(chalk.greenBright(`[verbose]\t${msg}`));
  }
};
const log = (msg) => {
  console.log(chalk.blueBright(msg));
};
const warn = (msg) => {
  console.warn(chalk.yellowBright(`[warning]\t${msg}`));
};
const error = (msg) => {
  console.error(chalk.redBright(`[error]\t${msg}`));
  process.exit(2);
};

const isNpmGlobalInstall = () => {
  return __dirname.indexOf("lib/node_modules/auspice") !== -1;
};

const cleanUpPathname = (pathIn) => {
  let pathOut = pathIn;
  if (!pathOut.endsWith("/")) pathOut += "/";
  if (pathOut.startsWith("~")) {
    pathOut = path.join(process.env.HOME, pathOut.slice(1));
  }
  pathOut = path.resolve(pathOut);
  if (!fs.existsSync(pathOut)) {
    return undefined;
  }
  return pathOut;
};

const getCurrentDirectoriesFor = (type) => {
  const cwd = process.cwd();
  const folderName = type === "data" ? "auspice" : "narratives";
  if (fs.existsSync(path.join(cwd, folderName))) {
    return cleanUpPathname(path.join(cwd, folderName));
  }
  return cleanUpPathname(cwd);
};

const resolveLocalDirectory = (providedPath, isNarratives) => {
  let localPath;
  console.log("check!!!!", localPath);
  if (providedPath) {
    localPath = cleanUpPathname(providedPath);
    console.log("if", localPath);
  } else if (isNpmGlobalInstall()) {
    localPath = getCurrentDirectoriesFor(isNarratives ? "narratives" : "data");
    console.log("elif", localPath);
  } else {
    // fallback to the auspice source directory
    localPath = path.join(path.resolve(__dirname), "..", isNarratives ? "narratives" : "data");
    console.log("else", localPath);
  }
  return localPath;
};

const fetchJSON = (pathIn) => {
  const p = fetch(pathIn)
    .then((res) => {
      if (res.status !== 200) throw new Error(res.statusText);
      try {
        const header = res.headers[Object.getOwnPropertySymbols(res.headers)[0]] || res.headers._headers;
        verbose(`Got type ${header["content-type"]} with encoding ${header["content-encoding"] || "none"}`);
      } catch (e) {
        // potential errors here are inconsequential for the response
      }
      return res;
    })
    .then((res) => res.json());
  return p;
};

const readFilePromise = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        return resolve(JSON.parse(data));
      } catch (parseErr) {
        return reject(parseErr);
      }
    });
  });
};

/* Where should the built files be saved? (or sourced??)
 * This may grow more complex over time
 */
const customOutputPath = (extensions) => {
  if (extensions && path.resolve(__dirname, "..") !== process.cwd()) {
    return process.cwd();
  }
  return false;
};

/* write an index.html file to the current working directory
 * Optionally set the hrefs for local files to relative links (needed for github pages)
 */
const exportIndexDotHtml = ({ relative = false }) => {
  if (path.resolve(__dirname, "..") === process.cwd()) {
    warn("Cannot export index.html to the auspice source directory.");
    return;
  }
  const outputFilePath = path.join(process.cwd(), "index.html");
  let data = fs.readFileSync(path.resolve(__dirname, "../index.html"), { encoding: "utf8" });
  verbose(`Writing ${outputFilePath}`);
  if (relative) {
    data = data
      .replace(/\/favicon/g, "favicon")
      .replace(/\/dist\/bundle.js/, "dist/bundle.js");
  }
  fs.writeFileSync(outputFilePath, data);
};

module.exports = {
  verbose,
  log,
  warn,
  error,
  resolveLocalDirectory,
  customOutputPath,
  fetchJSON,
  readFilePromise,
  exportIndexDotHtml
};
