var inp = document.getElementById("inp");
var but = document.getElementById("submit");
var timest, timeend;


inp.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        but.click();
    }
  });


but.addEventListener("click", function(){
    var ans = inp.value;
    inp.disabled = "diabled";
    if(ans.toLowerCase().includes("world") && ans.toLowerCase().includes("wide")&& ans.toLowerCase().includes("web")){
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
                var tdata = {time: timediff, puzzleno: "puzzle8"};
                var timedata = JSON.stringify(tdata);
                xhr.send(timedata);

            })()
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    }
    else
    {
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