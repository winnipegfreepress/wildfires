var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var moment = require('moment');
//local server stuff
var app = express();
var port = 8000;
//empty array for results
var data = [];
//csv to place data
var outputFile = 'hectares.csv';

//url to scrape
var url = 'https://www.gov.mb.ca/sd/fire/Fire-Situation/daily-firesituation.html';
 // cron.schedule('*/1 * * * *', function(){
 //select table data
request(url, function(err, resp, body) {
   var $ = cheerio.load(body);

   //get today's hecatres total
   var hectaresToday = $('table tbody tr:nth-child(41) td:nth-child(8)');
   var hectaresTodayText = hectaresToday.text();
   hectaresToday = hectaresTodayText.replace(/\s+/g, '');

   //get the date
   var reportDate = $('table tbody tr:nth-child(2) td:nth-child(3) center font');
   var reportDateText = reportDate.text();
   reportDate = reportDateText.replace(/\r?\n|\r/g, '');
   reportDate = reportDate.replace(/,/g , '');

   var dateParse = new Date(reportDate);
   console.log(dateParse);

   var theYear = dateParse.getFullYear(),
       theDay = dateParse.getDate(),
       theMonth = dateParse.getMonth() + 1;

   reportDate = theDay + "/" + theMonth;
   reportYear = theYear;

   console.log(reportDate)
   console.log(dateParse)

   console.log(theMonth)

   console.log(reportDate)
   console.log(reportYear)
   console.log (hectaresToday)

 //concantenate level, time
   data = [reportYear, reportDate,hectaresToday,'\r\n'];
   fs.appendFile(outputFile, data, 'utf8', function(err) {
   if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
   } else {
      console.log('It is saved!');
   }
   });
});



////*[@id="main-content"]/table/tbody/tr[7]/td/table/tbody/tr[41]/td[8]/font/b
// //*[@id="main-content"]/table/tbody/tr[2]/td[3]/center/font

//*[@id="main-content"]/table/tbody/tr[2]/td[3]/center/font