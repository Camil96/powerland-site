jsFrontend.dynamicLoadingChargingStations={offset:0,has_more:!0,waypoint:'',query:'',init:function(className,action,query=null){if($('.'+className).length>0){jsFrontend.dynamicLoadingChargingStations.checkIfWeShouldShowMoreButton()
jsFrontend.dynamicLoadingChargingStations.className=className
jsFrontend.dynamicLoadingChargingStations.action=action
jsFrontend.dynamicLoadingChargingStations.query=query
jsFrontend.dynamicLoadingChargingStations.loadInMore()}},activateWaypoint:function($trigger,action,$container){if($trigger.length===0){return!1}
jsFrontend.dynamicLoadingChargingStations.waypoint=new Waypoint({element:$trigger,handler:function(direction){jsFrontend.dynamicLoadingChargingStations.waypoint.disable()
jsFrontend.dynamicLoadingChargingStations.loadInMoreUsingAjax($trigger,action,$container)},offset:'100%'})
$('.show-more').on('click',function(){jsFrontend.dynamicLoadingChargingStations.loadInMoreUsingAjax($trigger,action,$container)})},addHtml:function(json,$container){$container.append(json.data.html)},checkIfWeShouldShowMoreButton:function(){if(jsFrontend.data.exists('ChargingStations.hasMore')){jsFrontend.dynamicLoadingChargingStations.has_more=jsFrontend.data.get('ChargingStations.hasMore')}
if(jsFrontend.dynamicLoadingChargingStations.has_more===!1){$('.show-more').remove()
return!1}},loadInMoreUsingAjax:function($trigger,action,$container){if(jsFrontend.dynamicLoadingChargingStations.has_more===!1){$('.show-more').remove()
return!1}
$.ajax({data:{fork:{action:action,module:'ChargingStations'},offset:jsFrontend.dynamicLoadingChargingStations.offset,query:jsFrontend.dynamicLoadingChargingStations.query},success:function(json,textStatus){if(json.code===200){jsFrontend.dynamicLoadingChargingStations.addHtml(json,$container)
jsFrontend.dynamicLoadingChargingStations.offset=json.data.new_offset
jsFrontend.dynamicLoadingChargingStations.has_more=(json.data.has_more===!0)
jsFrontend.dynamicLoadingChargingStations.waypoint.enable()}
if(json.code!==200&&jsFrontend.debug){alert(json.message)}},error:function(XMLHttpRequest,textStatus,errorThrown){console.log(XMLHttpRequest)
if(jsFrontend.debug){alert(textStatus)}}})},loadInMore:function(){jsFrontend.dynamicLoadingChargingStations.activateWaypoint($('#'+jsFrontend.dynamicLoadingChargingStations.action),jsFrontend.dynamicLoadingChargingStations.action,$('.'+jsFrontend.dynamicLoadingChargingStations.className))},}