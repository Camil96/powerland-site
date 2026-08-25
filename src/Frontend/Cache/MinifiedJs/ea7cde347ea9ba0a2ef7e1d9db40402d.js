jsFrontend.chargingStations={init:function(){if($('.filter-buttons').length>0){jsFrontend.chargingStations.filter.init()}
var url=jsFrontend.chargingStations.filter.getUrl()
jsFrontend.dynamicLoadingChargingStations.init('charging-stations-index-items','GetMoreChargingStations',{manufacturer:utils.url.extractParamFromUri(url,'manufacturer'),categories:utils.url.extractParamFromUri(url,'category'),type:utils.url.extractParamFromUri(url,'type')})}}
jsFrontend.chargingStations.filter={init:function(){jsFrontend.chargingStations.filter.toggleFilter()},addQueryStringSeparator:function(url){if(url.substr(url.length-1)==='?'){return url}else{url+=(jsFrontend.chargingStations.filter.hasQueryStringSeparator(url))?'&':'?'}
return url},getUrl:function(){return jsFrontend.data.get('ChargingStations.filterUrl')},hasQueryStringSeparator:function(url){return(url.indexOf('?')>=0)},filterItemClicked:function(e){e.preventDefault()
var $item=$(e.currentTarget)
var filterName=$item.data('filter')
var filterValue=$item.data('url')
var url=jsFrontend.chargingStations.filter.getUrl()
url=jsFrontend.chargingStations.filter.urlMustNotContain(url,'reset')
var origFilterString=utils.url.extractParamFromUri(url,filterName)
var filterValuesString=origFilterString
if(filterValuesString!==undefined){filterValuesString=filterValuesString.replace('[','')
filterValuesString=filterValuesString.replace(']','')}else{filterValuesString=''}
var filterValues=filterValuesString.split(',')
filterValues=filterValues.filter(function(v){return v!==''})
if($.inArray(filterValue.toString(),filterValues)>-1){filterValues.splice(filterValues.indexOf(filterValue),1)}else{filterValues.push(filterValue)}
var newFilterString=filterName+'=['+filterValues.join(',')+']'
if(origFilterString!==undefined){if(filterValues.length>0){url=url.replace(filterName+'='+origFilterString,newFilterString)}else{url=url.replace('&'+filterName+'='+origFilterString,'')
url=url.replace(filterName+'='+origFilterString,'')}}else{if(url.substr(url.length-1)!=='?'){url=jsFrontend.chargingStations.filter.addQueryStringSeparator(url)}
url+=newFilterString}
url=jsFrontend.chargingStations.filter.urlMustContain(url,'filter','true')
jsFrontend.chargingStations.filter.redirect(url)},redirect:function(url){$(location).attr('href',url)},toggleFilter:function(){$('#toggle-filter').on('click',function(e){e.preventDefault()
$('#filter-wrapper').slideToggle()
if($('#toggle-filter span').text()=='Filter openen')
$('#toggle-filter span').text('Filter sluiten')
else $('#toggle-filter span').text('Filter openen')})
$('.filter-buttons .btn').on('click',jsFrontend.chargingStations.filter.filterItemClicked)},urlMustNotContain:function(sourceURL,key){var rtn=sourceURL.split('?')[0]
var param
var params_arr=[]
var queryString=(sourceURL.indexOf('?')!==-1)?sourceURL.split('?')[1]:''
if(queryString!==''){params_arr=queryString.split('&')
for(var i=params_arr.length-1;i>=0;i-=1){param=params_arr[i].split('=')[0]
if(param===key){params_arr.splice(i,1)}}
rtn=rtn+'?'+params_arr.join('&')}
return rtn},urlMustContain:function(url,key,value){var keyvalue=key+'='+value
var found=(utils.url.extractParamFromUri(url,key)===value)
url=jsFrontend.chargingStations.filter.addQueryStringSeparator(url)
if(!found){url+=keyvalue}
return url}}
$(jsFrontend.chargingStations.init)