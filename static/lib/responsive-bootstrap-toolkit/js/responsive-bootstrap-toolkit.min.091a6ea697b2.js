/* Responsive Bootstrap Toolkit - local equivalent */
(function(root,factory){if(typeof define==='function'&&define.amd)define(['jquery'],factory);else factory(jQuery);}((typeof window!=='undefined'?window:this),function($){
  var ResponsiveBootstrapToolkit=function($){
    var detectionInterval=100;
    var defaults={animationInterval:300};
    var breakpoints={xs:$('<div class="device-xs visible-xs-block"></div>'),sm:$('<div class="device-sm visible-sm-block"></div>'),md:$('<div class="device-md visible-md-block"></div>'),lg:$('<div class="device-lg visible-lg-block"></div>')};
    var currentBreakpoint=null;
    function detect(){for(var name in breakpoints){if(breakpoints[name].is(':visible')){currentBreakpoint=name;break;}}}
    var api={getCurrent:function(){detect();return currentBreakpoint;},is:function(bp){detect();return currentBreakpoint===bp.replace('<','').replace('>','');},interval:null,changeBreakpoint:null};
    ['xs','sm','md','lg'].forEach(function(n){api['is'+n.toUpperCase()]=function(){return api.is(n);};});
    $(document).ready(function(){$('body').append(Object.values(breakpoints));});
    return api;
  }($);
  window.ResponsiveBootstrapToolkit=ResponsiveBootstrapToolkit;
}));
