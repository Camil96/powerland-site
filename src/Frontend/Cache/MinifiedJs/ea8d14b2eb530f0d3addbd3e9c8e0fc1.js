jsFrontend.projects={init:function(){jsFrontend.initPhotoSwipeFromDOM('.carousel-photoswipe')
jsFrontend.projects.customPhotoSwipeFunctionality()},customPhotoSwipeFunctionality:function(){function initExternalPhotoSwipeThumbs(thumbSelector,gallerySelector){document.querySelectorAll(thumbSelector).forEach(function(thumb){thumb.addEventListener('click',function(e){e.preventDefault()
const targetIndex=parseInt(thumb.dataset.pswpIndex)
const gallery=document.querySelector(gallerySelector)
if(!gallery||isNaN(targetIndex))return
const pswpElement=document.querySelector('.pswp')
const items=parseGalleryItems(gallery)
new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,{index:targetIndex,galleryUID:gallery.getAttribute('data-pswp-uid')||1,getThumbBoundsFn:function(index){const thumbnail=items[index].el.querySelector('img')
const rect=thumbnail.getBoundingClientRect()
return{x:rect.left,y:rect.top+window.pageYOffset,w:rect.width}}}).init()})})
function parseGalleryItems(galleryEl){var items=[]
galleryEl.querySelectorAll('figure').forEach(function(figureEl){var linkEl=figureEl.children[0]
var size=linkEl.getAttribute('data-size').split('x')
items.push({src:linkEl.getAttribute('href'),w:parseInt(size[0],10),h:parseInt(size[1],10),title:linkEl.getAttribute('title'),msrc:linkEl.querySelector('img')?.getAttribute('src'),el:figureEl})})
return items}}
initExternalPhotoSwipeThumbs('.project-detail-images img','.carousel-photoswipe')},}
$(jsFrontend.projects.init)