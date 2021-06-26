module.exports = paginate = ({page, size}) => {
    const offset = page * size;
    const limit = parseInt(size);

    return {
        offset,
        limit,
    };
}