exports.getCommentSplitor = (langId) => {
    const map = {
        javascript: {
            start: ':',
            end: undefined,
        },
        typescript: {
            start: ':',
            end: undefined,
        },
        vue: {
            start: ':',
            end: '-->',
        },
    };
    return map[langId]||{};
};
