fetch("http://210.99.223.38:30000/rest/v1/auth/do", {
  method: 'POST',
  headers : {
     'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      userId : "testId1235",
      password: "testPassword"
  })
}).then(response => response.json())
.then(response =>{
   console.log(response);
   document.getElementById('message').innerHTML = response.message;
})
.catch(err => console.error(err));

// ================== with form data ======================
const signinForm = document.getElementById('form-signin');
    
signinForm.addEventListener('submit', function (e){
  e.preventDefault();
  var userIdval = document.getElementById('userId').value;
  var passwordval = document.getElementById('password').value;
        
  fetch("http://210.99.223.38:30000/rest/v1/auth/do", {
  method: 'POST',
  headers : {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: userIdval,
    password: passwordval
  }),
}).then(response => response.json())
.then(response =>{
  console.log(response);
  
  if (response.status == "OK") {
      document.getElementById('message').innerHTML = response.message;
      setTimeout(function(){
      window.location.href = 'reservation.html';
   }, 1000);
  } else {
      document.getElementById('message').innerHTML = response.message;
  }
})
.catch(err => console.error(err));
})


fetch("https://127.0.0.1:5500/golf/position", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.text())
  .then(result => {
    var position = JSON.parse(result);
    var table = document.getElementById("myTable");

    // console.log(position)[0].data[0])
    console.log(position.length)
    var colLength = position[0].data.length;
    var rowLength = position.length;
    var table = document.getEmenentById('schedules');

    var tableLength = table.length;
    var row = table.getElementByTagName('thead')[0].insertRow(rowLength);

  })
  .catch(error => console.log('error', error));

  // reservation page scratch
      // while ( i <= index ){
    //       var table = document.getElementById('schedules');
    //       var tableLength = table.length;
    //       var tbodyrow = table.getElementsByTagName('tbody')[0].insertRow(tableLength);
    //       var cell = tbodyrow.insertCell(-1);
    //       cell.innerHTML = "<div class='index text-center'>"+ i +" <i class='fa fa-lock' aria-hidden='true'></i></div>";
    //       var cell = tbodyrow.insertCell(-1);
    //       cell.innerHTML = ""; 
    //       var cell = tbodyrow.insertCell(-1); 
    //       cell.innerHTML = "";  
    //       var cell = tbodyrow.insertCell(-1); 
    //       cell.innerHTML = "";  
    //       var cell = tbodyrow.insertCell(-1);
    //       cell.innerHTML = "";   
    //       var cell = tbodyrow.insertCell(-1);
    //       cell.innerHTML = ""; 
    //       var cell = tbodyrow.insertCell(-1);   
    //       cell.innerHTML = ""; 
    //       var cell = tbodyrow.insertCell(-1);  
    //       cell.innerHTML = ""; 
    //       var cell = tbodyrow.insertCell(-1);            
    //       cell.innerHTML = "";  
    //       var cell = tbodyrow.insertCell(-1);  
    //       cell.innerHTML = "";  
    //   i++;
    // }
    function updateCell(dataAr,table,rn,cn,content){
      dataAr.forEach( r => {
      if (r.reservation === true) {  
        let x=document.getElementById(table).rows[parseInt(rn,10)].cells;
        x[parseInt(cn,10)].innerHTML=content;
        }else{
          //console.log('false')
        }
      });
    }

      // var dataAr = slots[5];
      // var table = "schedules";

      // var rn = 1;
      // var cn = 1;
      // var content = "<div class='seat'>홍가을고객님</div>";
      // updateCell(dataAr,table,rn,cn,content);

      // var rn = 3;
      // var cn = 1;
      // var content = "<div class='seat'>홍가을고객님</div>";
      // updateCell(dataAr,table,rn,cn,content);

      // var rn = 5;
      // var cn = 1;
      // var content = "<div class='seat'>홍가을고객님</div>";
      // updateCell(dataAr,table,rn,cn,content);

      function getlistnum(table,url,res){
        fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
          }).then(response => response.text())
          .then(result => {
          var slots = JSON.parse(result);    
          return res.length;    
        }).catch(error => console.log('error', error));
      }
      
      function getIndex(){
      
      }

// updated nov 2 update code backup


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

function displayReservation(url,positionref){
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
    }).then(response => response.text())
      .then(result => {
      var seats = JSON.parse(result);
      var slots = seats.data;

      // get num bat/position list
      positionref.forEach( pr => {
        var bat = pr.id;
        var celldata = slots[bat];

        var table = document.getElementById('schedules');
        var tableLength = table.length;
        var tbodyrow = table.getElementsByTagName('tbody')[0].insertRow(tableLength);
        var cell = tbodyrow.insertCell(-1);
        cell.innerHTML = "<div class='index text-center'>"+ bat +" <i class='fa fa-lock' aria-hidden='true'></i></div>";
        
        celldata.forEach( cd => {     
          if (cd.reservation == true){
            var cell = tbodyrow.insertCell(-1);
            cell.innerHTML = "<div class='seat text-center'>"+ cd.reservationMemberName +"</div>";
          }else{
            var cell = tbodyrow.insertCell(-1);
            cell.innerHTML = "<div class='seat'></div>";
          }   
        });
        
      });
    }).catch(error => console.log('error', error));
}

// time values
fetch("./timeslot.json", {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
    }).then(response => response.text())
    .then(result => {
    var slots = JSON.parse(result);
    var time = slots[0].data;
    var table = document.getElementById('schedules');
    var tableLength = table.length;
    var theadrow = table.getElementsByTagName('thead')[0].insertRow(tableLength);
    var cell = theadrow.insertCell(-1); 
    cell.innerHTML = "<div class='col-lg-12 col-xs-12 text-right bat'> 시간 </div> <div class='col-lg-12 col-xs-12 text-left time'> 타석 </div>";  
    time.forEach( st => {
      var celli = theadrow.insertCell(-1); 
      celli.innerHTML = "<div class='timecont'><div class='start text-center'>"+ st.startTime + "</div><div class='end text-center'>-" + st.endTime +"</div></div>";
    });        
  }).catch(error => console.log('error', error));

// position
fetch("http://210.99.223.38:30000/rest/v1/lesson/get/list", {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => response.text())
.then(result => {
var position = JSON.parse(result);
var positionref = position.data;

var url_string = window. location. href; 
var url = new URL(url_string);
var c = url.searchParams.get("date");

if(c != null){
  var searchdate = document.getElementById("reservationdate").value = c;  
}else{
  var searchdate = document.getElementById("reservationdate").value = today;  
}

var url = "http://210.99.223.38:30000/rest/v1/position/get/reservation-list?date="+searchdate;
displayReservation(url,positionref);

setTimeout(function(){
  location.reload();
}, 2000);

document.getElementById('reservationdate').addEventListener('change', function(){          
  var searchdate = document.getElementById("reservationdate").value;
  window.location.href = 'reservation.html?date='+searchdate;
});

});

// $(function(){
  
//   function today(){
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();

//     today = yyyy + '-' + mm + '-' + dd;
//   }

//   function displayReservation(url,positionref){
//     fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//       }).then(response => response.text())
//         .then(result => {
//         var seats = JSON.parse(result);
//         var slots = seats.data;
//           //console.log(slots)
//         // get num bat/position list
//         positionref.forEach( pr => {
//           var bat = pr.id;
//           var celldata = slots[bat];

//           var table = document.getElementById('schedules');
//           var tableLength = table.length;
//           var tbodyrow = table.getElementsByTagName('tbody')[0].insertRow(tableLength);
//           var cell = tbodyrow.insertCell(-1);
//           cell.innerHTML = "<div class='index text-center'>"+ bat +"</div>";
          
//           celldata.forEach( cd => {     
//             if (cd.reservation == true){
//               var cell = tbodyrow.insertCell(-1);
//               cell.innerHTML = "<div class='seat text-center'>"+ cd.reservationMemberName +"</div>";
//             }else{
//               var cell = tbodyrow.insertCell(-1);
//               cell.innerHTML = "<div class='seat'></div>";
//             }   
//           });        
//         });
//       }).catch(error => console.log('error', error));
//   }

//   function updateCell(url,bat){
//     $.ajax({
//       type: 'GET',
//       url: url,
//       success: function(result){
//         var slots = result.data;
//         // get num bat/position list
//         $.each(bat,function(i, bat){
//           var id = bat.id;
//           $.each(slots[id], function(j,cell){
//             j++;
//             if (cell.lock === true){
//               let x=document.getElementById("schedules").rows[id].cells;
//               x[0].innerHTML="<div class='index lock text-center'>"+ id +" <i class='fa fa-lock' aria-hidden='true'></i></div>" 
//             }else{
//               let x=document.getElementById("schedules").rows[id].cells;
//               x[0].innerHTML="<div class='index unlock text-center'>"+ id +" <i class='fa fa-unlock' aria-hidden='true'></i></div>";            
//             }   

//             if (cell.reservation !== false){
//               let x=document.getElementById("schedules").rows[id].cells;
//               x[j].innerHTML="<div class='seat text-center'>"+ cell.reservationMemberName +"</div>";
            
//             }else{
//               let x=document.getElementById("schedules").rows[id].cells;
//               x[j].innerHTML="<div class='seat text-center'></div>";
              
//             }
//           });
//         });
//       },//success end
//       error: function(){
//         console.log("error loading data");
//       }
      
//     })
//   }

//   // function updateCell(url,positionref){  
//   //   fetch(url, {
//   //     method: 'GET',
//   //     headers: {
//   //       'Content-Type': 'application/json'
//   //     }
//   //     }).then(response => response.text())
//   //       .then(result => {
//   //         var seats = JSON.parse(result);
//   //         var slots = seats.data;

//   //         // get num bat/position list
//   //         positionref.forEach( pr => {
//   //           var bat = pr.id;       
//   //           var celldata = slots[bat];
//   //           celldata.forEach( cd => {
                
//   //             if (cd.lock === true){
//   //               let x=document.getElementById("schedules").rows[bat].cells;
//   //               x[0].innerHTML="<div class='index text-center'>"+ bat +" <i class='fa fa-lock' aria-hidden='true'></i></div>" 
//   //             }else{
//   //               let x=document.getElementById("schedules").rows[bat].cells;
//   //               x[0].innerHTML="<div class='index text-center'>"+ bat +" <i class='fa fa-unlock' aria-hidden='true'></i></div>";            
//   //             }            
//   //             cn++;
//   //           });          
//   //           var cn = 1;
//   //           celldata.forEach( cd => {     
//   //             if (cd.reservation !== false){
//   //               let x=document.getElementById("schedules").rows[bat].cells;
//   //               x[cn].innerHTML="<div class='seat text-center'>"+ cd.reservationMemberName +"</div>";
              
//   //             }else{
//   //               let x=document.getElementById("schedules").rows[bat].cells;
//   //               x[cn].innerHTML="<div class='seat text-center'></div>";
                
//   //             }
//   //             cn++;
//   //           });
            
//   //         });
//   //       }).catch(error => console.log('error', error));
//   // }


//   // time values
//   fetch("./timeslot.json", {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//       }).then(response => response.text())
//       .then(result => {
//       var slots = JSON.parse(result);
//       var time = slots[0].data;
//       var table = document.getElementById('schedules');
//       var tableLength = table.length;
//       var theadrow = table.getElementsByTagName('thead')[0].insertRow(tableLength);
//       var cell = theadrow.insertCell(-1); 
//       cell.innerHTML = "<div class='col-lg-12 col-xs-12 text-right bat'> 시간 </div> <div class='col-lg-12 col-xs-12 text-left time'> 타석 </div>";  
//       time.forEach( st => {
//         var celli = theadrow.insertCell(-1); 
//         celli.innerHTML = "<div class='timecont'><div class='start text-center'>"+ st.startTime + "</div><div class='end text-center'>-" + st.endTime +"</div></div>";
//       });        
//       }).catch(error => console.log('error', error));

//   // position
//   fetch("http://210.99.223.38:30000/rest/v1/lesson/get/list", {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then(response => response.text())
//   .then(result => {
//       var position = JSON.parse(result);
//       var positionref = position.data;

//       var url_string = window. location. href; 
//       var url = new URL(url_string);
//       var c = url.searchParams.get("date");

//       if(c != null){
//         var searchdate = document.getElementById("reservationdate").value = c;  
//       }else{
//         var searchdate = document.getElementById("reservationdate").value = today();  
//       }
//       var url = "http://210.99.223.38:30000/rest/v1/position/get/reservation-list?date="+searchdate;
//       displayReservation(url,positionref);
            
//       setInterval(function(){
//         var url = "http://210.99.223.38:30000/rest/v1/position/get/reservation-list?date="+searchdate;
//         updateCell(url,positionref);
//       },1000);

//       $("#reservationdate").change(function(){
//         var searchdate = document.getElementById('reservationdate').value;
//         window.location.href = 'reservation.html?date='+searchdate;
//       });

//   });

// })

// get num bat/position list
        
// if(getDayname(getsearchdate()) === 'Saturday'){
//   var timeData = timeData.slice(0,32);
// }
// else if(getDayname(getsearchdate()) === 'Sunday'){
//   var timeData = timeData.slice(6,29);
// }
// else{
//   var timeData = timeData;
// }