export const convertToValidArray = (data) => {
    const result = data.map((item, i) => {
        return {
            key: i,
            source_name: `${item.substring(0, 1)}`,
            target_name: `${item.substring(1, 2)}`,
            cost: `${item.substring(2)}`,
        }
    });
    return result;
}
