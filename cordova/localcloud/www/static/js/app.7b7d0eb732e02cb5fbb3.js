webpackJsonp([0],[function(t,e,o){"use strict";var n=o(4);e.a=new n.default},function(t,e,o){"use strict";o.d(e,"e",function(){return n}),o.d(e,"a",function(){return r}),o.d(e,"b",function(){return a}),o.d(e,"c",function(){return i}),o.d(e,"d",function(){return u});var n="/",r="/dir",a="/dir/remote",i="/config",u="/config/remote"},,function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={remote_proto:"http",remote_host:"",remote_port:""}},,function(t,e){},function(t,e,o){"use strict";var n=o(4),r=o(34),a=o(1),i=o(28),u=o.n(i),s=o(27),l=o.n(s);n.default.use(r.a),e.a=new r.a({routes:[{path:a.e,component:u.a},{path:a.a,component:u.a},{path:a.d,component:l.a}]})},,function(t,e){},function(t,e){},,function(t,e,o){function n(t){o(21)}var r=o(2)(o(13),o(29),n,null,null);t.exports=r.exports},,function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(18),r=o(25),a=o.n(r),i=o(0);o(1);e.default={name:"app",data:function(){return{showbottom:!0}},mounted:function(){var t=this;i.a.$on("showbottom",function(e){t.showbottom=e}),n.a.main(t)},methods:{},components:{Bottom:a.a}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(0),r=o(1);e.default={data:function(){return{dirNav:r.a,remoteNav:r.b,configNav:r.c,bottomNav:"",bottomNavColor:""}},mounted:function(){this.handleChange(r.a),n.a.$on("bottom_onchange",function(t){this.bottomNav=t,this.bottomNavColor=t})},methods:{handleChange:function(t){this.bottomNav!=t&&(this.bottomNav=t,this.bottomNavColor=t,this.$router.push({path:t}))}}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});o(0);e.default={data:function(){return{transform_popup:!1}},mounted:function(){},methods:{openTransformPopup:function(){this.transform_popup=!0},closeTransformPopup:function(){this.transform_popup=!1}}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(0),r=o(19),a=o(3),i=o(1);e.default={data:function(){return{remote_proto:"http",remote_host:"",remote_port:""}},mounted:function(){},methods:{linkstart:function(){var t=this;if(""==this.remote_ip||""==this.remote_port)return void alert("请输入正确IP和端口");a.remote_proto=this.remote_proto,a.remote_host=this.remote_host,a.remote_port=this.remote_port;var e=r.a(r.b);if(0==e)return void alert("请输入正确配置");this.$http.get(e,{},{emulateJSON:!0}).then(function(e){var o=e.body;if(0!=o.error_no)return alert(o.error_msg),a.remote_host="",a.remote_port="",t.remote_host="",void(t.remote_port="");n.a.$emit("showbottom",!0),t.$router.push({path:i.e})}).catch(function(e){alert("连接失败，请确认ip和端口是否正确"),a.remote_host="",a.remote_port="",t.remote_host="",t.remote_port=""})}},components:{}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=(o(0),o(5)),r=(o.n(n),o(26)),a=o.n(r);e.default={data:function(){return{uploadDirList:[]}},mounted:function(){},methods:{},components:{TransformUi:a.a}}},function(t,e,o){"use strict";var n=o(0),r=(o(3),o(1));window.localStorage;e.a={main:function(t){this.showRemoteConfigPage(t)},getRemoteHostPort:function(){},showRemoteConfigPage:function(t){n.a.$emit("showbottom",!1),t.$router.push({path:r.d})}}},function(t,e,o){"use strict";function n(t){return""!=r.remote_proto&&""!=r.remote_host&&""!=r.remote_port&&""!=t&&r.remote_proto+"://"+r.remote_host+":"+r.remote_port+t}e.a=n,o.d(e,"b",function(){return a});var r=o(3),a="/config/connection"},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(4),r=o(12),a=o(10),i=o.n(a),u=o(8),s=(o.n(u),o(9)),l=(o.n(s),o(11)),c=o.n(l),m=o(6),f=o(5),p=(o.n(f),o(3)),d=o(7);o.n(d).a.init(),n.default.config.productionTip=!1,n.default.prototype.GLOBAL=p,n.default.use(i.a),n.default.use(r.a),new n.default({el:"#app",router:m.a,template:"<App/>",components:{App:c.a}}),n.default.http.interceptors.push(function(t,e){t.credentials=!0,e()}),document.addEventListener("touchstart",function(t){},!0)},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,o){var n=o(2)(o(14),o(33),null,null,null);t.exports=n.exports},function(t,e,o){function n(t){o(24)}var r=o(2)(o(15),o(32),n,null,null);t.exports=r.exports},function(t,e,o){function n(t){o(23)}var r=o(2)(o(16),o(31),n,null,null);t.exports=r.exports},function(t,e,o){function n(t){o(22)}var r=o(2)(o(17),o(30),n,null,null);t.exports=r.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("keep-alive",[o("router-view")],1),t._v(" "),t.showbottom?o("bottom",{attrs:{id:"bottom"}}):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"dir"}},[o("TransformUi")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"config-remote"}},[o("mu-appbar",{attrs:{title:"连接",id:"appbar_connent"}}),t._v(" "),o("div",{attrs:{id:"config-remote-field"}},[o("mu-row",[o("mu-select-field",{attrs:{label:"协议",fullWidth:""},model:{value:t.remote_proto,callback:function(e){t.remote_proto=e},expression:"remote_proto"}},[o("mu-menu-item",{attrs:{value:"http",title:"http",select:"select"}}),t._v(" "),o("mu-menu-item",{attrs:{value:"https",title:"https"}}),t._v(" "),o("mu-menu-item",{attrs:{value:"ws",title:"ws"}}),t._v(" "),o("mu-menu-item",{attrs:{value:"wss",title:"wss"}})],1)],1),t._v(" "),o("mu-row",[o("mu-text-field",{attrs:{label:"IP",labelFloat:"",fullWidth:""},model:{value:t.remote_host,callback:function(e){t.remote_host=e},expression:"remote_host"}})],1),t._v(" "),o("mu-row",[o("mu-text-field",{attrs:{label:"端口",labelFloat:"",fullWidth:""},model:{value:t.remote_port,callback:function(e){t.remote_port=e},expression:"remote_port"}})],1),t._v(" "),o("mu-row",[o("mu-raised-button",{attrs:{label:"Link Start!",fullWidth:""},on:{click:t.linkstart}})],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"transform_ui"}},[o("mu-float-button",{attrs:{icon:"swap_vertical_circle",mini:"",id:"trans-float-button"},on:{click:function(e){t.openTransformPopup()}}}),t._v(" "),o("input",{attrs:{type:"file",id:"transform_file_select",multiple:""}}),t._v(" "),o("mu-float-button",{attrs:{icon:"cloud_upload",mini:"",id:"upload-float-button",for:"transform_file_select"}}),t._v(" "),o("mu-popup",{attrs:{position:"bottom",popupClass:"popup-transform",open:t.transform_popup},on:{close:function(e){t.closeTransformPopup()}}},[o("mu-appbar",{attrs:{title:"传输列表"}},[o("mu-flat-button",{attrs:{label:"隐藏",color:"white"},on:{click:function(e){t.closeTransformPopup()}},slot:"right"})],1),t._v(" "),o("mu-content-block",[o("mu-list",[o("mu-sub-header",{attrs:{inset:""}},[t._v("Folders")]),t._v(" "),o("mu-list-item",{attrs:{title:"Photos",describeText:"Jan 9, 2014"}},[o("mu-avatar",{attrs:{icon:"folder"},slot:"leftAvatar"}),t._v(" "),o("mu-icon",{attrs:{value:"info"},slot:"right"})],1),t._v(" "),o("mu-list-item",{attrs:{title:"Recipes",describeText:"Jan 17, 2014"}},[o("mu-avatar",{attrs:{icon:"folder"},slot:"leftAvatar"}),t._v(" "),o("mu-icon",{attrs:{value:"info"},slot:"right"})],1),t._v(" "),o("mu-list-item",{attrs:{title:"Work",describeText:"Jan 28, 2014"}},[o("mu-avatar",{attrs:{icon:"folder"},slot:"leftAvatar"}),t._v(" "),o("mu-icon",{attrs:{value:"info"},slot:"right"})],1)],1),t._v(" "),o("mu-divider",{attrs:{inset:""}}),t._v(" "),o("mu-list",[o("mu-sub-header",{attrs:{inset:""}},[t._v("Files")]),t._v(" "),o("mu-list-item",{attrs:{title:"Vacation itinerary",describeText:"Jan 20, 2014"}},[o("mu-avatar",{attrs:{icon:"assignment",backgroundColor:"blue"},slot:"leftAvatar"}),t._v(" "),o("mu-icon",{attrs:{value:"info"},slot:"right"}),t._v(" "),o("mu-switch",{slot:"right",model:{value:t.calls,callback:function(e){t.calls=e},expression:"calls"}})],1),t._v(" "),o("mu-list-item",{attrs:{title:"Kitchen remodel",describeText:"Jan 10, 2014"}},[o("mu-avatar",{attrs:{icon:"insert_chart",backgroundColor:"yellow600"},slot:"leftAvatar"}),t._v(" "),o("mu-icon",{attrs:{value:"info"},slot:"right"})],1)],1)],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("mu-paper",[o("mu-bottom-nav",{attrs:{value:t.bottomNav,shift:""},on:{change:t.handleChange}},[o("mu-bottom-nav-item",{attrs:{value:t.dirNav,title:"文件",icon:"folder"}}),t._v(" "),o("mu-bottom-nav-item",{attrs:{value:t.remoteNav,title:"远程",icon:"cloud"}}),t._v(" "),o("mu-bottom-nav-item",{attrs:{value:t.configNav,title:"设置",icon:"settings"}})],1)],1)},staticRenderFns:[]}},,,,function(t,e){}],[20]);
//# sourceMappingURL=app.7b7d0eb732e02cb5fbb3.js.map