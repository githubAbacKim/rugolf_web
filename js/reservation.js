
$(function (){ 
      var session = localStorage.getItem('loginsess');
      if(session !== null){
        displayTimeSlot();    
        displayReservation(); 
      }else{ 
        window.location.href = 'index.html';
      }

      function today(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    
        today = yyyy + '-' + mm + '-' + dd;
        return today;
      }
      
      function getsearchdate(){
        var url_string = window. location. href; 
          var url = new URL(url_string);
          var c = url.searchParams.get("date");
          
          if(c != null){
            var searchdate = document.getElementById("reservationdate").value = c;  
          }else{
            var searchdate = document.getElementById("reservationdate").value = today();  
          }

          return searchdate;
      }

      function getDayname(date){
        var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        var a = new Date(date);
        var todayis = weekday[a.getDay()];
        return todayis;
      }

      function getCell(time){
        $.each(result, function(i,data){
          if(data.startTime === time){
            return cell = data.slot;              
          }
        });
        return cell;
      }

      function genCols(rownum,colnum,stat,name){
        if (stat !== false){      
          let row=document.getElementById("schedules").rows[rownum].cells;
          row[colnum].innerHTML="<div class='seat text-center'>"+ name +"</div>";                
        }else{
          let row=document.getElementById("schedules").rows[rownum].cells;
          row[colnum].innerHTML="<div class='seat text-center'></div>"; 
        }
      }

      //position data
      function getBat(){
        var tmp = null;
        $.ajax({//START...
            url:'http://210.99.223.38:30000/rest/v1/lesson/get/list',
            type:'GET',
            async:false,
            dataType:'json',
            success: function(response){
                tmp = response;
            }
          });//END....
          return tmp;
        }
      
      // reservation data
      function getReservation(){
        var tmp = null;
        $.ajax({//START...
          url:"http://210.99.223.38:30000/rest/v1/position/get/reservation-list?date="+getsearchdate(),
          type:'GET',
          async:false,
          dataType:'json',
          success: function(response){
              tmp = response;
          }
        });//END....
        return tmp;
      }

      // timeslot data
      function getTimeLabel(){
        var tmp = null;
        $.ajax({//START...
          url:'./json/slots.json',
          type:'GET',
          async:false,
          dataType:'json',
          success: function(response){
              tmp = response;
          }
        });//END....
        return tmp;
      }

      function getuser(){
        var tmp = null;
        $.ajax({//START...
          url:"http://210.99.223.38:30000/rest/v1/my/reservation-list",
          type:'GET',
          async:false,
          dataType:'json',
          success: function(response){
              tmp = response;
          }
        });//END....
        return tmp;
      }

      function getarraytime(){
          var bat = getBat().data;
          var slots = getReservation().data; 
          var timearray = [];
          $.each(bat, function(i,data){
            var id = data.id;
            $.each(slots[id],function(j,slot){
              timearray.push({
                "startTime" : slot.startTime,
                "endTime" : slot.endTime
                });
            });
            
          });
          return timearray.sort();
      }
      
      function apitime(myArray){ 
        var result = [];
        $.each(myArray, function (i, e) {
            var matchingItems = $.grep(result, function (item) {
              return item.startTime === e.startTime && item.startTime === e.startTime;
            });
            if (matchingItems.length === 0){
                result.push(e);
            }
        });
        const newarray = result.sort((a,b) => {
          return (a.startTime > b.startTime) ? 1 : -1
        });
        return newarray;
      }

      function displayTimeSlot(){
        var data = apitime(getarraytime());
        var today = getsearchdate();
        var addrow = "<tr>"
          addrow+="<th class='fixed-side'><div class='col-lg-12 col-xs-12 text-right bat'> 시간 </div> <div class='col-lg-12 col-xs-12 text-left time'> 타석 </div></th>"          
        $.each(data,function(i,slot){
          addrow+="<td><div class='timecont'><div class='start text-center'>"+ slot.startTime + "</div><div class='end text-center'>-" + slot.endTime +"</div></td>"
        });
        addrow+="</tr>";
        $("table thead").append(addrow);
      }
      
      function postbat(dataParam,url,type){
        fetch(url, {
          method: 'POST',
          headers : {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataParam)
        })        
        .then(response => response.json())
        .then(response =>{    
          console.log(response.message);
          updateContents();
        })
        .catch(err => console.error(err)); 
      }

      function cancelreservation(dataParam,url){
        fetch(url, {
          method: 'POST',
          headers : {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataParam)
        })        
        .then(response => response.json())
        .then(response =>{    
          console.log(response.message);
          updateContents();
        })
        .catch(err => console.error(err)); 
      }

      function displayReservation(){
        var bat = getBat();
        var slots = getReservation().data;
        var timeData = apitime(getarraytime());
        
        $.each(bat.data,function(i, bat){
          var id = bat.id;      

          var addrow = "<tr>"
            addrow+="<th class='fixed-side'><div class='index text-center' id='bat"+ id +"' data-id='"+ id +"'>"+ id +"</div></th>"   
          //display time label
          $.each(timeData, function(j,col){                
            j++;                
            var time = col.startTime;
            var divId = id+time.substr(0,5);
                divId = divId.replace(":","");
                addrow+="<td><div id='"+ divId +"' data-id='"+ id +"' data-time='"+ col.startTime +"' class='seat text-center'></div></td>"
          });
          addrow+="</tr>";
          $("table tbody").append(addrow);
        });
      }
      
      function updateContents(){
        var bat = getBat().data;
        var slots = getReservation().data;
        
        $.each(bat,function(i, bat){
          var id = bat.id;  
          
          if( id < 21){
            var contentBat = "<div class='index text-center' id='bat"+ id +"' data-id='"+ id +"'>"+ id +"번 카카오vx TR</div>";
          }
          else if(id >20){
            var contentBat = "<div class='index text-center' id='bat"+ id +"' data-id='"+ id +"'>"+ id +"번 SG골프 SDR</div>";
          }
          
          var batstat = null;
          $.each(slots[id], function(j,cell){
            j++;
            var time = cell.startTime;
            var divId = id+time.substr(0,5);
                divId = divId.replace(":","");

            var revdiv =  "r"+divId;
                if(cell.lock === false){
                  $("#"+divId).attr('data-bat',id);
                  $("#"+divId).attr('data-time',time);
                  $('#'+divId).attr('data-lock',cell.lock);
                  $('#'+divId).attr('data-reservation',cell.reservation);
                  if(cell.reservation === true){
                    var contentTime = cell.reservationMemberName+"<br />"+addhypen(cell.reservationMemberPhoneNumber);
                  }else{
                    var contentTime = "<i class='fa fa-unlock' aria-hidden='true'></i>";
                    //var content = "";
                  }
                  batstat = false;
                }else{
                  $("#"+divId).attr('data-bat',id);
                  $("#"+divId).attr('data-time',time);
                  $('#'+divId).attr('data-lock',cell.lock);
                  $('#'+divId).attr('data-reservation',cell.reservation);                   
                   if(cell.reservation === true){
                    var contentTime = cell.reservationMemberName+"<br />"+addhypen(cell.reservationMemberPhoneNumber);
                    }else{
                      var contentTime = "<i class='fa fa-lock' aria-hidden='true'></i>";
                      //var content = "";
                    }
                   batstat = true;  
                }
            $("#"+divId).html(contentTime);   
                  
          });
          $("#bat"+id).attr('data-lock',batstat);
          $("#bat"+id).html(contentBat);  
        });
      }

      function addhypen(n){
        var newstring = n.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        return newstring
      }
      
      function lockbyTime(){
        var bat = getBat().data;        
        var slots = getReservation().data;
        $.each(bat,function(i, bat){
          var id = bat.id;
          $.each(slots[id], function(j,col){                
            j++;
            var time = col.startTime;
            var divId = id+time.substr(0,5);
                divId = divId.replace(":","");    
                
            var postdata = [];
            $('#'+divId).on('click',function(){   
              var tdTime = $(this).attr('data-time');
              var stat = $(this).attr('data-lock');
              var id = $(this).attr('data-bat');
              var reservation = $(this).attr('data-reservation');
              
              if(reservation === 'false'){
                postdata = [{
                  positionId: id,
                  date: getsearchdate(),
                  time: tdTime
                }];  
                var type = "time";
                if(stat === 'false'){
                  $('#'+divId).attr('data-lock',true);
                  $("#"+divId).html("<i class='fa fa-lock' aria-hidden='true'></i>"); 
                  var url = "http://210.99.223.38:30000/rest/v1/position/lock";
                  console.log('lock');
                }else{
                  $('#'+divId).attr('data-lock',false);
                  $("#"+divId).html("<i class='fa fa-unlock' aria-hidden='true'></i>"); 
                  var url = "http://210.99.223.38:30000/rest/v1/position/unlock";                               
                  console.log(postdata);
                }
                postbat(postdata,url,type);  
              }
              else{
                var text = "해당 타석 예약을 취소 하시겠습니까?";
                deldata = {
                  date: getsearchdate(),
                  time: tdTime,
                  positionId: id,
                };  
                var cancelbaturl = "http://210.99.223.38:30000/rest/v1/position/delete";
                
                if (confirm(text) == true) {
                  cancelreservation(deldata,cancelbaturl);
                } else {
                 return false;
                }
              }
                          
            });// click event closing
          }); // end of slot foreach
        });// end of bat foreach
      }
      
      function lockbyBat(){
        var bat = getBat().data;
        var slots = getReservation().data;
            $.each(bat,function(i, bat){
              var id = bat.id;
              var batDiv = '#bat'+id;
              $(batDiv).on('click',function(){
                var dataId = $(this).attr('data-id');
                var stat = $(this).attr('data-lock');
                var postdata = [];
                var x = 0;

                $.each(slots[dataId], function(j,col){ 
                  var tdTime = col.startTime;    
                  var divId = id+tdTime.substr(0,5);
                      divId = divId.replace(":","");
                   
                    //if(col.reservation === false){
                      if(col.lock === false){
                        postdata[j] = {
                          positionId: dataId,
                          date: getsearchdate(),
                          time: tdTime
                        }
                        //stat = false;                      
                        $("#"+divId).html("<i class='fa fa-lock' aria-hidden='true'></i>");  
                      }
                      else{
                        postdata[j] = {
                          positionId: dataId,
                          date: getsearchdate(),
                          time: tdTime
                        }
                        //stat = true;                      
                        $("#"+divId).html("<i class='fa fa-unlock' aria-hidden='true'></i>"); 
                      }
                    //}
                    
                                      
                }); // end of slot foreach
                  if(stat === 'false'){
                    var urlpost = "http://210.99.223.38:30000/rest/v1/position/lock"; 
                    $(batDiv).attr('data-lock',true);                     
                    console.log('lock');
                  }else{
                    var urlpost = "http://210.99.223.38:30000/rest/v1/position/unlock";  
                    $(batDiv).attr('data-lock',false);                  
                    console.log('unlock');
                  }
                  postbat(postdata,urlpost);  
                  console.log(postdata);
                  console.log(stat);
              }); 
            });// end of bat foreach
        
      }

      function loginsec(){
        var session = localStorage.getItem('loginsess');
        if(session === null){
          window.location.href = 'index.html';
        }
      }
      
      lockbyTime();
      lockbyBat();
      updateContents();

      var prev_count  = localStorage.current;
      setInterval(function(){   
        //console.log("reservation previews: "+prev_count);
        if(localStorage.current > prev_count || localStorage.current < prev_count){
          console.log('reservation data has been auto update!');
          prev_count = localStorage.current;
          updateContents();      
        }             
        //console.log("reservation current: "+localStorage.current);
      }, 1000);
      // var arraytime = apitime(getarraytime());
      $("#reservationdate").change(function(){
        var searchdate = document.getElementById('reservationdate').value;
        window.location.href = 'reservation.html?date='+searchdate;
      });    
  
});