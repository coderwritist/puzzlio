var inp = document.getElementById("text-input")
var but = document.getElementById("submit")
var timest, timeend;

inp.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        inp.disabled = "diabled";
        but.click();
    }
  });

but.addEventListener("click", function() {
    var val = inp.value
    inp.disabled = "diabled";
    if (val.toLowerCase() === "script") {

        timeend = new Date();
        var timediff = timeend - timest;
        (async()=>
            {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    if (xhr.status === 200) {
                    // Handle success response
                    console.log(xhr.responseText);
                    } else {
                    // Handle error response
                    console.log('Error!');
                    }
                };
                xhr.open('POST', `/timesave`);
                xhr.setRequestHeader("Content-Type", "application/json");
                var tdata = {time: timediff, puzzleno: "puzzle4"};
                var timedata = JSON.stringify(tdata);
                xhr.send(timedata);
                const xhr2 = new XMLHttpRequest();
                xhr2.open('POST', `/door2open`);
                xhr2.onload = function() {
                    if (xhr2.status === 200) {
                    // Handle success response
                    console.log(xhr2.responseText);
                    } else {
                    // Handle error response
                    console.log('Error!');
                    }
                };
                xhr2.send();

            })()
        
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }
    else{
        console.log("HI")
        var modal = document.getElementById("wrong-modal");
        modal.style.display = "block";
    }
});

function funcgoback(){
    console.log("HI2")
    var modal = document.getElementById("wrong-modal");
    modal.style.display = "none";
    inp.disabled = "";
    inp.focus();
}

var hint = document.getElementById("q");
hint.addEventListener("click", function(){
    var modal = document.getElementById("hint");
    modal.style.display = "block";
    var sa = document.getElementById("sa");
    var sap = document.getElementById("sap");
    sa.addEventListener("click", function(){
        sap.style.display = "block";
    });
    var cl = document.getElementById("close")
    cl.addEventListener("click", function(){
        sap.style.display = "none";
        modal.style.display = "none";
    });
});


window.onload = function() {

    timest = new Date();
  
  }