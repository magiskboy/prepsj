export default {
    async getPublicExaminations(ctx) {
        const entities = await strapi.entityService.findMany(
            "api::examination.examination",
            {
                filters: {
                    status: 'Published'
                },
                populate: {
                    "createdBy": { fields: ['username'] }
                },
            }
        );

        return {
            data: entities,
        }
    },

    async requestExamination(ctx) {
        const id = Number(ctx.params.id);
        if (!id) return null;

        const exam = await strapi.entityService.findOne('api::examination.examination', id);
        if (exam?.status !== 'Published') return null;

        const questionFilters = { examination: { id: exam.id } };
        const questions = await strapi.entityService.findMany(
            'api::question.question', { filters: questionFilters})

        const redactedQuestions = questions.map(question => ({
            ...question,
            options: question.options
                ? (question.options as any[]).map(({ checked, explain, ...rest }) => rest)
                : [],
        }));

        return {
            data: {
                ...exam,
                questions: redactedQuestions,
            }
        }
    },

    async markingTest(ctx) {
        const { id, questions } = ctx.request.body;

        const questionEntities = (await strapi.entityService.findMany('api::question.question', {
            filters: { examination: { id } }
        })).reduce((prev, curr) => ({
            ...prev,
            [curr.id]: curr,
        }), {});

        const result = questions.map(item => {
            const q = questionEntities[item.id];
            if (!q) {
                return null;
            }

            return {
                ...item,
                correct: q.options.filter(item => item.checked).map(item => item.code),
            }
        });

        return {
            data: {
                result,
            }
        }   
    }
}
