










var exchangeRate = 1;
var receivableAmount = 1;
var ratecalculator = function(){  
  $('#receivable').val("");
  var currencyFrom = $('#currencyFrom').val();
  var currencyTo = $('#currencyTo').val();

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
          $('#receivable').val(receivableAmount);
        }
      }
    });

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

    var lastWeekDisplayPadded=[];
    var lastWeekMonth=[];
    var lastWeekDay=[];
    var lastWeekYear=[];
    var lastWeekRate = [];
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
        legendText: "ABC Share",
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

$(document).on('keyup', '#amt', function(){
  var newAmount = $('#amt').val();  
  receivableAmount = exchangeRate * newAmount;
  console.log(receivableAmount);
  $('#receivable').val(receivableAmount);
});

 

var formData = function(){     
  var FormData = $('#signup').serialize();     
  $.ajax({
    type: 'POST',
    url: '../home/transferRequest',        
    data: FormData,
    cache: false,
    dataType: 'json',
    success: function(response){
      console.log(response);
    }
  });
}
