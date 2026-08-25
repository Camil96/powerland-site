var jsFrontend={debug:!1,current:{},init:function(){jsFrontend.current.language=jsFrontend.data.get('LANGUAGE')
jsFrontend.initAjax()
jsFrontend.addModalEvents()
jsFrontend.cookieBar.init()
jsFrontend.consentDialog.init()
jsFrontend.controls.init()
jsFrontend.forms.init()
jsFrontend.gravatar.init()
jsFrontend.statistics.init()
jsFrontend.twitter.init()},addModalEvents:function(){var $modals=$('[role=dialog].modal')
if($modals.length===0){return}
$modals.on('shown.bs.modal',function(){$(this).attr('aria-hidden','false')})
$modals.on('hide.bs.modal',function(){$(this).attr('aria-hidden','true')})},initAjax:function(){$.ajaxSetup({url:'/frontend/ajax',cache:!1,type:'POST',dataType:'json',timeout:10000,data:{fork:{module:null,action:null,language:jsFrontend.current.language}}})},initPhotoSwipeFromDOM:function(gallerySelector){var parseThumbnailElements=function(el){var thumbElements=el.childNodes,numNodes=thumbElements.length,items=[],figureEl,linkEl,size,item
for(var i=0;i<numNodes;i++){figureEl=thumbElements[i]
if(figureEl.nodeType!==1){continue}
linkEl=figureEl.children[0]
size=linkEl.getAttribute('data-size').split('x')
item={src:linkEl.getAttribute('href'),w:parseInt(size[0],10),h:parseInt(size[1],10),title:linkEl.getAttribute('title'),}
if(linkEl.children.length>0){item.msrc=linkEl.children[0].getAttribute('src')}
item.el=figureEl
items.push(item)}
return items}
var closest=function closest(el,fn){return el&&(fn(el)?el:closest(el.parentNode,fn))}
var onThumbnailsClick=function(e){e=e||window.event
e.preventDefault?e.preventDefault():e.returnValue=!1
var eTarget=e.target||e.srcElement
var clickedListItem=closest(eTarget,function(el){return(el.tagName&&el.tagName.toUpperCase()==='FIGURE')})
if(!clickedListItem){return}
var clickedGallery=clickedListItem.parentNode,childNodes=clickedListItem.parentNode.childNodes,numChildNodes=childNodes.length,nodeIndex=0,index
for(var i=0;i<numChildNodes;i++){if(childNodes[i].nodeType!==1){continue}
if(childNodes[i]===clickedListItem){index=nodeIndex
break}
nodeIndex++}
if(index>=0){openPhotoSwipe(index,clickedGallery)}
return!1}
var photoswipeParseHash=function(){var hash=window.location.hash.substring(1),params={}
if(hash.length<5){return params}
var vars=hash.split('&')
for(var i=0;i<vars.length;i++){if(!vars[i]){continue}
var pair=vars[i].split('=')
if(pair.length<2){continue}
params[pair[0]]=pair[1]}
if(params.gid){params.gid=parseInt(params.gid,10)}
return params}
var openPhotoSwipe=function(index,galleryElement,disableAnimation,fromURL){var pswpElement=document.querySelectorAll('.pswp')[0],gallery,options,items
items=parseThumbnailElements(galleryElement)
options={shareEl:!1,galleryUID:galleryElement.getAttribute('data-pswp-uid'),getThumbBoundsFn:function(index){var thumbnail=items[index].el.getElementsByTagName('img')[0],pageYScroll=window.pageYOffset||document.documentElement.scrollTop,rect=thumbnail.getBoundingClientRect()
return{x:rect.left,y:rect.top+pageYScroll,w:rect.width}}}
if(fromURL){if(options.galleryPIDs){for(var j=0;j<items.length;j++){if(items[j].pid==index){options.index=j
break}}}else{options.index=parseInt(index,10)-1}}else{options.index=parseInt(index,10)}
if(isNaN(options.index)){return}
if(disableAnimation){options.showAnimationDuration=0}
gallery=new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,options)
gallery.init()}
var galleryElements=document.querySelectorAll(gallerySelector)
for(var i=0,l=galleryElements.length;i<l;i++){galleryElements[i].setAttribute('data-pswp-uid',i+1)
galleryElements[i].onclick=onThumbnailsClick}
var hashData=photoswipeParseHash()
if(hashData.pid&&hashData.gid){openPhotoSwipe(hashData.pid,galleryElements[hashData.gid-1],!0,!0)}}}
jsFrontend.controls={init:function(){jsFrontend.controls.bindTargetBlank()
jsFrontend.controls.toggleCollapse()},bindTargetBlank:function(){$('a.targetBlank').attr('target','_blank').attr('rel','noopener noreferrer')},toggleCollapse:function(){var $navToggle=$('.navbar-toggle')
if($navToggle.length===0){return}
$navToggle.on('click',function(){var $button=$(this)
$button.find('[data-role=label]').text(jsFrontend.locale.lbl($button.hasClass('collapsed')?'CloseNavigation':'OpenNavigation'))}).find('[data-role=label]').text(jsFrontend.locale.lbl($navToggle.hasClass('collapsed')?'CloseNavigation':'OpenNavigation'))}}
jsFrontend.cookieBar={init:function(){if($('#cookie-bar').length===0)return
var $cookieBar=$('#cookie-bar')
if(utils.cookies.readCookie('cookie_bar_hide')==='b%3A1%3B'){$cookieBar.hide()}
$cookieBar.on('click','[data-role="cookie-bar-button"]',function(e){e.preventDefault()
if($(e.currentTarget).data('action')==='agree'){utils.cookies.setCookie('cookie_bar_agree','Y')
utils.cookies.setCookie('cookie_bar_hide','Y')}else{utils.cookies.setCookie('cookie_bar_agree','N')
utils.cookies.setCookie('cookie_bar_hide','Y')}
$cookieBar.hide()})}}
jsFrontend.consentDialog={init:function(){if($('*[data-role=privacy_consent_dialog]').length===0&&$('*[data-role=privacy_consent_info]').length===0)return
var $consentInfo=$('*[data-role=privacy_consent_info]')
var $acceptAllCookies=$('*[data-role=privacy_consent_info_save_button]')
var $setCustomPreferences=$('*[data-role=privacy_consent_info_preferences_button]')
var $consentDialog=$('*[data-role=privacy_consent_dialog]')
var $consentForm=$('form[data-role=privacy_consent_dialog_form]')
var $acceptNecessary=$('*[data-role=privacy_consent_dialog_necessary_button]')
var $levels=$consentForm.find('input[data-role=privacy-level]')
var privacyConsentDialogModal=new bootstrap.Modal($consentDialog)
$setCustomPreferences.on('click',function(e){$consentInfo.hide()})
document.getElementById('privacyConsentDialog').addEventListener('hide.bs.modal',function(e){$consentInfo.show()})
$acceptAllCookies.on('click',function(e){e.preventDefault()
for(var level of $levels){var name=$(level).data('value')
handlePrivacyConsentLevel(name,!0)}
privacyConsentChanged()})
$consentForm.on('submit',function(e){e.preventDefault()
for(var level of $levels){var name=$(level).data('value')
var isChecked=$(level).is(':checked')
handlePrivacyConsentLevel(name,isChecked)}
privacyConsentChanged()})
$acceptNecessary.on('click',function(e){e.preventDefault()
for(var level of $levels){var name=$(level).data('value')
var isChecked=name==='functional'
handlePrivacyConsentLevel(name,isChecked)}
privacyConsentChanged()})
function handlePrivacyConsentLevel(name,isChecked){jsData.privacyConsent.visitorChoices[name]=isChecked
var niceName=getNiceName(name)
if(typeof dataLayer!=='undefined'){if(isChecked){var gtmData={}
gtmData['privacyConsentLevel'+niceName+'Agreed']=isChecked
dataLayer.push(gtmData)
dataLayer.push({'event':'privacyConsentLevel'+niceName+'Agreed'})}}
utils.cookies.setCookie('privacy_consent_level_'+name+'_agreed',isChecked?1:0,6*30)
utils.cookies.setCookie('privacy_consent_hash',jsData.privacyConsent.levelsHash,6*30)
var eventName='privacyConsentLevel'+niceName
if(isChecked){eventName+='Agreed'}else{eventName+='Disagreed'}
$(document).trigger(eventName)}
function getNiceName(name){return name.charAt(0).toUpperCase()+name.slice(1)}
function privacyConsentChanged(){$(document).trigger('privacyConsentChanged')
privacyConsentDialogModal.hide()
$consentInfo.hide()}}}
jsFrontend.data={initialized:!1,data:{},init:function(){if(typeof jsData==='undefined')throw new Error('jsData is not available')
jsFrontend.data.data=jsData
jsFrontend.data.initialized=!0},exists:function(key){return(typeof jsFrontend.data.data[key]!=='undefined')},get:function(key){if(!jsFrontend.data.initialized)jsFrontend.data.init()
var keys=key.split('.')
var data=jsFrontend.data.data
for(var i=0;i<keys.length;i++){data=data[keys[i]]}
return data}}
jsFrontend.facebook={afterInit:function(){if(typeof _gaq==='object'){FB.Event.subscribe('edge.create',function(targetUrl){_gaq.push(['_trackSocial','facebook','like',targetUrl])})
FB.Event.subscribe('edge.remove',function(targetUrl){_gaq.push(['_trackSocial','facebook','unlike',targetUrl])})
FB.Event.subscribe('message.send',function(targetUrl){_gaq.push(['_trackSocial','facebook','send',targetUrl])})}else if(typeof ga==='object'){FB.Event.subscribe('edge.create',function(targetUrl){ga('send','social','facebook','like',targetUrl)})
FB.Event.subscribe('edge.remove',function(targetUrl){ga('send','social','facebook','unlike',targetUrl)})
FB.Event.subscribe('message.send',function(targetUrl){ga('send','social','facebook','send',targetUrl)})}}}
jsFrontend.forms={init:function(){jsFrontend.forms.placeholders()
jsFrontend.forms.datefields()
jsFrontend.forms.validation()
jsFrontend.forms.filled()
jsFrontend.forms.datePicker()
jsFrontend.forms.requiredTooltip()},requiredTooltip:function(){$(document).on('focus','.form-control',function(event){var id=$(event.currentTarget).attr('id')
$('label[for="'+id+'"]').find('abbr').tooltip('show')
setTimeout(function(){$('label[for="'+id+'"]').find('abbr').tooltip('hide')},1000)})},filled:function(){$(document).on('blur','form input, form textarea, form select',function(){if($(this).val()===''){$(this).removeClass('filled')}else{$(this).addClass('filled')}})},datefields:function(){var $inputDateType=$('input.inputDatefield')
if($inputDateType.length){if($inputDateType.get(0).type!=='date'){$inputDateType.addClass('inputDatefieldNormal')}}
var $inputDatefields=$('.inputDatefieldNormal, .inputDatefieldFrom, .inputDatefieldTill, .inputDatefieldRange')
var $inputDatefieldNormal=$('.inputDatefieldNormal')
var $inputDatefieldFrom=$('.inputDatefieldFrom')
var $inputDatefieldTill=$('.inputDatefieldTill')
var $inputDatefieldRange=$('.inputDatefieldRange')
if($inputDatefields.length>0){var dayNames=[jsFrontend.locale.loc('DayLongSun'),jsFrontend.locale.loc('DayLongMon'),jsFrontend.locale.loc('DayLongTue'),jsFrontend.locale.loc('DayLongWed'),jsFrontend.locale.loc('DayLongThu'),jsFrontend.locale.loc('DayLongFri'),jsFrontend.locale.loc('DayLongSat')]
var dayNamesMin=[jsFrontend.locale.loc('DayShortSun'),jsFrontend.locale.loc('DayShortMon'),jsFrontend.locale.loc('DayShortTue'),jsFrontend.locale.loc('DayShortWed'),jsFrontend.locale.loc('DayShortThu'),jsFrontend.locale.loc('DayShortFri'),jsFrontend.locale.loc('DayShortSat')]
var dayNamesShort=[jsFrontend.locale.loc('DayShortSun'),jsFrontend.locale.loc('DayShortMon'),jsFrontend.locale.loc('DayShortTue'),jsFrontend.locale.loc('DayShortWed'),jsFrontend.locale.loc('DayShortThu'),jsFrontend.locale.loc('DayShortFri'),jsFrontend.locale.loc('DayShortSat')]
var monthNames=[jsFrontend.locale.loc('MonthLong1'),jsFrontend.locale.loc('MonthLong2'),jsFrontend.locale.loc('MonthLong3'),jsFrontend.locale.loc('MonthLong4'),jsFrontend.locale.loc('MonthLong5'),jsFrontend.locale.loc('MonthLong6'),jsFrontend.locale.loc('MonthLong7'),jsFrontend.locale.loc('MonthLong8'),jsFrontend.locale.loc('MonthLong9'),jsFrontend.locale.loc('MonthLong10'),jsFrontend.locale.loc('MonthLong11'),jsFrontend.locale.loc('MonthLong12')]
var monthNamesShort=[jsFrontend.locale.loc('MonthShort1'),jsFrontend.locale.loc('MonthShort2'),jsFrontend.locale.loc('MonthShort3'),jsFrontend.locale.loc('MonthShort4'),jsFrontend.locale.loc('MonthShort5'),jsFrontend.locale.loc('MonthShort6'),jsFrontend.locale.loc('MonthShort7'),jsFrontend.locale.loc('MonthShort8'),jsFrontend.locale.loc('MonthShort9'),jsFrontend.locale.loc('MonthShort10'),jsFrontend.locale.loc('MonthShort11'),jsFrontend.locale.loc('MonthShort12')]
if($.isFunction($.fn.datepicker)){$inputDatefieldNormal.each(function(){var clone=$(this).clone()
clone.insertAfter(this)
clone.hide()
$(this).attr('id',$(this).attr('id')+'-display')
$(this).attr('name',$(this).attr('name')+'-display')
$(this).on('change',function(event){if($(this).val()===''){clone.val('')}})})
$inputDatefields.datepicker({dayNames:dayNames,dayNamesMin:dayNamesMin,dayNamesShort:dayNamesShort,hideIfNoPrevNext:!0,monthNames:monthNames,monthNamesShort:monthNamesShort,nextText:jsFrontend.locale.lbl('Next'),prevText:jsFrontend.locale.lbl('Previous'),showAnim:'slideDown'})
$inputDatefieldNormal.each(function(){var data=$(this).data()
var phpDate=new Date(data.year,data.month,data.day,0,0,0)
var value=($(this).val()!=='')?$.datepicker.formatDate(data.mask,phpDate):''
$(this).datepicker('option',{dateFormat:data.mask,firstDay:data.firstday,altField:'#'+$(this).attr('id').replace('-display',''),altFormat:'yy-mm-dd'}).datepicker('setDate',value)})
$inputDatefieldFrom.each(function(){var data=$(this).data()
var value=$(this).val()
$(this).datepicker('option',{dateFormat:data.mask,firstDay:data.firstday,minDate:new Date(parseInt(data.startdate.split('-')[0],10),parseInt(data.startdate.split('-')[1],10)-1,parseInt(data.startdate.split('-')[2],10))}).datepicker('setDate',value)})
$inputDatefieldTill.each(function(){var data=$(this).data()
var value=$(this).val()
$(this).datepicker('option',{dateFormat:data.mask,firstDay:data.firstday,maxDate:new Date(parseInt(data.enddate.split('-')[0],10),parseInt(data.enddate.split('-')[1],10)-1,parseInt(data.enddate.split('-')[2],10))}).datepicker('setDate',value)})
$inputDatefieldRange.each(function(){var data=$(this).data()
var value=$(this).val()
$(this).datepicker('option',{dateFormat:data.mask,firstDay:data.firstday,minDate:new Date(parseInt(data.startdate.split('-')[0],10),parseInt(data.startdate.split('-')[1],10)-1,parseInt(data.startdate.split('-')[2],10),0,0,0,0),maxDate:new Date(parseInt(data.enddate.split('-')[0],10),parseInt(data.enddate.split('-')[1],10)-1,parseInt(data.enddate.split('-')[2],10),23,59,59)}).datepicker('setDate',value)})}}},validation:function(){$('input, textarea, select').each(function(){var $input=$(this)
var options={}
$.each($input.data(),function(key,value){if(key.indexOf('error')<0)return
key=key.replace('error','').toLowerCase()
options[key]=value})
$input.html5validation(options)})},placeholders:function(){jQuery.support.placeholder=('placeholder' in document.createElement('input'))
if(!jQuery.support.placeholder){$('input[placeholder], textarea[placeholder]').on('focus',function(){var input=$(this)
if(input.val()===input.attr('placeholder')){input.val('')
input.removeClass('placeholder')}})
$('input[placeholder], textarea[placeholder]').on('blur',function(){var input=$(this)
if(input.val()===''||input.val()===input.attr('placeholder')){input.val(input.attr('placeholder'))
input.addClass('placeholder')}})
$('input[placeholder], textarea[placeholder]').blur()
$('input[placeholder], textarea[placeholder]').parents('form').submit(function(){$(this).find('input[placeholder]').each(function(){var input=$(this)
if(input.val()===input.attr('placeholder'))input.val('')})})}},datePicker:function(){$('input[data-role="fork-datepicker"]').each(function(index,datePickerElement){$(datePickerElement).datepicker()})}}
jsFrontend.gravatar={init:function(){$('.replaceWithGravatar').each(function(){var element=$(this)
var gravatarId=element.data('gravatarId')
var size=element.attr('height')
if(gravatarId!==''){var url='https://www.gravatar.com/avatar/'+gravatarId+'?r=g&d='+encodeURI(window.location.origin+'/src/Frontend/Core/Layout/images/default_author_avatar.gif')
if(size!=='')url+='&s='+size
var gravatar=new Image()
gravatar.src=url
gravatar.onload=function(){element.attr('src',url).addClass('gravatarLoaded')}}})}}
jsFrontend.locale={initialized:!1,initializing:!1,data:{},init:function(){if(typeof jsFrontend.current.language==='undefined'){return}
jsFrontend.locale.initializing=!0
$.ajax({url:'/src/Frontend/Cache/Locale/'+jsFrontend.current.language+'.json',type:'GET',dataType:'json',async:!1,success:function(data){jsFrontend.locale.data=data
jsFrontend.locale.initialized=!0
jsFrontend.locale.initializing=!0},error:function(jqXHR,textStatus,errorThrown){throw new Error('Regenerate your locale-files.')}})},get:function(type,key){if(!jsFrontend.locale.initialized&&!jsFrontend.locale.initializing)jsFrontend.locale.init()
if(!jsFrontend.locale.initialized){setTimeout(function(){return jsFrontend.locale.get(type,key)},30)
return}
if(typeof jsFrontend.locale.data[type]==='undefined'||typeof jsFrontend.locale.data[type][key]==='undefined'){return'{$'+type+key+'}'}
return jsFrontend.locale.data[type][key]},act:function(key){return jsFrontend.locale.get('act',key)},err:function(key){return jsFrontend.locale.get('err',key)},lbl:function(key){return jsFrontend.locale.get('lbl',key)},loc:function(key){return jsFrontend.locale.get('loc',key)},msg:function(key){return jsFrontend.locale.get('msg',key)}}
jsFrontend.statistics={init:function(){jsFrontend.statistics.trackOutboundLinks()},trackOutboundLinks:function(){if(typeof _gaq==='object'||typeof ga==='function'){$.expr[':'].external=function(obj){return(typeof obj.href!=='undefined')&&(obj.hostname!==window.location.hostname)}
$(document).on('click','a:external:not(.noTracking)',function(e){var hasTarget=(typeof $(this).attr('target')!=='undefined')
if(!hasTarget)e.preventDefault()
var link=$(this).attr('href')
var type='Outbound Links'
var pageView='/Outbound Links/'+link
if(link.match(/^mailto:/)){type='Mailto'
pageView='/Mailto/'+link.substring(7)}
if(link.match(/^#/)){type='Anchors'
pageView='/Anchor/'+link.substring(1)}
if(typeof _gaq==='object'){_gaq.push(['_trackEvent',type,pageView])}else{ga('send','event',type,pageView)}
if(!hasTarget)setTimeout(function(){document.location.href=link},100)})}}}
jsFrontend.twitter={init:function(){if(typeof twttr==='object'&&(typeof _gaq==='object'||typeof ga==='object')){twttr.events.on('tweet',function(e){if(e){var targetUrl=null
if(e.target&&e.target.nodeName==='IFRAME')targetUrl=utils.url.extractParamFromUri(e.target.src,'url')
if(typeof _gaq==='object'){_gaq.push(['_trackSocial','twitter','tweet',targetUrl])}else{ga('send','social','twitter','tweet',targetUrl)}}})}}}
$(jsFrontend.init)