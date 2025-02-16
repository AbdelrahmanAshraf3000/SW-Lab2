// create arrays to store items, transactions, categories, and custom fields
let items = [], transactions = [], categories = [], customField = {};

// Function to add a new item to the inventory
function addItem(input){
    const [name, category, quantity, price, unit, customField = {}] = input;
    const item = { name, category, quantity, price, unit, added: new Date(), customField };
    items.push(item);
    if (!categories.includes(category)) categories.push(category);
    transactions.push({ type: "add", item });
    displayDashboard();
}

// Function to edit an existing item in the inventory
function editItem(input){
    const [index, name, category, quantity, price, unit, customField = {}] = input;
    if (items[index]) {
        transactions.push({ type: "edit", old: items[index], new: input.slice(1) });
        items[index] = { ...items[index], name, category, quantity, price, unit, customField };
        displayDashboard();
    }
}

// Function to remove an item from the inventory
function removeItem(input){
    const [index] = input;
    if (items[index]) {
        transactions.push({ type: "delete", item: items[index] });
        items.splice(index, 1);
        displayDashboard();
        checkLowStock(items[index]);
    }
}

// Function to process a sale of an item
function saleItem(input){
    const [name, quantity] = input;
    for (let item of items) {
        if (item.name === name && item.quantity >= quantity) {
            item.quantity -= quantity;
            transactions.push({ type: "sale", item, quantitySold: quantity, date: new Date() });
            console.log(`Sold ${quantity} ${item.unit} of ${item.name}`);
            checkLowStock(item);
            break;
        }
    }
    
}

// Function to restock an item in the inventory
function restockItem(input){
    const [name, quantity] = input;
    for (let item of items) {
        if (item.name === name) {
            item.quantity += quantity;
            transactions.push({ type: "restock", item, quantityRestocked: quantity, date: new Date() });
            console.log(`Restocked ${quantity} ${item.unit} of ${item.name}`);
            break;
        }
    }
}

// Function to check if an item's quantity is below 10 and log an alert if so
function checkLowStock(item) {
    if (item.quantity < 10) {
        console.log(`ALERT: Item ${item.name} is below 10 units! Curent quantity: ${item.quantity}`);
    }
}

// Function to search for items based on a query
function searchItems(input) {
    console.log(items.filter(item => [item.name, item.category, item.price]
        .some(value => value.toString().toLowerCase().includes(input[0].toLowerCase())))
        .map(item => `${item.name} (${item.category}) - ${item.quantity} ${item.unit} @ $${item.price}`)
        .join('\n'));
}

function viewInventory() {
    console.log("=== Inventory ===", items);
}

function exportAll() {
    console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"]
        .concat(items.map(item => Object.values(item).join(','))).join('\n'));
}

function viewAllTransactions() {
    console.log("Transactions:\n", transactions.map(transaction => `${transaction.type} - ${transaction.item.name}`).join('\n'));
}

// Function to view the age of each item in the inventory
function viewItemAge() {
    console.log(items.map(item => `${item.name}: ${Math.floor((new Date() - new Date(item.added)) 
        / (1000 * 60 * 60 * 24))}d`).join('\n'));
}

function importItems(input) {
    input.forEach(item => doStuff("add", [item.name, item.category, item.quantity, item.price, item.unit]));
}

// Function to add a customer field to the inventory system
function addField(input) {
    const [fieldName] = input;
    if (!customField[fieldName]) 
        customField[fieldName] = null;
}

// Function to update a custom field for a specific item
function updateCustomField(input) {
    const [itemName] = input;
    items.find(item => item.name === itemName).customField[input[1]] = input[2];
}

// Function to display the dashboard with summary information
function displayDashboard() {
    console.log(`=== Dashboard ===\nItems: ${items.length}\nTotal: $${items.reduce((total, item) => 
        total + item.quantity * item.price, 0).toFixed(2)}\nCategories: ${categories.join(', ')}`);
}

// Function to handle different actions based on the input
function doStuff(action, input) {
    switch (action) {
        case "add":
            addItem(input);
            break;
        case "edit":
            editItem(input);
            break;
        case "removeItem":
            removeItem(input);
            break;
        case "sale":
            saleItem(input);
            break;
        case "restock":
            restockItem(input);
            break;
        case "search":
            searchItems(input);
            break;
        case "viewInventory":
            viewInventory();
            break;
        case "exportAll":
            exportAll();
            break;
        case "viewAllTransactions":
            viewAllTransactions();
            break;
        case "viewItemAge":
            viewItemAge();
            break;
        case "import":
            importItems(input);
            break;
        case "addField":
            addField(input);
            break;
        case "updateCustomField":
            updateCustomField(input);
            break;
        default:
            console.log("Invalid action");
    }
    
}

function main() {
    console.log("Running inventory tests...");

    doStuff("add", ["Apple", "Fruit", 10, 1.5, "kg"]);
    doStuff("add", ["Banana", "Fruit", 5, 1, "kg"]);
    doStuff("add", ["Orange", "Fruit", 3, 2, "kg"]);
    doStuff("add", ["Milk", "Dairy", 5, 3, "litre"]);

    doStuff("sale", ["Apple", 2]);
    doStuff("restock", ["Milk", 2]);

    doStuff("search", ["mil"]);
    
    doStuff("viewInventory");
    doStuff("viewItemAge");

    doStuff("exportAll");
    doStuff("viewAllTransactions");

    doStuff("import", [{ name: "Pineapple", category: "Fruit", quantity: 5, price: 3, unit: "kg" }]);

    doStuff("addField", ["Origin"]);
    doStuff("updateCustomField", ["Apple", "Origin", "India"]);
}

main();
