jQuery.webshims.ready("json-storage dom-extend",function(b,j,q,m,o){(function(){var n={input:1,textarea:1},g={updateInput:1,input:1},k={radio:1,checkbox:1,submit:1,button:1,image:1,reset:1,color:1},l=function(h){var a,e=h.attr("value"),c=function(f){if(h){var i=h.attr("value");if(i!==e){e=i;if(!f||!g[f.type])j.triggerInlineForm(h[0],"input")}}},d=function(){h.unbind("focusout",d).unbind("input",c).unbind("updateInput",c);clearInterval(a);c();h=null};clearInterval(a);a=setInterval(c,b.browser.mozilla?
250:111);setTimeout(c,9);h.bind("focusout",d).bind("input updateInput",c)};b(m).bind("focusin",function(h){if(h.target&&h.target.type&&!h.target.readonly&&!h.target.readOnly&&!h.target.disabled&&n[(h.target.nodeName||"").toLowerCase()]&&!k[h.target.type])l(b(h.target))})})();(function(){if(!("value"in m.createElement("output"))){var n=function(g){if(!g.getAttribute("aria-live")){g=b(g);var k=(g.text()||"").trim(),l=g.attr("id"),h=g.attr("for"),a=b('<input class="output-shim" type="hidden" name="'+
(g.attr("name")||"")+'" value="'+k+'" style="display: none" />').insertAfter(g),e=a[0].form||m,c=function(d){a[0].value=d;d=a[0].value;g.text(d);j.contentAttr(g[0],"value",d)};g[0].defaultValue=k;j.contentAttr(g[0],"value",k);g.attr({"aria-live":"polite"});if(l){a.attr("id",l);g.attr("aria-labeldby",j.getID(b('label[for="'+l+'"]',e)))}if(h){l=j.getID(g);h.split(" ").forEach(function(d){(d=e.getElementById(d))&&d.setAttribute("aria-controls",l)})}g.data("outputShim",c);a.data("outputShim",c);return c}};
j.defineNodeNameProperty("output","value",{set:function(g){var k=b.data(this,"outputShim");k||(k=n(this));k(g)},get:function(){return j.contentAttr(this,"value")||b(this).text()||""}},true,"output-props","form-output-datalist");j.addReady(function(g,k){b("output",g).add(k.filter("output")).each(function(){n(this)})})}})();(function(){if(!Modernizr.datalist){var n=0,g={submit:1,button:1,reset:1,hidden:1,range:1,date:1},k=b.browser.msie&&parseInt(b.browser.version,10)<7,l=function(a){if(!a)return[];
var e;try{e=JSON.parse(localStorage.getItem("storedDatalistOptions"+a))}catch(c){}return e||[]},h={_create:function(a){var e=a.datalist||a.id&&m.getElementById(a.id);if(!g[(a.input.getAttribute("type")||"").toLowerCase()||a.input.type]){var c=b.data(a.input,"datalistWidget");if(e&&c&&c.datalist!==e){c.datalist=e;c.id=a.id;c._resetListCached()}else if(e){n++;var d=this;this.timedHide=function(){clearTimeout(d.hideTimer);d.hideTimer=setTimeout(b.proxy(d,"hideList"),9)};this.datalist=e;this.id=a.id;
this.lazyIDindex=n;this.hasViewableData=true;this._autocomplete=b.attr(a.input,"autocomplete");b.data(a.input,"datalistWidget",this);this.shadowList=b('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=a.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseover.datalistWidget mousedown.datalistWidget click.datalistWidget",function(f){var i=b("li:not(.hidden-item)",d.shadowList),p=f.type=="mousedown"||f.type=="click";d.markItem(i.index(f.target),p,i);f.type=="click"&&
d.hideList();return f.type!="mousedown"}).bind("focusout",this.timedHide);a.input.setAttribute("autocomplete","off");b(a.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",b.proxy(this,"showHideOptions")).bind("keydown.datalistWidget",function(f){var i=f.keyCode;if(i==40&&!d.showList()){d.markItem(d.index+1,true);return false}if(d.isListVisible){if(i==38){d.markItem(d.index-1,true);return false}if(!f.shiftKey&&(i==33||i==36)){d.markItem(0,true);return false}if(!f.shiftKey&&(i==34||
i==35)){f=b("li:not(.hidden-item)",d.shadowList);d.markItem(f.length-1,true,f);return false}if(i==13||i==27){d.hideList();return false}}}).bind("blur.datalistWidget",this.timedHide);b(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",b.proxy(this,"_resetListCached"));this._resetListCached();a.input.form&&a.input.id&&b(a.input.form).bind("submit.datalistWidget"+a.input.id,function(){var f=b.attr(a.input,"value");d.storedOptions=d.storedOptions||l(a.input.name||
a.input.id);if(f&&b.inArray(f,d.storedOptions)==-1){d.storedOptions.push(f);f=a.input.name||a.input.id;var i=d.storedOptions;if(f){i=i||[];try{localStorage.setItem("storedDatalistOptions"+f,JSON.stringify(i))}catch(p){}}}})}else c&&c.destroy()}},destroy:function(){var a=b.attr(this.input,"autocomplete");b(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();b(m).unbind(".datalist"+this.id);this.input.form&&this.input.id&&b(this.input.form).unbind("submit.datalistWidget"+
this.input.id);this.input.removeAttribute("aria-haspopup");a===o?this.input.removeAttribute("autocomplete"):b(this.input).attr("autocomplete",a)},_resetListCached:function(){var a=this;this.needsUpdate=true;this.lastUpdatedValue=false;this.lastUnfoundValue="";clearTimeout(this.updateTimer);this.updateTimer=setTimeout(function(){a.updateListOptions()},this.isListVisible?0:20*this.lazyIDindex)},updateListOptions:function(){this.needsUpdate=false;clearTimeout(this.updateTimer);this.shadowList.css({fontSize:b.curCSS(this.input,
"fontSize"),fontFamily:b.curCSS(this.input,"fontFamily")});var a='<ul role="list" class="'+(this.datalist.className||"")+'">',e=[],c=[];b("option",this.datalist).each(function(d){if(!this.disabled){var f={value:b(this).val(),text:b.trim(b.attr(this,"label")||this.textContent||this.innerText||b.text([this])||""),className:this.className||"",style:b.attr(this,"style")||""};if(!f.text)f.text=f.value;e[d]=f.value;c[d]=f}});this.storedOptions=this.storedOptions||l(this.input.name||this.input.id);this.storedOptions.forEach(function(d){b.inArray(d,
e)==-1&&c.push({value:d,text:d,className:"",style:""})});c.forEach(function(d){a+='<li data-value="'+d.value+'" class="'+d.className+'" style="'+d.style+'" tabindex="-1" role="listitem">'+d.text+"</li>"});a+="</ul>";this.arrayOptions=c;this.shadowList.html(a);this.isListVisible&&this.showHideOptions()},showHideOptions:function(){var a=b.attr(this.input,"value").toLowerCase();if(!(a===this.lastUpdatedValue||this.lastUnfoundValue&&a.indexOf(this.lastUnfoundValue)===0)){this.lastUpdatedValue=a;var e=
false,c=b("li",this.shadowList);if(a)this.arrayOptions.forEach(function(d,f){if(!("lowerText"in d)){d.lowerText=d.text.toLowerCase();d.lowerValue=d.value.toLowerCase()}if(d.lowerText.indexOf(a)!==-1||d.lowerValue.indexOf(a)!==-1){b(c[f]).removeClass("hidden-item");e=true}else b(c[f]).addClass("hidden-item")});else{c.removeClass("hidden-item");e=true}if(this.hasViewableData=e)this.showList();else{this.lastUnfoundValue=a;this.hideList()}}},showList:function(){if(this.isListVisible)return false;this.needsUpdate&&
this.updateListOptions();this.showHideOptions();if(!this.hasViewableData)return false;var a=this,e=b(this.input).offset();e.top+=b(this.input).outerHeight();e.width=b(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);if(k){this.shadowList.css("height","auto");this.shadowList.height()>250&&this.shadowList.css("height",220)}this.shadowList.css(e).addClass("datalist-visible");this.isListVisible=true;b(m).bind("mousedown.datalist"+
this.id+" focusin.datalist"+this.id,function(c){if(c.target===a.input||a.shadowList[0]===c.target||b.contains(a.shadowList[0],c.target)){clearTimeout(a.hideTimer);setTimeout(function(){clearTimeout(a.hideTimer)},0)}else a.timedHide()});return true},hideList:function(){if(!this.isListVisible)return false;this.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");this.index=-1;this.isListVisible=false;b(this.input).removeAttr("aria-activedescendant");
b(m).unbind(".datalist"+this.id);return true},scrollIntoView:function(a){var e=b("> ul",this.shadowList),c=a.position();c.top-=(parseInt(e.css("paddingTop"),10)||0)+(parseInt(e.css("marginTop"),10)||0)+(parseInt(e.css("borderTopWidth"),10)||0);if(c.top<0)this.shadowList.scrollTop(this.shadowList.scrollTop()+c.top-2);else{c.top+=a.outerHeight();a=this.shadowList.height();c.top>a&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(c.top-a)+2)}},markItem:function(a,e,c){if(!(a<0)){c=c||b("li:not(.hidden-item)",
this.shadowList);if(!(a>=c.length)){c.removeClass("active-item");this.shadowList.addClass("list-item-active");c=c.filter(":eq("+a+")").addClass("active-item");if(e){b.attr(this.input,"value",c.attr("data-value"));b.attr(this.input,"aria-activedescendant",b.webshims.getID(c));this.scrollIntoView(c)}this.index=a}}}};j.defineNodeNameProperty("input","list",{get:function(){var a=j.contentAttr(this,"list");if(typeof a=="string")a=m.getElementById(a);return a||null},set:function(a){var e;if(a&&a.getAttribute){e=
a;a=j.getID(a)}j.contentAttr(this,"list",a);h&&j.objectCreate(h,o,{input:this,id:a,datalist:e})},content:true},true,"input-datalist","form-output-datalist");j.defineNodeNameProperty("input","selectedOption",{get:function(){var a=b.attr(this,"list"),e=null,c;if(!a)return e;c=b.attr(this,"value");if(!c)return e;a=b.attr(a,"options");if(!a.length)return e;b.each(a,function(d,f){if(c==b.attr(f,"value")){e=f;return false}});return e}},true,"input-datalist","form-output-datalist");j.defineNodeNameProperty("input",
"autocomplete",{get:function(){var a=b.data(this,"datalistWidget");if(a)return a._autocomplete;return"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(a){var e=b.data(this,"datalistWidget");if(e){e._autocomplete=a;a=="off"&&e.hideList()}else if("autocomplete"in this)this.autocomplete=a;else this.setAttribute("autocomplete",a)}});j.defineNodeNameProperty("datalist","options",{get:function(){var a=b("select",this);return a[0]?a[0].options:[]}},true,"datalist-props",
"form-output-datalist");j.addReady(function(a,e){e.filter("select, option").each(function(){var c=this.parentNode;if(c&&!b.nodeName(c,"datalist"))c=c.parentNode;c&&b.nodeName(c,"datalist")&&b(c).triggerHandler("updateDatalist")})})}})()});
