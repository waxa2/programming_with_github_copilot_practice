function calculateTotal(items, discount) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    total -= total * (discount / 100);
    return total;
}