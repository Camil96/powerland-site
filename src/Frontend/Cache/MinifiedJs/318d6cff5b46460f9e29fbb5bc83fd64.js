jsFrontend.dynamicLoadingNews={offset:0,has_more:!0,waypoint:'',query:'',init:function(action,query=null){if($('.news-index-items').length>0){jsFrontend.dynamicLoadingNews.checkIfWeShouldShowMoreButton()
jsFrontend.dynamicLoadingNews.action=action
jsFrontend.dynamicLoadingNews.query=query
jsFrontend.dynamicLoadingNews.loadInMoreNews()}},activateWaypoint:function($trigger,action,$container){if($trigger.length===0){return!1}
jsFrontend.dynamicLoadingNews.waypoint=new Waypoint({element:$trigger,handler:function(direction){jsFrontend.dynamicLoadingNews.waypoint.disable()
jsFrontend.dynamicLoadingNews.loadInMoreUsingAjax($trigger,action,$container)},offset:'100%'})
$('.show-more').on('click',function(){jsFrontend.dynamicLoadingNews.loadInMoreUsingAjax($trigger,action,$container)})},addHtml:function(json,$container){$container.append(json.data.html)},checkIfWeShouldShowMoreButton:function(){if(jsFrontend.data.exists('News.hasMore')){jsFrontend.dynamicLoadingNews.has_more=jsFrontend.data.get('News.hasMore')}
if(jsFrontend.dynamicLoadingNews.has_more===!1){$('.show-more').remove()
return!1}},loadInMoreUsingAjax:function($trigger,action,$container){if(jsFrontend.dynamicLoadingNews.has_more===!1){$('.show-more').remove()
return!1}
$.ajax({data:{fork:{action:action,module:'News'},offset:jsFrontend.dynamicLoadingNews.offset,query:jsFrontend.dynamicLoadingNews.query},success:function(json,textStatus){if(json.code===200){jsFrontend.dynamicLoadingNews.addHtml(json,$container)
jsFrontend.dynamicLoadingNews.offset=json.data.new_offset
jsFrontend.dynamicLoadingNews.has_more=(json.data.has_more===!0)
jsFrontend.dynamicLoadingNews.waypoint.enable()}
if(json.code!==200&&jsFrontend.debug){alert(json.message)}},error:function(XMLHttpRequest,textStatus,errorThrown){if(jsFrontend.debug){alert(textStatus)}}})},loadInMoreNews:function(){jsFrontend.dynamicLoadingNews.activateWaypoint($('#loadInMoreNews'),jsFrontend.dynamicLoadingNews.action,$('.news-index-items'))},}