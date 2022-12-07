import input from "./input.js";

const inputLines = input.split("\n").filter((o) => o);

let currentDirectory = "/";
const directorySizes = {};

const changeDirectory = (path) => {
  if (path === "/") {
    currentDirectory = "/";
  } else if (path === "..") {
    currentDirectory =
      currentDirectory.split("/").slice(0, -1).join("/") || "/";
  } else {
    currentDirectory = [...currentDirectory.split("/"), path]
      .join("/")
      .replaceAll("//", "/");
  }
};

const addFileSizeToDirectoryTree = (fileSize) => {
  if (currentDirectory === "/") {
    directorySizes[currentDirectory] =
      (directorySizes[currentDirectory] || 0) + parseInt(fileSize, 10);
    return;
  }

  const treeDirectories = currentDirectory.split("/");

  for (let i = 0; i < treeDirectories.length; i++) {
    const directory = treeDirectories.slice(0, i + 1).join("/") || "/";
    directorySizes[directory] =
      (directorySizes[directory] || 0) + parseInt(fileSize, 10);
  }
};

inputLines.forEach((outputLine) => {
  const isCommand = outputLine.startsWith("$");

  if (isCommand) {
    const isDirectoryChange = outputLine.startsWith("$ cd");

    if (isDirectoryChange) {
      const path = outputLine.replace(/\$ cd /i, "");
      changeDirectory(path);
    }
  } else {
    const isFile = !outputLine.startsWith("dir");

    if (isFile) {
      const [fileSize] = outputLine.split(" ");
      addFileSizeToDirectoryTree(fileSize);
    }
  }
});

const diskSize = 70_000_000;
const requiredSpace = 30_000_000;
const usedSpace = directorySizes["/"];
const freeSpace = diskSize - usedSpace;
const missingSpace = requiredSpace - freeSpace;

const sumOfSmallDirectories = Object.entries(directorySizes).reduce(
  (total, [, fileSize]) => (fileSize <= 100000 ? total + fileSize : total),
  0
);

const smallestDirectoryWithRequiredSpace = Object.entries(directorySizes)
  .filter(([, fileSize]) => fileSize >= missingSpace)
  .sort((a, b) => a[1] - b[1])[0][1];

console.log({
  directorySizes,
  sumOfSmallDirectories,
  smallestDirectoryWithRequiredSpace
});
