import input from './input';

const inputLines = input.split('\n').filter((o) => o);

let currentDirectory = '/';
const directorySizes = {};

const changeDirectory = (path) => {
  if (path === '/') {
    currentDirectory = '/';
  } else if (path === '..') {
    currentDirectory = currentDirectory.split('/').slice(0, -1).join('/') || '/';
  } else {
    currentDirectory = [...currentDirectory.split('/'), path]
      .join('/')
      .replaceAll('//', '/');
  }
};

const addFileSizeToDirectory = (directory, fileSize) => {
  directorySizes[directory] = (directorySizes[directory] || 0) + fileSize;
};

const addFileSizeToDirectoryTree = (fileSize) => {
  if (currentDirectory === '/') {
    addFileSizeToDirectory(currentDirectory, fileSize);
    return;
  }

  const treeDirectories = currentDirectory.split('/');

  for (let i = 0; i < treeDirectories.length; i += 1) {
    const directory = treeDirectories.slice(0, i + 1).join('/') || '/';
    addFileSizeToDirectory(directory, fileSize);
  }
};

inputLines.forEach((outputLine) => {
  const isCommand = outputLine.startsWith('$');

  if (isCommand) {
    const isDirectoryChange = outputLine.startsWith('$ cd');

    if (isDirectoryChange) {
      const path = outputLine.replace(/\$ cd /i, '');
      changeDirectory(path);
    }
  } else {
    const isFile = !outputLine.startsWith('dir');

    if (isFile) {
      const fileSize = parseInt(outputLine.split(' ')[0], 10);
      addFileSizeToDirectoryTree(fileSize);
    }
  }
});

const diskSize = 70_000_000;
const requiredSpace = 30_000_000;
const usedSpace = directorySizes['/'];
const freeSpace = diskSize - usedSpace;
const missingSpace = requiredSpace - freeSpace;
const fileSizes = Object.values(directorySizes);

const sumOfSmallDirectories = fileSizes.reduce(
  (total, fileSize) => (fileSize <= 100000 ? total + fileSize : total),
  0,
);

const smallestDirectoryWithRequiredSpace = fileSizes
  .filter((fileSize) => fileSize >= missingSpace)
  .sort((a, b) => a - b)[0];

console.log({
  extraData: { directorySizes },
  solution: {
    part1: { sumOfSmallDirectories },
    part2: { smallestDirectoryWithRequiredSpace },
  },
});
