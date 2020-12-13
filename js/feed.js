class Feed {
    constructor() {

    }
    config() {
        var foodRef = database.ref('food');
        foodRef.on("value", function (value) {
            food = value.val();
            for(var j= 0; j<stock.length; j++){
                stock[j].destroy();
            }
            for (var i = 0; i < food; i++) {
                if (x > 780) {
                    x = x - 300;
                    y = y + 45;
                }
                stock.push(createSprite(x, y));                
                x = x + 30;
            }
            for(var n=0; n<stock.length; n++){
                stock[n].addImage(milkImg);
                stock[n].scale = 0.065;
            }
            x = 500;
            y = 103;
        });
    }
    change(food) {
        database.ref('/').update({
            food: food
        });
    }
}