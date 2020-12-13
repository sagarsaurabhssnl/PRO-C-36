class Foodtime{
    constructor(){

    }
    config(){
        var foodtimeRef=database.ref('foodtime');
        foodtimeRef.on("value", function(value){
            foodtime=value.val();
        });
    }

    change(time){
        database.ref('/').update({
            foodtime:time
        })
    }
}