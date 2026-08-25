jsFrontend.projects={init:function(){if($('.filter-box').length>0){jsFrontend.projects.filter.init()}
var url=jsFrontend.projects.filter.getUrl()
jsFrontend.dynamicLoadingProjects.init('GetMoreProjects',{'category-type':utils.url.extractParamFromUri(url,'category-type'),categories:utils.url.extractParamFromUri(url,'category'),})}}
jsFrontend.projects.filter={init:function(){jsFrontend.projects.filter.toggleFilter()
jsFrontend.projects.filter.enableResetButton()},addQueryStringSeparator:function(url){if(url.substr(url.length-1)==='?'){return url}else{url+=(jsFrontend.projects.filter.hasQueryStringSeparator(url))?'&':'?'}
return url},enableResetButton:function(){$('.btn-reset').on('click',function(){var url=jsFrontend.projects.filter.getUrl()
url=url.split('?')[0]
url+='?reset=true'
jsFrontend.projects.filter.redirect(url)})},getUrl:function(){return jsFrontend.data.get('Projects.filterUrl')},hasQueryStringSeparator:function(url){return(url.indexOf('?')>=0)},filterItemClicked:function(e){var $item=$(e.currentTarget)
var category=$item.data('filter')
var item=$item.data('url')
var isMultiSelect=$item.data('multi-select')===!0||$item.data('multi-select')==='true'
var url=jsFrontend.projects.filter.getUrl()
url=jsFrontend.projects.filter.urlMustNotContain(url,'reset')
var origCategoryParametersString=utils.url.extractParamFromUri(url,category)
var categoryParametersString=origCategoryParametersString
if(categoryParametersString!==undefined){categoryParametersString=categoryParametersString.replace('[','')
categoryParametersString=categoryParametersString.replace(']','')}else{categoryParametersString=''}
var categoryParameters=categoryParametersString.length>0?categoryParametersString.split(','):[]
if(isMultiSelect){if($.inArray(item.toString(),categoryParameters)>-1){categoryParameters.splice(categoryParameters.indexOf(item),1)}else{categoryParameters.push(item)}}else{if(categoryParameters.length===1&&categoryParameters[0]===item.toString()){categoryParameters=[]
if(origCategoryParametersString!==undefined){url=url.replace('&'+category+'='+origCategoryParametersString,'')
url=url.replace(category+'='+origCategoryParametersString,'')}}else{categoryParameters=[item]
var filterParams=['category','categoryType','tags','types','brands','status']
filterParams.forEach(function(filterParam){if(filterParam!==category){var paramString=utils.url.extractParamFromUri(url,filterParam)
if(paramString!==undefined){url=url.replace('&'+filterParam+'='+paramString,'')
url=url.replace(filterParam+'='+paramString,'')}}})}}
if(isMultiSelect||(!isMultiSelect&&categoryParameters.length>0)){var newCategoryAndParametersString=category+'=['+utils.string.trim(categoryParameters.join(','),',')+']'
if(origCategoryParametersString!==undefined){if(categoryParameters.length>0){url=url.replace(category+'='+origCategoryParametersString,newCategoryAndParametersString)}}else{if(url.substr(url.length-1)!=='?'){url=jsFrontend.projects.filter.addQueryStringSeparator(url)}
url+=newCategoryAndParametersString}}
url=url.replace(/\&\&/g,'&')
url=url.replace(/\?&/g,'?')
url=url.replace(/&$/,'')
url=url.replace(/\?$/,'')
url=jsFrontend.projects.filter.urlMustContain(url,'filter','true')
url=jsFrontend.projects.filter.urlMustContain(url,'showFilter','true')
jsFrontend.projects.filter.redirect(url)},redirect:function(url){$(location).attr('href',url)},toggleFilter:function(){if(jsFrontend.data.get('Projects.hasFilter')===!0){$('.btn-reset').show()}else{$('.btn-reset').hide()}
$('#toggle-filter').on('click',function(e){e.preventDefault()
$('.filter-box').slideToggle()})
$('.btn-close-filter').on('click',function(e){e.preventDefault()
$('.filter-box').slideUp()})
$('.filter-buttons .btn').on('click',jsFrontend.projects.filter.filterItemClicked)},urlMustNotContain:function(sourceURL,key){var rtn=sourceURL.split('?')[0],param,params_arr=[],queryString=(sourceURL.indexOf('?')!==-1)?sourceURL.split('?')[1]:''
if(queryString!==''){params_arr=queryString.split('&')
for(var i=params_arr.length-1;i>=0;i-=1){param=params_arr[i].split('=')[0]
if(param===key){params_arr.splice(i,1)}}
rtn=rtn+'?'+params_arr.join('&')}
return rtn},urlMustContain:function(url,key,value){var keyvalue=key+'='+value
var found=(utils.url.extractParamFromUri(url,key)===value)
url=jsFrontend.projects.filter.addQueryStringSeparator(url)
if(!found){url+=keyvalue}
return url}}
$(jsFrontend.projects.init)
jQuery.fn.reverse=[].reverse