document.addEventListener("DOMContentLoaded", function(event) {
    var container= document.getElementById("container");
    var container1= document.getElementById("container1");
    var prev= document.getElementById("prev");

document.addEventListener("mousemove", function(event) {
    
    // title.style.transform = "translateY(-0%)";
    // title.style.transition = "all 1s ease-out";
    // doors.style.display = "flex";
    // doors.style.opacity = 1;
    // doors.style.transition = "opacity 3s ease-in";
	// background-color: #f7f7f7;
    var body = document.getElementById("body");
    prev.style.opacity = 0;
    container.style.opacity = 0;
    container1.style.opacity = 1;
    body.style.backgroundColor = "#f7f7f7";
    body.style.transition = "background-color 3s ease-in";
    container.style.transition = "all 2s ease-in";
    prev.style.transition = "all 2s ease-in";
    container1.style.transition = "all 3s ease-in";




  document.removeEventListener("mousemove", arguments.callee);
});
});