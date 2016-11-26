import fs from 'fs';

const args = process.argv.slice(2);

if (args.length === 0) {
  showHelp();
} else {
  switch (args[0]) {
    case 'help':
      showHelp();
      break;

    case 'list':
      showList();
      break;

    case 'add':
      const item = args.slice(1).join(' ');
      addItem(item);
      break;

    case 'done':
      const number = parseInt(args[1], 10);
      markAsDone(number);
      break;

    default:
      console.error(`Unknown command: ${args[0]}. Type "babel-node . help" for info.`);
      break;
  }
}

function showHelp() {
  fs.readFile(`${__dirname}/help.txt`, 'utf-8', (error, data) => {
    if (error == null) {
      console.log(data);
    } else {
      console.error('Error reading help');
    }
  });
}

function showList() {
  let lines;
  let line;
  let done;

  fs.readFile(`${__dirname}/todo.txt`, 'utf-8', (error, data) => {

    if (error == null) {
      data = data.slice(0, data.length - 1);

      lines = data.split(/\n/);

      console.log('To-do items:\n');

      for (let i = 0; i < lines.length; i++) {
        line = lines[i];
        done = line.charAt(0) != ' ';

        console.log(`  ${i + 1}: ${line.slice(1)} (done: ${done})`);
      }

    } else if (error.code == 'ENOENT') {
      console.log('The to do list is empty');
    } else {
      console.error('Error reading to do list');
    }

  });
}

function addItem(item) {
  const line = ` ${item}\n`;

  fs.appendFile(`${__dirname}/todo.txt`, line);
}

function markAsDone(number) {

  fs.readFile(`${__dirname}/todo.txt`, 'utf-8', (error, data) => {

    if (error == null) {

      const lines = data.split(/\n/);

      const line = lines[number - 1];
      lines[number - 1] = `*${line.slice(1)}`;

      data = lines.join('\n');
      fs.writeFile(`${__dirname}/todo.txt`, data);

    } else if (error.code == 'ENOENT') {
      console.error('No to-do items yet');
    } else {
      console.error('Error reading to do list');
    }

  });

}

console.log("this is a test");