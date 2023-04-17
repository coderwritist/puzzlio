var totaltime = 0;
var max = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function comp(a, b)
{
    // sort in descending order based on ov
    console.log(a.ov, b.ov)
    return b.ov-a.ov;
}

function calc(users)
{    
    // iterate through users
    for (var i = 0; i < users.length; i++)
    {
        var total = 0;
        var count = 0;
        // iterate through times
        for (var j = 1; j <= 9; j++)
        {
            // if time is not null
            if (users[i].times[`puzzle${j}`] != null)
            {
                // add time to total
                total += users[i].times[`puzzle${j}`];
                // increment count
                count++;
            }
        }
        totaltime += total;
        users[i]["total"] = total;
        users[i]["count"] = count;
        if(count === 0)
            users[i]["avg"] = -1*Math.max();
        else
            users[i]["avg"] = total/count;
    }

    // find max values for each puzzle
    for(let i = 0; i<9; i++)
    {
        for(let j = 0; j<users.length; j++)
        {
          if(users[j].times[`puzzle${i+1}`] != null)
            if(users[j].times[`puzzle${i+1}`] > max[i])
                max[i] = users[j].times[`puzzle${i+1}`];
        }
    }
    console.log(max);
    var maxwc = max[0]+max[5]+max[8];
    for(let i = 0; i<users.length; i++)
    {
      var a, b, c;
        if(users[i].times.puzzle1 == null)
            a = max[0] + 100;
        else
            a = users[i].times.puzzle1;
        if(users[i].times.puzzle9 == null)
            c = max[8]+100;
        else
            c = users[i].times.puzzle9;
        var timwc = a+c;
        console.log("tim", timwc);
        console.log("max", maxwc);
        users[i]["wc"] = (maxwc-timwc)/maxwc *100
    }
    var maxls = max[4] + max[7];
    for(let i = 0; i<users.length; i++)
    {
        var a, b;
        if(users[i].times.puzzle5 == null)
            a = max[4]+100;
        else
            a = users[i].times.puzzle5;
        if(users[i].times.puzzle8 == null)
            b = max[7]+100;
        else
            b = users[i].times.puzzle8;
        var timls = a+b;
        users[i]["ls"] = (maxls-timls)/maxls *100;
    }
    // 4, 9, 3, 5
    var maxla = max[3] + max[8] + max[2] + max[4];
    for(let i = 0; i<users.length; i++)
    {
        var a, b, c, d;
        if(users[i].times.puzzle4 == null)
            a = max[3]+100;
        else
            a = users[i].times.puzzle4;
        if(users[i].times.puzzle9 == null)
            b = max[8]+100;
        else
            b = users[i].times.puzzle9;
        if(users[i].times.puzzle3 == null)
            c = max[2]+100;
        else
            c = users[i].times.puzzle3;
        if(users[i].times.puzzle5 == null)
            d = max[4]+100;
        else
            d = users[i].times.puzzle5;        
        var timcla = a+b+c+d;
        users[i]["la"] = (maxla-timcla)/maxla *100;
    }

    var maxc = max[1] + max[6];
    for(let i = 0; i<users.length; i++)
    {
          var a, b;
        if(users[i].times.puzzle2 == null)
            a = max[1]+100;
        else
            a = users[i].times.puzzle2;
        if(users[i].times.puzzle7 == null)
            b = max[6]+100;
        else
            b = users[i].times.puzzle7;
        var timc = a+b;
        users[i]["c"] = (maxc-timc)/maxc *100;
    }
    for(let i = 0; i<users.length; i++)
        users[i]["ov"] = (users[i]["wc"] + users[i]["ls"] + users[i]["la"] + users[i]["c"])/4;

    users.sort(comp);
    console.log(users)
}

function updatecards(users)
{
    var p1 = document.getElementById("p1");
    var p2 = document.getElementById("p2");
    var p3 = document.getElementById("p3");
    p1.innerHTML = users.length
    p2.innerHTML = (totaltime/(1000*60)).toFixed(2) + " minutes"
    p3.innerHTML = users[0].username
}

updateleaderboard = (users) => {
    tb = document.getElementById("tbody");
    // create a new row
    for (var i = 0; i < users.length; i++)
    {
        // create a new row
        var row = document.createElement("tr");
        var c1 = document.createElement("td");
        var c2 = document.createElement("td");
        var c3 = document.createElement("td");
        var c4 = document.createElement("td");
        var c5 = document.createElement("td");
        var c6 = document.createElement("td");
        c1.innerHTML = users[i].username;
        c2.innerHTML = users[i].wc.toFixed(2) + "%";
        c3.innerHTML = users[i].ls.toFixed(2) + "%";
        c4.innerHTML = users[i].la.toFixed(2) + "%";
        c5.innerHTML = users[i].c.toFixed(2) + "%";
        c6.innerHTML = users[i].ov.toFixed(2) + "%";
        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);
        row.appendChild(c5);
        row.appendChild(c6);
        tb.appendChild(row);
    }
}

function drawgraph(users)
{
    var data = []
    // find max avg
    var maxavg = Math.max();
    for(let i = 0; i<users.length; i++)
    {
        if(users[i].avg !== -1*Math.max())
            if(users[i].avg > maxavg)
                maxavg = users[i].avg;
    }
    console.log("maxavg:", maxavg)
    for(let i = 0; i<users.length; i++)
    {
        if(users[i].avg === -1*Math.max())
            data.push({x: i+1, y: maxavg/(1000)+5})
        else
            data.push({x: i+1, y: users[i].avg/(1000)})
        console.log(users[i].avg);
    }
    new Chart(
        document.getElementById('can'),
        {
          type: 'scatter',
          data:{
            datasets: [{
              label: 'Players',
              data: data,
              backgroundColor: 'cornflowerblue'
            }],
          },
          options: {
            plugins: {
                title: {
                    display: true,
                    text: 'The average time each player spends on a puzzle',
                    color: "white",
                    font: {
                        family: "monospace",
                        size: 24 // Change font size
                      }
                }
            },
            legend: {
                labels: {
                  font: {
                    size: 14,
                  },
                  color: 'white'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white',
                        font: {
                            size: 14,
                        }
                      },
                  title: {
                    display: true,
                    text: 'Indexed player numbers',
                    font: {
                        size:18
                    },
                    color:"white"
                  }
                },
                y: {
                    ticks: {
                        font: {
                            size: 14,
                        },
                        color: 'white',
                      },
                  title: {
                    display: true,
                    text: 'Time (seconds)',
                    font: {
                        size:18
                    },
                    color:"white"
                  }
                }
              }
        }
        }
      );
}


window.onload = function() {

    (async()=>
    {
      try {
        var res = await fetch('/getallusers');
        var restemp= await res.json();
        users= restemp.users; 
        console.log(users);
        calc(users);
        updatecards(users);
        updateleaderboard(users);
        drawgraph(users);
      } catch (error) {
        console.error(error);
      }
        
    })()
      // console.log(users.length)
      

}