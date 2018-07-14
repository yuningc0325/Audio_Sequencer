var instruments=[   {name:"piano",icon:"/img/piano.svg"},
                    {name:"guitar", icon:"/img/guitar.svg"},
                    {name:"wind",icon:"/img/wind.svg"},
                    {name:"sin",icon:"/img/sin.svg"},
                    {name:"square",icon:"/img/square.svg"},
                    {name:"triangle",icon:"/img/triangle.svg"},];
var index=1;

$(".instrument-button").on("click",function(){
    if(index==6){
        index=0;
    }
   $("object").attr('data',instruments[index].icon);
   $(".instrumentName").text(instruments[index].name);
   index++;
});