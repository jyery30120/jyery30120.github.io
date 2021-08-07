

$(document).ready(function(){
var $tcontent = $('#tcontent');
$.get('https://webs.water.gov.taipei/apps/outage.asmx/outageOpenData',function(e){
    console.log(e);
    e.forEach(function(o){
        $tcontent.append('<tr>' + '<td>' + o['Date'] +'</td>' + '<td>'+ o['Time']+ '</td>' + '<td>' + '<a href=' +  o['MapUrl'] + ' target="_blank"' +'>' + o['SW_Area'] + '</a>' + '</td>'+  '</tr>');
      });
    });
});


