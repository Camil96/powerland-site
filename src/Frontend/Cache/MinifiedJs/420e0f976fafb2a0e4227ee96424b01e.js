jsFrontend.dynamicLoadingProjects={offset:0,has_more:!0,waypoint:'',query:'',init:function(action,query=null){if($('.projects-index-items').length>0){jsFrontend.dynamicLoadingProjects.checkIfWeShouldShowMoreButton()
jsFrontend.dynamicLoadingProjects.action=action
jsFrontend.dynamicLoadingProjects.query=query
jsFrontend.dynamicLoadingProjects.loadInMoreProjects()}},activateWaypoint:function($trigger,action,$container){if($trigger.length===0){return!1}
jsFrontend.dynamicLoadingProjects.waypoint=new Waypoint({element:$trigger,handler:function(direction){jsFrontend.dynamicLoadingProjects.waypoint.disable()
jsFrontend.dynamicLoadingProjects.loadInMoreUsingAjax($trigger,action,$container)},offset:'100%'})
$('.show-more').on('click',function(){jsFrontend.dynamicLoadingProjects.loadInMoreUsingAjax($trigger,action,$container)})},addHtml:function(json,$container){$container.append(json.data.html)},checkIfWeShouldShowMoreButton:function(){if(jsFrontend.data.exists('Projects.hasMore')){jsFrontend.dynamicLoadingProjects.has_more=jsFrontend.data.get('Projects.hasMore')}
if(jsFrontend.dynamicLoadingProjects.has_more===!1){$('.show-more').remove()
return!1}},loadInMoreUsingAjax:function($trigger,action,$container){if(jsFrontend.dynamicLoadingProjects.has_more===!1){$('.show-more').remove()
return!1}
$.ajax({data:{fork:{action:action,module:'Projects'},offset:jsFrontend.dynamicLoadingProjects.offset,query:jsFrontend.dynamicLoadingProjects.query},success:function(json,textStatus){if(json.code===200){jsFrontend.dynamicLoadingProjects.addHtml(json,$container)
jsFrontend.dynamicLoadingProjects.offset=json.data.new_offset
jsFrontend.dynamicLoadingProjects.has_more=(json.data.has_more===!0)
jsFrontend.dynamicLoadingProjects.waypoint.enable()}
if(json.code!==200&&jsFrontend.debug){alert(json.message)}},error:function(XMLHttpRequest,textStatus,errorThrown){if(jsFrontend.debug){alert(textStatus)}}})},loadInMoreProjects:function(){jsFrontend.dynamicLoadingProjects.activateWaypoint($('#loadInMoreProjects'),jsFrontend.dynamicLoadingProjects.action,$('.projects-index-items'))},}