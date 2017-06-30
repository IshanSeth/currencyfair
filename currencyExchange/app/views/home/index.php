 <!DOCTYPE html>
 <html>
 <head>
  <link rel="stylesheet" href="../css/form.css" type="text/css">
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/canvasjs/1.7.0/canvasjs.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.0-beta.1/jquery-ui.min.js" integrity="sha256-WyjlLy3rvVSitHOXMctYkMCOU6GAletPg+qniNKLCQM=" crossorigin="anonymous"></script>  
  <script src="../js/form.js"></script>
 </head>
 <body >
   <form id="transfer"  method ="post" autocomplete="off">
    <div class="container">
      <label><b>Name</b></label>
      <input type="text" placeholder="Enter Name" name="name" id="name" required>
      <label><b>Cyrreny From</b></label>
      <select name = "currency_from" id="currencyFrom" onchange="ratecalculator()">      
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CZK">CZK</option>
          <option value="DKK">DKK</option>
          <option value="EUR" selected="selected">EUR</option>
          <option value="GBP">GBP</option>
          <option value="HUF">HUF</option>
          <option value="NOK">NOK</option>
          <option value="NZD">NZD</option>
          <option value="PLN">PLN</option>
          <option value="SEK">SEK</option>
          <option value="USD">USD</option>
          <option value="ZAR">ZAR</option>
      </select>
      <br><br>
      <label><b>Cyrreny To</b></label>
      <select name = "currency_to" id="currencyTo" onchange="ratecalculator()">
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CZK">CZK</option>
          <option value="DKK">DKK</option>
          <option value="EUR" selected="selected">EUR</option>
          <option value="GBP">GBP</option>
          <option value="HUF">HUF</option>
          <option value="NOK">NOK</option>
          <option value="NZD">NZD</option>
          <option value="PLN">PLN</option>
          <option value="SEK">SEK</option>
          <option value="USD">USD</option>
          <option value="ZAR">ZAR</option>
      </select>
      <br><br>
      <label><b>Rate</b></label>      
      <input type="text" readonly name="rate" id="rate" >  
      <label><b>Amount</b></label>
      <input type="text" placeholder="Enter Ammunt" name="amt"  maxlength="7" id="amt"  pattern="\d*" required>
      <label><b>Receivable</b></label>      
      <input type="text" readonly name="receivable" id="receivable" >  
      <div class="clearfix">        
        <button type="button" class="signupbtn" onclick="formData()">Transfer</button>        
        <button type="button" id="showRequest" class="cancelbtn">Recent Requests</button>
      </div>      
    </div>
  </form>
  <br>
  <br>   
   <table id="transfer_table" style="width:100%">
    <tr>
      <th width="20%">Name</th>
      <th width="15%">Currency From</th>
      <th width="15%">Currency To</th>
      <th width="10%">Rate</th>
      <th width="10%">Amount</th>
      <th width="10%">Receivable</th>
      <th width="20%">Date</th>
    </tr>
    <tbody id="tbody">      
    </tbody>    
  </table>   
</body>

<body>
  <div id="chartContainer" style="position: absolute; top: 15%; right: 2%; height: 300px; width: 50%">
  </div>
  <div id="recentRequests">
  </div>
</body> 
 </html>
 








 