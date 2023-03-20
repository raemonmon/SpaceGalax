var player = $("#player")
var speed = 25
var killEnemey;
var x;
const scoreCounter = document.querySelector('#score span')

document.getElementById('myAudio')
function playAudio() { 
    x.play(); 
  } 
  
$(document).keypress(function(e){
    var x = parseFloat(player.css("margin-left"))
    var y = parseFloat(player.css("margin-top"))

    console.log("X:"+x+" Y:"+y)

    if(e.keyCode == 97){
        //Move Backward
        if(x>=50){
            player.css({"margin-left":(x-speed)})
        }
        
    }else if(e.keyCode == 119){
        if(y>=0){
            player.css({"margin-top":(y-speed)})
        }
        
    }else if(e.keyCode == 100){
        if(x<=950){
            player.css({"margin-left":(x+speed)})
        }
    }else if(e.keyCode == 115){
        if(y<=475){
            player.css({"margin-top":(y+speed)})
        }
    }else if(e.keyCode == 32){
        var b_id = Math.floor(Math.random() * 9999999) + 1
        $("#game").append('<div class="bullets" id="b'+b_id+'" style="margin-left:'+(x+90)+'px;margin-top:'+(y+58)+'px"></div>')
        // Moving the bullet from left to right in an interval
        setInterval(function(){
            var current_bpos = parseFloat($("#b"+b_id).css("margin-left"))
            $("#b"+b_id).css({"margin-left":current_bpos+30})

            $(".enemy").each(function(){
                if(collision($("#b"+b_id),$(this))){
                    $(this).remove()
                    $("#b"+b_id).remove()
                    scoreCounter.innerText = parseInt(scoreCounter.innerText)+100
                
                    // Additional Code here after collision
                }
            })

            // Remove the bullet on the gameboard after reaching the end
            if(current_bpos > 1850){
                $("#b"+b_id).remove()
            }
        })
    }

    
})
var collision_player_listener = setInterval(function(){
    $(".enemy").each(function(){
        if(collision($(this),player)){
            // alert("Game Over")
            console.log("Game Over")
            // clearInterval(collision_player_listener)
        }        
    })
})


setInterval(function(){
    var summoner = Math.floor(Math.random() * 5) + 1

    var enemy_id = Math.floor(Math.random() * 999999) + 1 
    $("#summoner"+summoner).append('<img id="enemy'+enemy_id+'" class="enemy" src="resources/images/alien.png" alt="Alien Enemy">')
    $("#enemy"+enemy_id).animate({"margin-left":"-2500px"},6000,function(){
        $(this).remove()
    })
} ,700) 

setInterval(function(){
    var summoner = Math.floor(Math.random() * 5) + 1
    var planet = Math.floor(Math.random() * 5) + 1
    var planet_class = Math.floor(Math.random() * 5) + 1 
    var planet_id = Math.floor(Math.random() * 999999) + 1 
    $("#summoner"+summoner).append('<img id="p'+planet_id+'" class="planet'+planet_class+' planets" src="resources/images/planet'+planet+'.png" alt="Planets">')

    var anim_speed = 0;
    if(planet_class == 1){
        anim_speed = 25000
    }else if(planet_class == 2){
        anim_speed = 24000
    }else if(planet_class == 3){
        anim_speed = 23000
    }else if(planet_class == 4){
        anim_speed = 22000
    }else if(planet_class == 5){
        anim_speed = 21000
    }
    $("#p"+planet_id).animate({"margin-left":"-22000px"},anim_speed,function(){
        $(this).remove()
    })
},1000)
