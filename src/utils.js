export const convertToValidArray = (data) => {
    const result = data.map((item, i) => {
        return {
            key: i,
            source: item[0],
            target: item[1],
            cost: item.slice(2),
        }
    });
    return result;
}

// Optimize route costs
export const optimizeRouteCosts = (values, data) => {
    let optimizeCost = '0';
    values && values.forEach((v, i) => {
        const source = values[i].value;
        const target = values[i + 1] && values[i + 1].value;
        if (values[i + 1]) {
            const resultData = data.filter((d) => (source && source.toLowerCase() === d.source.toLowerCase()
                && target.toLowerCase() === d.target.toLowerCase()
            ));
            if (resultData.length) {
                resultData.forEach((rd) => {
                    optimizeCost = parseInt(optimizeCost) + parseInt(rd.cost);
                })
            } else {
                optimizeCost = 'No such route';
            }
        }
    });

    return optimizeCost;
}

// Calculate possible routes
export const calculatePossibleRoutes = (values, data) => {
    const uniqueValues = [...new Set(values.map(item => item.value))];
    console.log('uinque-values', uniqueValues);
}
