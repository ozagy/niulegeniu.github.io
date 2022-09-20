
const types = ["paul", "61", "jiang", "shili", "yz" ,"jiao", "paopao", "dan", "jagger", "hong"];
const count = 204;
const dist = {"paul":24, "61":18, "jiang": 21, "shili": 21, "yz": 21, "jiao": 21, "paopao":21, "dan":18, "jagger":21, "hong":18};
const pile = [
    [
        [0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0],
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
        [0,1,1,1,1,1,0],
        [0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,1,0,0,0],
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1],
        [0,1,1,1,1,1,0],
        [0,0,0,1,0,0,0]
    ],
    [
        [0,0,1,1,0,0],
        [0,1,1,1,1,0],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [0,1,1,1,1,0],
        [0,0,1,1,0,0]
    ],
    [
        [0,0,0,0,0,0],
        [0,0,1,1,0,0],
        [0,1,1,1,1,0],
        [1,1,1,1,1,1],
        [0,1,1,1,1,0],
        [0,0,1,1,0,0],
        [0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0],
        [0,1,1,0,1,1,0],
        [0,1,1,0,1,1,0],
        [0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0],
        [0,1,1,1,1,0],
        [1,1,0,0,1,1],
        [1,1,0,0,1,1],
        [0,1,1,1,1,0],
        [0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,1,1,1,1,1,0],
        [0,1,1,0,1,1,0],
        [1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ],
    [
        [1,0,0,0,0,0,1],
        [0,1,0,1,0,1,0],
        [0,0,1,0,1,0,0],
        [0,0,1,0,1,0,0],
        [1,0,0,1,0,0,1],
        [0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,0,1,0,0],
        [0,0,1,1,1,0,0],
        [1,0,0,0,0,0,1],
        [0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0],
        [1,0,0,0,0,1],
        [0,1,0,0,1,0],
        [0,1,0,0,1,0],
        [0,1,1,1,1,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ],
    [
        [1,0,0,0,0,0,1],
        [0,1,1,1,1,1,0],
        [0,1,1,1,1,1,0],
        [1,1,1,0,1,1,1],
        [0,0,1,0,1,0,0],
        [1,0,0,0,0,0,1]
    ],
    [
        [1,0,0,0,0,0,1],
        [0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,0,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,0,1,0,0,0],
        [1,0,0,0,0,0,1]
    ]
];

$(document).ready(function(){
    //initialize
    tilelist = initializeTiles(dist);
    bootstrapLayout(pile,tilelist);
    refreshClickability();

    $(".restart").click(function(){
        location.reload();
    });

    $("#shuffle").click(function(){
        shuffleTypes();
    });
    
});


function check(type){

    //clear 3 combos
    var i = 0;
    $(".selectedcard").each(function(){
        if (type == $(this).attr("type")){
            i++;
        }

    });
    if (i >= 3){
        $(".selectedcard").each(function(){
            if ($(this).attr("type") == type){
                $(this).remove();
            }
        });
    }
    
    //check game over
    if ($(".selectedcard").length >= 7){
        $("#over").modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
        });
    }

    // check win
    if ($(".card").length == 0) {
        $("#win").modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
        });
    }
}

function refreshClickability(){
    $(".unselectedcard").each(function(){
        if (!$(this).hasClass("clickable")) {
            $(this).addClass("clickable");
        }
        $(this).find(".shade").hide();
    });

    $(".unselectedcard").each(function(j,e1){

        //get layer
        l = $(e1).parent().attr("layer");
        //console.log("l:"+l);

        for (i = 0; i < l; i++){
            //console.log("i:"+i);
            //loop through compared elements on layers below
            $("div[layer="+i+"]").children().each(function(k,e2){
                x1 = $(e1).css('left').match(/\d+/)[0];
                y1 = $(e1).css('top').match(/\d+/)[0];
                x2 = $(e2).css('left').match(/\d+/)[0];
                y2 = $(e2).css('top').match(/\d+/)[0];

                if (Math.abs(x1-x2)<100 && Math.abs(y1-y2)<100){
                   $(e2).removeClass("clickable");
                   $(e2).find(".shade").show();
                }
            }); 
        }
    });

    $(".clickable").off('click').click(function(){
        $(this).appendTo("#stack");
        $(this).removeClass("unselectedcard clickable");
        $(this).removeAttr("style");
        $(this).addClass("selectedcard");

        check($(this).attr("type"));
        //refresh clickability
        refreshClickability();
    });
}

function reset(){
    
}

function bootstrapLayout(pile, tilelist){


    //count tiles
    var c = 0;

    $(".pg").empty();

    for (i=0;i<pile.length;i++)
    {
        e = $('<div layer="'+i+'"></div>');
        $(".pg").append(e);
        //Set offset value Y
        if (pile[i].length==7){
            var offsetY = 0;
        }
        else{
            var offsetY = 50;
        }

        for (j=0;j<pile[i].length;j++)
        {
            //Set offset value X
            if (pile[i][j].length==7){
                var offsetX = 0;
            }
            else{
                var offsetX = 50;
            }

            for (k=0;k<pile[i][j].length;k++)
            {
                if (pile[i][j][k] == 1){
                    c++;
                    x = offsetX + k * 100;
                    y = offsetY + j * 100;
                    e.append($('<div div class="card unselectedcard" style="top:'+y+'px;left:'+x+'px;"></div>'))
                }
                
            }
        }
    }
    console.log(c);

    if (c%3 != 0 || c != count){
        alert("Invalid count of tiles.");
    }

    //insert type to tile cards
    $(".unselectedcard").each(function(){
        $(this).attr("type",tilelist.pop());
    });

    $(".card").each(function(){
        $(this).append($('<div class="shade"></div>'))
    });


}

function shuffleTypes(){
    var tempTiles = [];

    $(".unselectedcard").each(function(){
        tempTiles.push($(this).attr("type"));
    });

    shuffledTempTiles = shuffle(tempTiles);

    $(".unselectedcard").each(function(){
        $(this).attr("type",shuffledTempTiles.pop());
    });
}

function initializeTiles(dist){
    var tilelist = [];
    for (const [k, v] of Object.entries(dist)){
        for (i=v;i!=0;i--){
            tilelist.push(k);
            dist[k]--;
        }
    }
    shuffledTilelist = shuffle(tilelist)
    return shuffledTilelist;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  