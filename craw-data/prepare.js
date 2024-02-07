const fs = require('fs');

const patterns = [
  /^(Answer:\s)([A-Z])\)[\s]?(.*)$/,
  /^(Answer\s\-\s)([A-Z])\)[\s]?(.*)$/,
  /^(Ans\.\s)([A-Z])\)[\s]?(.*)$/,
  /^(Explanation\s\-\s)([A-Z])\)[\s]?(.*)$/,
]

function processRawFile(filename) {
  const data = JSON.parse(fs.readFileSync(filename).toString('utf-8'));

  const output = [];
  let count = 0;

  for (const item of data) {
    if (!item) continue;
    let result = null;
    for (const pattern of patterns) {
      const matched = pattern.exec(item.answer);
      if (matched === null) continue;
      
      const id = matched[2].charCodeAt(0) - 65;
      const options = item.options.map((ans, index) => ({
        content: ans,
        checked: id === index,
        explain: id === index ? matched[3] : null,
        code: String.fromCharCode(index + 65),
      }));
      result = {
        question: item.question,
        options,
      };
      break;
    }
    if (result === null) {
      output.push({ ...item, done: false });
    }
    else {
      output.push({ ...result, done: true });
      count += 1;
    }
  }

  return {
    p: count / data.length * 100,
    output,
  }
} 

function process() {
  if (fs.existsSync('./output')) {
    fs.rmdirSync('output');
  }
  fs.mkdirSync('output');
  if (fs.existsSync('./need-human')) {
    fs.rmdirSync('need-human');
  }
  fs.mkdirSync('need-human');
  if (fs.existsSync('report.json')) {
    fs.rmSync('report.json');
  }

  const report = [];

  const filenames = fs.readdirSync('./raw');
  for (const filename of filenames) {
    const { p, output } = processRawFile(`./raw/${filename}`);
    report.push([filename, p]);

    if (p < 80) {
      fs.writeFileSync(`./need-human/${filename}`, JSON.stringify(output, null, 2));
    }
    else {
      fs.writeFileSync(`./output/${filename}`, JSON.stringify(output, null, 2));
    }
  }

  report.sort((a, b) => b[1] - a[1]);
  fs.writeFileSync('./report.json', JSON.stringify(report, null, 2));
}

process();