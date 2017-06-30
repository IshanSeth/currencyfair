
//Initializing the value for exchange rate and receivable amount
var exchangeRate = 1;
var receivableAmount = 1;

//Hiding the table of recent request on ready
$(document).ready(function(){
  $('#transfer_table').hide();
});


// Calculating rate on change of currenct
var ratecalculator = function(){  

  //setting the recievable value to null
  $('#receivable').val("");
  
  //collecting the value of changed currency  
  var currencyFrom = $('#currencyFrom').val();
  var currencyTo = $('#currencyTo').val();

  // Api request to collect the current exhange rate, The callback function will update the receivable amount based on the response
  if (currencyTo!=currencyFrom) {
    $.ajax({
      type: 'GET',
      url: 'http://api.fixer.io/latest?base='+currencyFrom,                
      cache: true,
      dataType: 'json',      
      success: function(response){            
        exchangeRate = response.rates[currencyTo];
        $('#rate').val(exchangeRate);
        if($('#amt').val()!=''){          
          receivableAmount = $('#amt').val() * exchangeRate;
          $('#receivable').val(receivableAmount.toFixed(2));
        }
      }
    });
    //Collect all the dates of last 7 days 
    function getLastWeek(){
      var today = new Date();
      var lastWeek = [];
      var i =0;
      for(i=0;i<7;i++){
        lastWeek[i] = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);

      }
      return lastWeek ;  


    }    
    var lastWeek = getLastWeek();
    // Initiallizing the last week array
    var lastWeekDisplayPadded=[];
    var lastWeekMonth=[];
    var lastWeekDay=[];
    var lastWeekYear=[];
    var lastWeekRate = [];
    
    // Collect the exhange rate of last 7 days and update it in an array of last week
    for (var i = 0; i < lastWeek.length; i++) {

      lastWeekMonth[i] = lastWeek[i].getMonth() + 1;
      lastWeekDay[i] = lastWeek[i].getDate();
      lastWeekYear[i] = lastWeek[i].getFullYear();
      lastWeekDisplayPadded[i] =  ("0000" + lastWeekYear[i] .toString()).slice(-4) + "-" + ("00" + lastWeekMonth[i].toString()).slice(-2)+ "-" + ("00" + lastWeekDay[i].toString()).slice(-2);

      $.ajax({
        type: 'GET',
        url: 'http://api.fixer.io/'+ lastWeekDisplayPadded[i] +'?base='+currencyFrom,                
        cache: true,
        dataType: 'json',
        async:false,
        success: function(response){            
          exchangeRate = response.rates[currencyTo];
          lastWeekRate[i] = exchangeRate;
        }
      });
    }
    
    //Plotting a graph for the exhange rate of last 7 days 
    var SortedlastWeekRate = lastWeekRate.slice();
    SortedlastWeekRate.sort();
    var interval = SortedlastWeekRate[6]-SortedlastWeekRate[6];
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
       text: "Weekly Trend in Exchange Rate"   
     },
     theme: "theme2",
     animationEnabled: true,
     axisX: {
       valueFormatString: "DD"      
     },
     axisY:{        
      includeZero: false,
      interval:interval,
      maximum: SortedlastWeekRate[6],
      minimum: SortedlastWeekRate[0],
      gridThickness: 0
      
    },
    data: [
    {        
      type: "line",
      showInLegend: true,
      legendText: $('#currencyFrom').val()+' vs '+$('#currencyTo').val(),
      dataPoints: [        
      { x: new Date(lastWeekYear[0], lastWeekMonth[0], lastWeekDay[0]), y: lastWeekRate[0], markerType: "triangle",  markerColor: "#6B8E23", markerSize: 2},
      { x: new Date(lastWeekYear[1], lastWeekMonth[1], lastWeekDay[1]), y: lastWeekRate[1], markerType: "triangle",  markerColor: "#6B8E23", markerSize: 2},
      { x: new Date(lastWeekYear[2], lastWeekMonth[2], lastWeekDay[2]), y: lastWeekRate[2], markerType: "triangle",  markerColor: "#6B8E23", markerSize: 2},
      { x: new Date(lastWeekYear[3], lastWeekMonth[3], lastWeekDay[3]), y: lastWeekRate[3], markerType: "triangle",  markerColor: "#6B8E23", markerSize: 2},
      { x: new Date(lastWeekYear[4], lastWeekMonth[4], lastWeekDay[4]), y: lastWeekRate[4], markerType: "triangle",  markerColor: "#6B8E23", markerSize: 2},
      { x: new Date(lastWeekYear[5], lastWeekMonth[5], lastWeekDay[5]), y: lastWeekRate[5], markerType: "triangle",  markerColor: "#6B8E23", markerSize: 2},
      { x: new Date(lastWeekYear[6], lastWeekMonth[6], lastWeekDay[6]), y: lastWeekRate[6], markerType: "triangle",  markerColor: "#6B8E23", markerSize: 2}
      ]
    }
    ]
  });
    chart.render();
  }          
}
// calculating the receivable on change of transfer amount
$(document).on('keyup', '#amt', function(){
  var newAmount = $('#amt').val();    
  receivableAmount = exchangeRate * newAmount; 
  $('#receivable').val(receivableAmount.toFixed(2));
});


// Submitting the data for transfer request
var formData = function(){  
  if(validation()){
    var FormData = $('#transfer').serialize();     
    $.ajax({
      type: 'POST',
      url: '../home/saveTransferRequest',        
      data: FormData,
      cache: false,
      dataType: 'json',
      success: function(response){
        alert("your request has been reveived");
        $("#transfer").trigger('reset');  
      }
    });  
  }     
}

//validation of the form input
var validation = function(){

  if($('#name').val()==""){
    alert("Please enter your name");    
    return false;
  }
  if($('#amt').val()==""){
    alert("Please enter transfer amount");
    return false;
  }
  if(isNaN($('#amt').val())){
    alert("Please enter transfer amount");
    return false;
  }
  if($('#currencyFrom').val()==$('#currencyTo').val()){
    alert("Please select a different currency for transfer");
    return false;
  }
  return true;
}

// Creating a table of recent requests for currency exchange
$(document).on('click', '#showRequest', function(){
  $('#transfer_table').show();
  $.ajax({
    type: 'GET',
    url: '../home/viewTransferRequest',
    success: function(response){
      response = JSON.parse(response);                             
      $('#tbody').empty();          
      var content = "";
      dataArray = response.singleTransferRequest;
      if( typeof dataArray!='undefined'){ 
        if(typeof dataArray.length == 'undefined'){
          content += "<tr>";
          content += '<td>' +  dataArray.fname + '</td>';          
          content += '<td>' +  dataArray.currency_from + '</td>';
          content += '<td>' +  dataArray.currency_to + '</td>';
          content += '<td>' +  dataArray.rate + '</td>';
          content += '<td>' +  dataArray.amt + '</td>';
          content += '<td>' +  dataArray.receivable + '</td>';
          content += '<td>' +  dataArray.timestamp + '</td>';
          content += "</tr>";            
        }else{            
          for(i=0; i<dataArray.length; i++){
            content += "<tr>";
            content += '<td>' +  dataArray[i].fname + '</td>';          
            content += '<td>' +  dataArray[i].currency_from + '</td>';
            content += '<td>' +  dataArray[i].currency_to + '</td>';
            content += '<td>' +  dataArray[i].rate + '</td>';
            content += '<td>' +  dataArray[i].amt + '</td>';
            content += '<td>' +  dataArray[i].receivable + '</td>';
            content += '<td>' +  dataArray[i].timestamp + '</td>';
            content += "</tr>";            
          }  
        }         

      }
      else{          
        content ="No recent request";
      }

      $('#tbody').append(content);

    }
  })
});




