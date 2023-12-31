import fs from 'fs';
import path from 'path';
import slugify from 'slugify';

export async function importDataFromJson(filename: string) {
    const data = JSON.parse(fs.readFileSync(filename).toString('utf-8'));
    filename = path.basename(filename);
    const title = filename.split('.')[0];
    const exam = await strapi.entityService.create('api::examination.examination', {
        data: {
            title,
            status: 'Published',
            description: '',
            slug: slugify(title),
        }
    });
    const questions = data.filter(item => item.done).map(item => ({
        content: item.question,
        options: item.options,
        type: 'MCQ',
        examination: [exam.id],
    }));

    await Promise.all(questions.map(item => {
        return strapi.entityService.create('api::question.question', { data: item });
    }));
    console.log('Done');
}

export async function importDataFromFolder() {
    const filenames = fs.readdirSync('./craw-data/output');
    for (const filename of filenames) {
        try {
            await importDataFromJson(`./craw-data/output/${filename}`);
            console.log('Done ', filename);
        } catch (e) {
            console.log(JSON.stringify(e.details.error));
        }
    }
    console.log('Done');
}