import slugify from 'slugify';

export default {
    beforeCreate(event) {
        const slugTitle = slugify(event.params.data.title);
        const now = Date.now();
        event.params.data.slug = `${slugTitle}-${now}`;
    }
}