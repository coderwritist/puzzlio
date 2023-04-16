cluebtn = document.getElementById("clue")
ansbtn = document.getElementById("chat-submit");
inp = document.getElementById("chat-input");
inp.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        ansbtn.click();
    }
  });
var timest, timeend;
cluebtn.addEventListener("click", function(){
    myLink = "https://www.youtube.com/watch?v=E_Ci-pAL4eE"
    window.open(myLink, '_blank');
    window.open(myLink, '_blank');

});

ansbtn.addEventListener("click", function(){
    var ans = document.getElementById("chat-input").value;
    inp.disabled = "diabled";
    if(ans.toLowerCase().includes("room") && ans.toLowerCase().includes("2")){
        timeend = new Date();
        var timediff = timeend - timest;
        (async()=>
        {
            const xhr1 = new XMLHttpRequest();
            xhr1.open('POST', `/door3open`);
            xhr1.onload = function() {
                if (xhr1.status === 200) {
                  // Handle success response
                  console.log(xhr1.responseText);
                } else {
                  // Handle error response
                  console.log('Error!');
                }
              };
            xhr1.send();
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
              var tdata = {time: timediff, puzzleno: "puzzle2"};
              var timedata = JSON.stringify(tdata);
            xhr.send(timedata);

        })();
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