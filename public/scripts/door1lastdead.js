var ans = document.getElementById("inp");
var btn = document.getElementById("submit");

ans.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        btn.click();
    }
  });

var timest, timeend;

btn.addEventListener("click", function() {
    myLink ="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    inp.disabled = "";
    if (ans.value.toUpperCase().includes("IT IS A DEAD END") && ans.value.toUpperCase().includes("GO TO ROOM 3")) 
    {
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
                var tdata = {time: timediff, puzzleno: "puzzle3"};
                var timedata = JSON.stringify(tdata);
                xhr.send(timedata);

            })()
        window.open(myLink, '_blank');
    } else {
        var modal = document.getElementById("wrong-modal");
        modal.style.display = "block";
    }
});

function funcgoback(){
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