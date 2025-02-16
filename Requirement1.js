var items = [], transactions = [], categories = [], field = {};

function addItem(b){
    var item = { name: b[0], category: b[1], quantity: b[2], price: b[3], unit: b[4], added: new Date(), custF: b[5] || {} };
    items.push(item);

    if (!categories.includes(b[1])) 
        categories.push(b[1]);

    transactions.push({ type: "add", item });
}

function editItem(b){
    transactions.push({ type: "edit", oldItems: items[b[0]], newItems: b.slice(1) });

    items[b[0]] = { ...items[b[0]], name: b[1], category: b[2], quantity: b[3], price: b[4], unit: b[5], custF: b[6] || {} };

}

function removeItem(b){
    transactions.push({ type: "delete", item: items[b[0]] });
    items.splice(b[0], 1);
}

function doStuff(a, b) {
    if (["add", "edit", "removeItem"].includes(a)) {
        if (a === "add") {
            addItem(b);
        } else if (a === "edit" && items[b[0]]) {
            editItem(b);
           
        } else if (a === "removeItem" && items[b[0]]) {
           removeItem(b);
        }
        console.log("=== Dashboard ===\nItems: " + items.length + "\nTotal: $" + 
            items.reduce((tot, x) => tot + x.quantity * x.price, 0).toFixed(2) + "\nCats: " + categories.join(', '));
    }
    if (["sale", "restock"].includes(a)) {
        for (let item of items) {
            if (item.name === b[0]) {
                if (a === "sale" && item.quantity >= b[1]) {
                    item.quantity -= b[1];
                    transactions.push({ type: "sale", item: item, qtyS: b[1], d: new Date() });
                    console.log(`Sold ${b[1]} ${item.unit} of ${item.name}`);
                } else if (a === "restock") {
                    item.quantity += b[1];
                    transactions.push({ type: "restock", item: item, qtyR: b[1], d: new Date() });
                    console.log(`Restocked ${b[1]} ${item.unit} of ${item.name}`);
                }
                break;
            }
        }
    }

    if (a === "search"){
        console.log(items.filter(x => [x.name, x.category, x.price]
            .some(v => v.toString()
            .toLowerCase()
            .includes(b[0].toLowerCase()))));
    }
    if (a === "viewItems") 
        console.log("=== Inv ===", items);
    if (a === "exportAllItems") {
        console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"]
            .concat(items.map(x => Object.values(x).join(','))).join('\n'));
    }
    if (a === "viewAllTransactions") 
        console.log("Transactions:\n", transactions);
    if (a === "viewIAverage") {
        console.log(items.map(x => `${x.name}: ${Math.floor((new Date() - new Date(x.added)) / (1000 * 60 * 60 * 24))}d`)
        .join('\n'));
    }
    if (a==="importItems") 
        b[0].forEach(x => doStuff("add", [x.name, x.category, x.quantity, x.price, x.unit]));
    if (a === "addFld" && !f[b[0]]) 
        f[b[0]] = null;
    if (a === "udCFld") 
        items.find(x => x.name === b[0])?.custF[b[1]] = b[2];
}
