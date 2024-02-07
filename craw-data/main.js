const fs = require('fs');


async function main() {
  const files = fs.readdirSync('./craw-data/output');
  for (const file of files) {
    console.log(file);
    const data = JSON.parse(fs.readFileSync(`./craw-data/output/${file}`, 'utf-8'));

    const req = {
      title: file.replace('.json', ''),
      description: "",
      questions: data.map(item => ({
        content: item.question,
        type: 'MCQ',
        options: item.options,
      })),
    }

    await fetch('http://localhost:3000/api/examinations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });
  }
}

main();