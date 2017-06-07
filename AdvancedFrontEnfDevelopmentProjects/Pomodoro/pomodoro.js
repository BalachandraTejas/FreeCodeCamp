
var time = 0; //5000;//1500000;//1 second = 1000; 
var breakTime = 0;//4000;//300000;
var widthProgress = 0;
var width, seconds ;
var progress, isbreak = 0;

$('#pt-minus').click(function(){
    var value = parseInt($("#pomodoro-time").html());
    if(value>0)
        value--;
    parseInt($("#pomodoro-time").html(value));
});
$('#pt-plus').click(function(){
    var value = parseInt($("#pomodoro-time").html());
    value++;
    parseInt($("#pomodoro-time").html(value));
});
$('#break-minus').click(function(){
    var value = parseInt($("#break-time").html());
    if(value>0)
        value--;
    parseInt($("#break-time").html(value));
});
$('#break-plus').click(function(){
    var value = parseInt($("#break-time").html());
    value++;
    parseInt($("#break-time").html(value));
});




function incrementProgressBar() {
    if(isbreak) {
        seconds = breakTime/1000;
        $('#progressbar').addClass('progress-bar-danger');
        $('#message').html('BREAK');
    } else {
        seconds = time / 1000;
        $('#progressbar').removeClass('progress-bar-danger');
        $('#message').empty();
    }
    var remainingTotalSeconds = 0, remainingMinutes = 0, remainingSeconds = 0;
    widthProgress += 100 / seconds;
    width = widthProgress.toString() + "%";
    
    remainingTotalSeconds = seconds - (widthProgress *.01 * seconds).toFixed();
    remainingMinutes = (remainingTotalSeconds/60)<1? 0 : parseInt(remainingTotalSeconds/60);
    remainingSeconds = remainingTotalSeconds - (remainingMinutes * 60);
    
    $('#progressbar').css('width',width);
    $('#progressbar').html( remainingMinutes + ":" + remainingSeconds );
    if(widthProgress>99){
        clearInterval(progress);
        if(isbreak) 
            isbreak = 0;
        else 
            isbreak = 1;
        
        loopTime();
    }
}

function loopTime() {
    
    widthProgress = 0;
    progress = setInterval( incrementProgressBar, 1000);
}

$("#start").click(function() {
    time = parseInt($("#pomodoro-time").html()) * 60 * 1000;
    breakTime = parseInt($("#break-time").html()) * 60 * 1000;

    progress = setInterval( incrementProgressBar, 1000);
    $(this).attr("disabled", "disabled");
});

$("#pause").click(function() {
    if($(this).html() === "PAUSE" ){
        clearInterval(progress);
        if(widthProgress != 0)
            $(this).html("RESUME");
    } else {
        progress = setInterval( incrementProgressBar, 1000);
        $(this).html("PAUSE");
    }
});

$("#reset").click(function() {
    $('#progressbar').css('width',0);
    widthProgress = 0;
    isbreak = 0;
    clearInterval(progress);
    $("#pause").html("PAUSE");
    $("#start").removeAttr("disabled");
});
