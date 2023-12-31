export default {
    routes: [
        {
            method: "GET",
            path: "/examinations/public",
            handler: "custom-examination.getPublicExaminations",
        },
        {
            method: "GET",
            path: "/examinations/:id/request",
            handler: "custom-examination.requestExamination",
        },
        {
            method: "POST",
            path: "/examinations/marking-test",
            handler: "custom-examination.markingTest",
        }
    ]
}