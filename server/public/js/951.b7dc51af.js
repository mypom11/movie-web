"use strict";(self["webpackChunkmovie_web"]=self["webpackChunkmovie_web"]||[]).push([[951],{2951:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var l=n(3396),i=n(7139);const o=e=>((0,l.dD)("data-v-ebff64b6"),e=e(),(0,l.Cn)(),e),s={class:"inner"},r=o((()=>(0,l._)("h1",null,"Previous Movies",-1))),a={class:"category"},u=o((()=>(0,l._)("li",null,[(0,l._)("label",{for:""},"연도"),(0,l._)("input",{type:"number",min:"1900",max:"2099",step:"1",value:"2016"})],-1))),c=o((()=>(0,l._)("label",{for:""},"장르",-1))),v={name:"",id:""},_=o((()=>(0,l._)("label",{for:""},"국가",-1))),p={name:"",id:""},d={class:"search-input"},f=o((()=>(0,l._)("input",{type:"text",placeholder:"영화제목을 입력하세요."},null,-1))),g=o((()=>(0,l._)("ul",null,[(0,l._)("li")],-1)));function b(e,t,n,o,b,h){return(0,l.wg)(),(0,l.iD)("section",null,[(0,l._)("div",s,[r,(0,l._)("ul",a,[u,(0,l._)("li",null,[c,(0,l._)("select",v,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(b.gerne,((e,t)=>((0,l.wg)(),(0,l.iD)("option",{key:t},(0,i.zw)(e),1)))),128))])]),(0,l._)("li",null,[_,(0,l._)("select",p,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(b.country,((e,t)=>((0,l.wg)(),(0,l.iD)("option",{key:t},(0,i.zw)(e),1)))),128))])])]),(0,l._)("div",d,[f,(0,l._)("button",{class:"custom",onClick:t[0]||(t[0]=(...e)=>h.getMovieList&&h.getMovieList(...e))},"검색")]),g])])}const h={1:"드라마",2:"판타지",3:"서부",4:"공포",5:"로맨스",6:"모험",7:"스릴러",8:"느와르",9:"컬트",10:"다큐멘터리",11:"코미디",12:"가족",13:"미스터리",14:"전쟁",15:"애니메이션",16:"범죄",17:"뮤지컬",18:"SF",19:"액션",20:"무협",21:"에로",22:"서스펜스",23:"서사",24:"블랙코미디",25:"실험",26:"영화카툰",27:"영화음악",28:"영화패러디포스터"},m={KR:"대한민국",US:"미국",FR:"프랑스",GB:"영국",HK:"홍콩",JP:"일본",ETC:"기타"};var w={data(){return{gerne:h,country:m}},methods:{getMovieList(){const e={query:"",display:10,start:1,gerne:"1",country:"KR",yearfrom:1990},t=this.$axios.get("https://openapi.naver.com/v1/search/movie.json",{headers:{"X-Naver-Client-Id":"x1tQGuqkGncSDxIQEpUi","X-Naver-Client-Secret":"hWIllr7fRv"},params:e}).then((e=>e.data.rss));console.log(t)}}},y=n(89);const k=(0,y.Z)(w,[["render",b],["__scopeId","data-v-ebff64b6"]]);var C=k}}]);
//# sourceMappingURL=951.b7dc51af.js.map