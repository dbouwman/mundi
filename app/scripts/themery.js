/**
 * themery.js
 *
 * Parse query params, and load in customizations
 * or apply defaults
 * 
 */

//https://github.com/malko/l.js
!function(t,e){var i=function(e){(t.execScript||function(e){t.eval.call(t,e)})(e)},n=function(t,e){return t instanceof(e||Array)},r=document,s="getElementsByTagName",a="length",c="readyState",l="onreadystatechange",o=r[s]("script"),u=o[o[a]-1],f=u.innerHTML.replace(/^\s+|\s+$/g,"");if(!t.ljs){var h=u.src.match(/checkLoaded/)?1:0,d=r[s]("head")[0]||r.documentElement,p=function(t){var e={};return e.u=t.replace(/#(=)?([^#]*)?/g,function(t,i,n){return e[i?"f":"i"]=n,""}),e},v=function(t,e,i){var n,s=r.createElement(t);i&&(s[c]?s[l]=function(){("loaded"===s[c]||"complete"===s[c])&&(s[l]=null,i())}:s.onload=i);for(n in e)e[n]&&(s[n]=e[n]);d.appendChild(s)},y=function(t,e){if(this.aliases&&this.aliases[t]){var i=this.aliases[t].slice(0);return n(i)||(i=[i]),e&&i.push(e),this.load.apply(this,i)}if(n(t)){for(var r=t[a];r--;)this.load(t[r]);return e&&t.push(e),this.load.apply(this,t)}return t.match(/\.css\b/)?this.loadcss(t,e):this.loadjs(t,e)},m={},g={aliases:{},loadjs:function(t,i){var n=p(t);return t=n.u,m[t]===!0?(i&&i(),this):m[t]!==e?(i&&(m[t]=function(t,e){return function(){t&&t(),e&&e()}}(m[t],i)),this):(m[t]=function(e){return function(){m[t]=!0,e&&e()}}(i),i=function(){m[t]()},v("script",{type:"text/javascript",src:t,id:n.i,onerror:function(t){if(n.f){var e=t.currentTarget;e.parentNode.removeChild(e),v("script",{type:"text/javascript",src:n.f,id:n.i},i)}}},i),this)},loadcss:function(t,e){var i=p(t);return t=i.u,m[t]||v("link",{type:"text/css",rel:"stylesheet",href:t,id:i.i}),m[t]=!0,e&&e(),this},load:function(){var t=arguments,i=t[a];return 1===i&&n(t[0],Function)?(t[0](),this):(y.call(this,t[0],1>=i?e:function(){g.load.apply(g,[].slice.call(t,1))}),this)},addAliases:function(t){for(var e in t)this.aliases[e]=n(t[e])?t[e].slice(0):t[e];return this}};if(h){var j,x,A,b;for(j=0,x=o[a];x>j;j++)(b=o[j].getAttribute("src"))&&(m[b.replace(/#.*$/,"")]=!0);for(A=r[s]("link"),j=0,x=A[a];x>j;j++)("stylesheet"===A[j].rel||"text/css"===A[j].type)&&(m[A[j].getAttribute("href").replace(/#.*$/,"")]=!0)}t.ljs=g}f&&i(f)}(window);


jQuery.extend({

  getQueryParameters : function(str) {
    return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
  }

});


//Location of the theme storage
var themeBaseUrl = 'http://arcgis.github.io/composer-companion-apps/data';

//when jquery loads...
$(function(){
  var self = this;
  console.log('Themery starting up...');
  
  //parse params
  var qs = window.location.search || window.location.hash;
  qs = qs.substring(qs.indexOf('?') + 1, qs.length);
  self.params = $.getQueryParameters(qs);

  //load theme json
  if(self.params.orgId){

    
  }else{
    self.params.orgId = 'defaults';
  }

  getTheme(self.params)
    .done(function(data, status){
      
      if(self.params.backUrl){
        data.backUrl = self.params.backUrl;
      }

      applyTheme(data)
    });



});


function getTheme(params){
  var url = themeBaseUrl + '/' + params.orgId + '/theme.json';
  console.log('Fetching theme from ' + url);
  return $.getJSON(url);
};

function applyTheme(settings){
  console.log('Applying theme');

  if(settings.theme.bootstrapCssUrl){
    ljs.load(settings.theme.bootstrapCssUrl, function(){
      
      //unhide the page
      $('body').removeClass('hidden');
      //get the navbar height
      setTimeout(function(){
        $('#toolbar').css({top: $('.navbar').height()});
        $('#map-region').css({"padding-top": $('.navbar').height() + 35});
      },2000);
      

    });
  }

  if(settings.name.title){
    $('.navbar-brand').text(settings.name.title);
  }

  if(settings.backUrl){
    $('.navbar-brand').attr('href', settings.backUrl);
  }


};

