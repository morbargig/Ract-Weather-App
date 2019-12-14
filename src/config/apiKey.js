const apiKey = function () {
    let d = new Date();
    let n = d.getHours();
    if (n % 3 === 0) {
        return 'pkNV1vKuwkcCw3ZDASBGyOH9Au1WFMbu'
    }
    else if (n % 3 === 1) { return 'mmcKE4Fm52FJgC7xpSPh15ygPzWqAoQ9' }
    else { return 'sRf6W9AUW0u6DFJQ2zVkLhQb3g78OHaS' }
}


export default apiKey()