"use strict";(self.webpackChunkwan_bagtas=self.webpackChunkwan_bagtas||[]).push([[7969],{4282:function(n,e,l){l.r(e);var i=l(3433),t=l(1413),s=l(5861),r=l(9439),o=l(7757),a=l.n(o),d=l(2791),u=l(7235),c=l(7355),x=l(2286),f=l(983),h=l(5033),p=l(9348),m=l(6923),b=l(4361),v=l(690),g=l(3425),j=l(936),Z=l(3967),y=l(7621),S=l(9585),w=l(220),k=l(3400),C=l(9504),_=l(493),N=l(6823),z=l(5818),A=l(5021),W=l(7064),I=l(9900),P=l(4721),O=l(3721),L=l(2363),E=l(8388),T=l(2426),J=l.n(T),D=l(1903),M=l(9271),U=l(1523),H=l(8439),G=l(9431),F=l(4681),R=l(3329),V=d.lazy((function(){return Promise.all([l.e(9953),l.e(5646),l.e(2667),l.e(1918),l.e(7087),l.e(3753),l.e(8522),l.e(929),l.e(7047)]).then(l.bind(l,929))})),q=d.lazy((function(){return Promise.all([l.e(9953),l.e(5646),l.e(2667),l.e(3753),l.e(4127)]).then(l.bind(l,944))})),B=d.lazy((function(){return Promise.all([l.e(9953),l.e(5497)]).then(l.bind(l,5497))}));e.default=function(n){var e,l,o,T,Q,X,K,Y=n.lineup,$=n.isBordered,nn=n.isLast,en=n.isSongsExpanded,ln=(0,H.v0)(G.O).currentUser,tn=(0,M.k6)(),sn=(0,Z.Z)(),rn=(0,d.useState)(!1),on=(0,r.Z)(rn,2),an=on[0],dn=on[1],un=(0,d.useState)({song:null,id:null}),cn=(0,r.Z)(un,2),xn=cn[0],fn=cn[1],hn=(0,d.useState)(!1),pn=(0,r.Z)(hn,2),mn=pn[0],bn=pn[1],vn=(0,d.useState)(!1),gn=(0,r.Z)(vn,2),jn=gn[0],Zn=gn[1],yn=(0,d.useState)([]),Sn=(0,r.Z)(yn,2),wn=Sn[0],kn=Sn[1],Cn=(0,d.useState)(!1),_n=(0,r.Z)(Cn,2),Nn=_n[0],zn=_n[1],An=(0,d.useState)({song:null,status:!1}),Wn=(0,r.Z)(An,2),In=Wn[0],Pn=Wn[1];(0,d.useEffect)((function(){Y.songs.length>0&&Y.songs[0].title&&On()}),[Y.songs]);var On=function(){var n=(0,s.Z)(a().mark((function n(){var e;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e=[],Y.songs.map(function(){var n=(0,s.Z)(a().mark((function n(l){var i;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,F.dJ)({song:l});case 2:i=n.sent,e.push((0,t.Z)((0,t.Z)({},i),{},{label:l.label}));case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()),kn(e);case 3:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),Ln=function(n,e){fn({song:n,id:e}),dn(!an)},En=function(){var n=(0,s.Z)(a().mark((function n(){return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:(0,F.ZH)({id:Y.id});case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),Tn=function(){var n,e=null===Y||void 0===Y||null===(n=Y.heart)||void 0===n?void 0:n.findIndex((function(n){return n===ln.uid}));-1!==e&&void 0!==e||(0,F.Ob)({lineupId:Y.id,userIds:[].concat((0,i.Z)(null===Y||void 0===Y?void 0:Y.heart),[ln.uid])})},Jn=Y.songs[0].title?wn:Y.songs;return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(d.Suspense,{fallback:(0,R.jsx)("div",{}),children:(0,R.jsx)(q,{drawerData:xn,expanded:an,handleClose:function(){},handleCopy:function(){var n=document.querySelector("#verse"),e=document.querySelector("#pre-chorus"),l=document.querySelector("#chorus");navigator.clipboard.writeText("".concat(n?"Verse:\r\n".concat(n.innerHTML,"\r\n\r\n"):"").concat(e?"Pre-chorus:\r\n".concat(e.innerHTML,"\r\n\r\n"):"").concat(l?"Chorus:\r\n".concat(l.innerHTML):"")),Zn(!0),setTimeout((function(){Zn(!1)}),1e3)},handleExpandClick:Ln,open:jn})}),(0,R.jsx)(d.Suspense,{fallback:(0,R.jsx)("div",{}),children:(0,R.jsx)(V,{drawer:In,setOpen:Pn})}),(0,R.jsx)(d.Suspense,{fallback:(0,R.jsx)("div",{}),children:(0,R.jsx)(B,{setOpen:zn,open:Nn,handleDelete:En,handleEdit:function(){tn.push("/lineup/edit/".concat(Y.id))},user:ln,lineup:Y})}),(0,R.jsxs)(y.Z,{sx:{maxWidth:"100%",mb:$&&nn?0:$?1:2,border:"none",borderRadius:$?0:""},variant:$?"outlined":"elevation",children:[(0,R.jsx)(S.Z,{sx:{pb:0},avatar:(0,R.jsx)(U.rU,{to:"/profile/".concat(null===Y||void 0===Y||null===(e=Y.worship_leader)||void 0===e?void 0:e.uid),style:{textDecoration:"none",color:"inherit"},children:(0,R.jsx)(w.Z,{sx:{background:"linear-gradient(45deg, ".concat(D.iQ,", ").concat(D.iN,")"),color:"#fff"},"aria-label":"recipe",src:null===Y||void 0===Y||null===(l=Y.worship_leader)||void 0===l?void 0:l.photoURL,children:null===Y||void 0===Y?void 0:Y.worship_leader.displayName.split("")[0]})}),action:(0,R.jsx)(R.Fragment,{children:(ln.uid===(null===(o=Y.worship_leader)||void 0===o?void 0:o.uid)||ln.uid===E.GN)&&(0,R.jsx)(k.Z,{"aria-label":"settings",onClick:function(){return zn(!0)},children:(0,R.jsx)(u.Z,{})})}),title:(0,R.jsx)(U.rU,{to:"/profile/".concat(null===(T=Y.worship_leader)||void 0===T?void 0:T.uid),style:{textDecoration:"none",color:"inherit"},children:null===(Q=Y.worship_leader)||void 0===Q?void 0:Q.displayName}),subheader:(0,R.jsxs)("small",{children:[J()(Y.date_created).startOf("minute").fromNow()," ",Y.date_updated&&(0,R.jsxs)("span",{style:{color:"#777"},children:["\u2022 Edited:"," ",J()(Y.date_updated).startOf("minute").fromNow()]})]})}),(0,R.jsx)(C.Z,{sx:{py:0},children:(0,R.jsx)(_.Z,{sx:{py:0,mt:1},children:(0,R.jsxs)(N.Z,{expanded:mn||en,disableGutters:!0,sx:{boxShadow:"none",py:0,background:"none"},children:[(0,R.jsx)(z.Z,{sx:{px:0,pr:1},expandIcon:(0,R.jsx)(c.Z,{}),"aria-controls":"panel1a-content",id:"panel1a-header",onClick:function(){return bn(!mn)},children:(0,R.jsxs)(A.ZP,{sx:{py:0},children:[(0,R.jsx)(W.Z,{sx:{minWidth:35},children:J()(Y.date).diff(new Date)<0?(0,R.jsx)(x.Z,{color:"success"}):(0,R.jsx)(f.Z,{fontSize:"small",color:J()(Y.date).diff(new Date)>=0?"warning":"inherit"})}),(0,R.jsx)(I.Z,{primary:(0,R.jsxs)("small",{className:"text-xs",children:[null===Y||void 0===Y?void 0:Y.service,(0,R.jsx)("div",{style:{color:sn.palette.text.secondary},className:"text-xs",children:J()(Y.date).format("LL")})]})})]})}),(0,R.jsx)(P.Z,{}),(0,R.jsx)(O.Z,{sx:{px:0},children:Jn.filter((function(n){return n.song||n.title})).map((function(n){var e,l,i,t,s,r,o,a;return(0,R.jsxs)(A.ZP,{children:[(0,R.jsx)(I.Z,{onClick:function(){return Pn({song:n,status:!0})},primary:(0,R.jsx)("span",{className:"text-sm",children:n.title||n.song}),secondary:(0,R.jsx)("span",{className:"text-xs text-white/40",children:n.label})}),(0,R.jsx)(k.Z,{color:"primary",disabled:!(null!==(e=n.lyrics)&&void 0!==e&&e.verse)&&!(null!==(l=n.lyrics)&&void 0!==l&&l.pre_chorus)&&!(null!==(i=n.lyrics)&&void 0!==i&&i.chorus),onClick:function(){return Ln(n,"Lyrics")},sx:{mr:1},children:(0,R.jsx)(h.Z,{fontSize:"small"})}),(0,R.jsx)(k.Z,{color:"secondary",onClick:function(){return Ln(n,"Chords")},disabled:!(null!==(t=n.chords)&&void 0!==t&&t.verse)&&!(null!==(s=n.chords)&&void 0!==s&&s.pre_chorus)&&!(null!==(r=n.chords)&&void 0!==r&&r.chorus),sx:{mr:1},children:(0,R.jsx)(p.Z,{fontSize:"small"})}),(0,R.jsx)(k.Z,{color:"error",disabled:!(null!==n&&void 0!==n&&null!==(o=n.media)&&void 0!==o&&o.youtube)&&!(null!==n&&void 0!==n&&null!==(a=n.media)&&void 0!==a&&a.spotify),children:(0,R.jsx)(m.Z,{fontSize:"small"})})]},n.id)}))})]})})}),(0,R.jsxs)(L.Z,{disableSpacing:!0,children:[(0,R.jsxs)(k.Z,{"aria-label":"add to favorites",onClick:Tn,children:[(null===Y||void 0===Y||null===(X=Y.heart)||void 0===X?void 0:X.findIndex((function(n){return n===ln.uid})))>=0?(0,R.jsx)(b.Z,{color:"error"}):(0,R.jsx)(v.Z,{onClick:Tn})," "]}),(0,R.jsx)("small",{style:{marginLeft:6,fontSize:14},children:null===Y||void 0===Y||null===(K=Y.heart)||void 0===K?void 0:K.length}),(0,R.jsx)("a",{href:"https://m.me/j/Aba8ddZutv5MvPbi/",style:{textDecoration:"none",color:"inherit"},onClick:function(){navigator.clipboard.writeText("https://wan-belleview.web.app/lineup/".concat(Y.id))},className:"ml-2",children:(0,R.jsx)(k.Z,{"aria-label":"share",children:(0,R.jsx)(g.Z,{fontSize:"small"})})}),(0,R.jsx)(k.Z,{"aria-label":"view",onClick:function(){return tn.push("/lineup/".concat(Y.id))},name:"View Lineup",sx:{marginLeft:"auto"},children:(0,R.jsx)(j.Z,{fontSize:"small"})})]})]})]})}},1903:function(n,e,l){l.d(e,{iN:function(){return z},iQ:function(){return A}});var i=l(1413),t=l(5861),s=l(9439),r=l(7757),o=l.n(r),a=l(7032),d=l(5600),u=l(9569),c=l(3710),x=l(2588),f=l(3967),h=l(3400),p=l(7621),m=l(9658),b=l(1889),v=l(7391),g=l(292),j=l(3466),Z=l(6151),y=l(2791),S=l(184),w=l(4791),k=l(5366),C=l(9276),_=(l(4246),l(9137),l(343)),N=l(3329),z="#00addd",A="#f51088";e.ZP=function(n){var e=n.setScreen,l=(0,f.Z)(),r=(0,y.useContext)(S.t),z=r.setMode,A=r.mode,W=r.setCurrentUser,I=(r.setIsLoggedIn,(0,y.useState)(!1)),P=(0,s.Z)(I,2),O=P[0],L=P[1],E=(0,y.useState)({email:"",password:""}),T=(0,s.Z)(E,2),J=T[0],D=T[1],M=(0,y.useState)(null),U=(0,s.Z)(M,2),H=(U[0],U[1]),G=(0,y.useState)(!1),F=(0,s.Z)(G,2),R=F[0],V=F[1],q=(0,y.useState)(null),B=(0,s.Z)(q,2),Q=B[0],X=B[1],K=function(){var n=(0,t.Z)(o().mark((function n(){var e,l,i;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return V(!0),X(null),n.next=4,(0,w.cL)({email:J.email,password:J.password});case 4:l=n.sent,console.log({response:l}),null!==(e=l.user)&&void 0!==e&&e.auth?(W(l),H(l.user.uid)):(console.log({error:l}),i="auth/email-already-in-use"===l.code?"Email already in use":"auth/wrong-password"===l.code||"auth/user-not-found"===l.code?"The email or password that you've entered doesn't match any account.":"No internet connection.",X(i),V(!1));case 7:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(h.Z,{onClick:function(){return z(!A)},sx:{position:"fixed",left:20,bottom:20,zIndex:1002},children:"dark"===l.palette.mode?(0,N.jsx)(a.Z,{}):(0,N.jsx)(d.Z,{})}),(0,N.jsxs)(p.Z,{sx:{py:4,px:4,textAlign:"center",m:2,width:"auto",maxWidth:345,background:"#ffffff28",backdropFilter:"blur(5px)",boxSizing:"border-box",boxShadow:"0 10px 30px -5px rgba(0,0,0,.3)",zIndex:1002},children:[(0,N.jsx)(C.Z,{sx:{width:"100%",mb:4},children:(0,N.jsx)("img",{src:_,alt:"WAN | Belleview",style:{width:"100%"}})}),Q&&(0,N.jsx)(m.Z,{severity:"error",sx:{mb:1,textAlign:"left",fontSize:12},onClose:function(){return X(null)},children:Q}),(0,N.jsxs)(b.ZP,{container:!0,spacing:2,className:"mt-[-20%]",children:[(0,N.jsx)(b.ZP,{item:!0,xs:12,md:12,children:(0,N.jsx)(v.Z,{variant:"standard",label:"Email Address",fullWidth:!0,type:"email",disabled:R,onChange:function(n){return D((0,i.Z)((0,i.Z)({},J),{},{email:n.target.value}))},className:"autofill:bg-red-700"})}),(0,N.jsx)(b.ZP,{item:!0,xs:12,md:12,children:(0,N.jsx)(g.Z,{variant:"standard",label:"Password",fullWidth:!0,disabled:R,type:O?"text":"password",onChange:function(n){return D((0,i.Z)((0,i.Z)({},J),{},{password:n.target.value}))},endAdornment:(0,N.jsx)(j.Z,{position:"end",children:(0,N.jsx)(h.Z,{"aria-label":"toggle password visibility",onClick:function(){return L(!O)},onMouseDown:function(){return L(!O)},edge:"end",children:O?(0,N.jsx)(u.Z,{}):(0,N.jsx)(c.Z,{})})})})}),(0,N.jsx)(b.ZP,{item:!0,xs:12,md:12,sx:{mt:2},children:(0,N.jsxs)(b.ZP,{container:!0,spacing:2,children:[(0,N.jsx)(b.ZP,{item:!0,xs:8,md:8,children:(0,N.jsx)(k.Z,{color:"primary",onClick:K,loading:R,loadingPosition:"start",startIcon:(0,N.jsx)(x.Z,{}),variant:"contained",fullWidth:!0,disableElevation:!0,disabled:!J.email||!J.password,children:"LOGIN"})}),(0,N.jsx)(b.ZP,{item:!0,xs:4,md:4,children:(0,N.jsx)(Z.Z,{variant:"text",fullWidth:!0,disabled:R,onClick:function(){return e("signup")},children:"Sign Up"})})]})})]})]})]})}},7969:function(n,e,l){l.r(e),l.d(e,{default:function(){return _}});var i=l(3967),t=l(6010),s=l(7621),r=l(2791),o=l(9271),a=l(9439),d=l(1413),u=l(5987),c=l(8870),x=l(493),f=l(5021),h=l(653),p=l(220),m=l(9900),b=l(5228),v=l(3896),g=l(1523),j=(l(4282),l(5803)),Z=l(3329),y=["children","value","index","filter","friends"],S=function(n){var e=(0,o.UO)(),l=(n.children,n.value),i=n.index,t=n.filter,s=n.friends,r=(0,u.Z)(n,y);return(0,Z.jsx)("div",(0,d.Z)((0,d.Z)({role:"tabpanel",hidden:l!==i,id:"simple-tabpanel-".concat(i),"aria-labelledby":"simple-tab-".concat(i)},r),{},{children:l===i&&(0,Z.jsx)(c.Z,{sx:{p:1,justifyContent:"center",display:"flex",flexDirection:"column"},children:(0,Z.jsx)(x.Z,{children:s.filter((function(n){return n.uid!==e.id})).filter((function(n){return n.uid})).filter((function(n){return t?n.ministry===t:n})).map((function(n){return(0,Z.jsx)(g.rU,{to:"/profile/".concat(null===n||void 0===n?void 0:n.uid),style:{textDecoration:"none",color:"inherit"},children:(0,Z.jsxs)(f.ZP,{children:[(0,Z.jsx)(h.Z,{children:(0,Z.jsx)(p.Z,{src:null===n||void 0===n?void 0:n.photoURL,children:(0,Z.jsx)(j.Z,{})})}),(0,Z.jsx)(m.Z,{primary:null!==n&&void 0!==n&&n.displayName?null===n||void 0===n?void 0:n.displayName:null===n||void 0===n?void 0:n.email})]})},null===n||void 0===n?void 0:n.uid)}))})})}))},w=function(n){return{id:"simple-tab-".concat(n),"aria-controls":"simple-tabpanel-".concat(n)}},k=function(n){var e=n.friends,l=n.id,i=n.filter;return(0,Z.jsxs)("span",{style:{display:"flex",flexDirection:"row",alignItems:"center",gap:8},children:[i," ",(0,Z.jsx)("span",{style:{fontSize:10,background:"#333",color:"#fff",borderRadius:"100%",width:20,height:20,display:"flex",justifyContent:"center",alignItems:"center"},children:e.filter((function(n){return n.uid!==l})).filter((function(n){return n.ministry===i})).length})]})},C=function(n){var e=n.friends,l=(0,o.UO)(),t=(0,i.Z)(),s=r.useState(0),u=(0,a.Z)(s,2),x=u[0],f=u[1];return(0,Z.jsxs)(c.Z,{sx:{width:"100%",minHeight:458,maxHeight:458,overflow:"auto"},children:[(0,Z.jsx)(c.Z,{sx:{borderBottom:1,borderColor:"divider"},children:(0,Z.jsxs)(b.Z,{value:x,onChange:function(n,e){f(e)},"aria-label":"basic tabs example",sx:{alignItems:"center",position:"fixed",top:0,left:0,width:"100%",zIndex:1002,background:t.palette.background.paper,backdropFilter:"blur(5px)",borderBottom:"1px solid ".concat(t.palette.background.default)},children:[(0,Z.jsx)(v.Z,(0,d.Z)({sx:{fontSize:".75rem",padding:"12px 4px",minWidth:84},label:(0,Z.jsxs)("span",{children:["All"," ",(0,Z.jsx)("span",{style:{fontSize:10,background:"#333",padding:4,color:"#fff",borderRadius:"100%",width:20,height:20},children:e.filter((function(n){return n.uid!==l.id})).length})]})},w(1))),(0,Z.jsx)(v.Z,(0,d.Z)({sx:{fontSize:".75rem",padding:"12px 4px",minWidth:80},label:(0,Z.jsx)(k,{friends:e,id:l.id,filter:"VIA"})},w(2))),(0,Z.jsx)(v.Z,(0,d.Z)({sx:{fontSize:".75rem",padding:"12px 4px",minWidth:80},label:(0,Z.jsx)(k,{friends:e,id:l.id,filter:"JAM"})},w(3))),(0,Z.jsx)(v.Z,(0,d.Z)({sx:{fontSize:".75rem",padding:"12px 4px",minWidth:80},label:(0,Z.jsx)(k,{friends:e,id:l.id,filter:"TEAM"})},w(4)))]})}),(0,Z.jsxs)(c.Z,{sx:{overflow:"auto",position:"relative",zIndex:1001,pt:"40px"},children:[(0,Z.jsx)(S,{value:x,index:0,filter:null,friends:e,children:"All"}),(0,Z.jsx)(S,{value:x,index:1,filter:"VIA",friends:e,children:"VIA"}),(0,Z.jsx)(S,{value:x,index:2,filter:"JAM",friends:e,children:"JAM"}),(0,Z.jsx)(S,{value:x,index:3,filter:"TEAM",friends:e,children:"TEAM"})]})]})},_=function(n){var e=n.open,l=n.setOpen,r=(n.user,n.friends);n.handleToOther,(0,i.Z)(),(0,o.UO)();return(0,Z.jsx)(t.Z,{open:e,onClose:function(){return l(!1)},children:(0,Z.jsx)(s.Z,{sx:{width:"90%",minWidth:300,maxWidth:400,position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",boxSizing:"border-box"},children:(0,Z.jsx)(C,{friends:r})})})}},8388:function(n,e,l){l.d(e,{GN:function(){return s},Pt:function(){return i},em:function(){return t}});var i=[{id:"os-1",label:"Opening Song",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!0,tags:["Solemn"]},{id:"ws-1",label:"Welcome Song",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!1,tags:["Joyful"]},{id:"js-1",label:"Joyful Song #1",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!1,tags:["Joyful"]},{id:"js-2",label:"Joyful Song #2",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!1,tags:["Joyful"]},{id:"js-3",label:"Joyful Song #3",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!1,tags:["Joyful"]},{id:"ss-1",label:"Solemn Song #1",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!0,tags:["Solemn"]},{id:"ss-2",label:"Solemn Song #2",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!0,tags:["Solemn"]},{id:"ss-3",label:"Solemn Song #3",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!0,tags:["Solemn"]},{id:"ps-1",label:"Pastoral Song",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!0,tags:["Solemn"]},{id:"vs-1",label:"Victory Song",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!1,tags:["Joyful"]},{id:"cs-1",label:"Closing Song",artist:null,album:null,lyrics:null,chords:null,media:null,song:null,disabled:!1,is_solemn:!0,tags:["Solemn"]}],t="k4gcy3yNWqa02aUfhw8J4fn7sS63",s="Hfhcau8TAiXR4T4FEAXp7eipDvz2"},4246:function(n,e,l){n.exports=l.p+"static/media/WAN_LOGO.e5dfb9e940cedcae48a7.png"},343:function(n,e,l){n.exports=l.p+"static/media/WAN_LOGO_NEW.344d00367654792c706d.png"},9137:function(n,e,l){n.exports=l.p+"static/media/WAN_LOGO_WHITE.caf4984d60e0e25918c5.png"}}]);
//# sourceMappingURL=7969.21a81a79.chunk.js.map