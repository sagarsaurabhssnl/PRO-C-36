class Money {
    constructor() {

    }
    config() {
        var moneyRef = database.ref('money');
        moneyRef.on("value", function (value) {
            money = value.val();
        });
    }
    change(money) {
        database.ref('/').update({
            money:money
        });
    }
}