jsFrontend.chargingStations={init:function(){jsFrontend.chargingStations.customPhotoSwipeFunctionality()},customPhotoSwipeFunctionality:function(){function initExternalPhotoSwipeThumbs(thumbSelector,gallerySelector){const gallery=document.querySelector(gallerySelector)
if(!gallery)return
const items=parseGalleryItems(gallery)
const indexMap={}
items.forEach((item,idx)=>{const pswpIndex=item.el.querySelector('img')?.getAttribute('data-pswp-index')
if(pswpIndex){indexMap[parseInt(pswpIndex,10)]=idx}})
document.querySelectorAll(thumbSelector).forEach(function(thumb){thumb.addEventListener('click',function(e){e.preventDefault()
const targetIndex=parseInt(thumb.dataset.pswpIndex)
if(isNaN(targetIndex))return
const actualIndex=indexMap[targetIndex]
if(actualIndex===undefined)return
const pswpElement=document.querySelector('.pswp')
if(!pswpElement)return
const galleryInstance=new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,{index:actualIndex,galleryUID:gallery.getAttribute('data-pswp-uid')||1,getThumbBoundsFn:function(index){const thumbnail=items[index].el.querySelector('img')
if(!thumbnail)return{x:0,y:0,w:0}
const rect=thumbnail.getBoundingClientRect()
return{x:rect.left,y:rect.top+window.pageYOffset,w:rect.width}}})
galleryInstance.init()})})
function parseGalleryItems(galleryEl){var items=[]
galleryEl.querySelectorAll('figure').forEach(function(figureEl){var linkEl=figureEl.querySelector('a')
if(!linkEl||!linkEl.getAttribute('data-size'))return
var size=linkEl.getAttribute('data-size').split('x')
items.push({src:linkEl.getAttribute('href'),w:parseInt(size[0],10),h:parseInt(size[1],10),title:linkEl.getAttribute('title'),msrc:linkEl.querySelector('img')?.getAttribute('src'),el:figureEl})})
return items}}
initExternalPhotoSwipeThumbs('.charging-station-detail-images img','.charging-station-detail-images')}}
$(jsFrontend.chargingStations.init)