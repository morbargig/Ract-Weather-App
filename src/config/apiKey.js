const apiKey = function () {
    let d = new Date();
    let n = d.getHours();
    if (n % 2 === 0) {
        return 'sRf6W9AUW0u6DFJQ2zVkLhQb3g78OHaS'
    } else { return 'mmcKE4Fm52FJgC7xpSPh15ygPzWqAoQ9' }
}


export default apiKey()