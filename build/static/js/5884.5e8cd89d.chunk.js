"use strict";(self.webpackChunkwan_bagtas=self.webpackChunkwan_bagtas||[]).push([[5884],{7475:function(e,t,n){var i=n(1413),s=(n(2791),n(7391)),l=n(3329);t.Z=function(e){var t=e.value,n=e.className,a=e.size,r=e.styles,o=e.color,d=void 0===o?"#fff":o;return(0,l.jsx)(s.Z,{disabled:!0,multiline:!0,value:t,fullWidth:!0,className:"first:px-0 ".concat(n),sx:{border:"none","& > .MuiOutlinedInput-root":{p:0,border:"none","& textarea":(0,i.Z)({border:"none","-webkit-text-fill-color":d,fontSize:a},r),"& fieldset":{border:"none"}}}})}},2209:function(e,t,n){n.d(t,{h:function(){return W}});var i=n(5861),s=n(1413),l=n(9439),a=n(7757),r=n.n(a),o=n(7032),d=n(5600),c=n(9569),u=n(3710),x=n(2588),m=n(3967),f=n(3400),p=n(7621),h=n(890),v=n(9658),b=n(1889),g=n(7391),j=n(8096),Z=n(4925),w=n(292),y=n(3466),N=n(7198),k=n(3786),A=n(6151),C=n(2791),M=n(184),z=n(5366),I=n(9276),S=(n(4246),n(9137)),P=n(4791),E=n(3329),W=[{name:"Jesus\u2019 Army of Musicians (JAM)",id:"JAM"},{name:"Voices in Adoration (VIA)",id:"VIA"},{name:"TEAM (Triune, Elyondoulos, Acts, Movenerate)",id:"TEAM"},{name:"Multimedia Arts Network (MAN)",id:"MAN"}];t.Z=function(e){var t=e.setScreen,n=(0,m.Z)(),a=(0,C.useContext)(M.t),_=a.setMode,L=a.mode,T=(a.setCurrentUser,a.setIsLoggedIn,(0,C.useState)(!1)),V=(0,l.Z)(T,2),O=V[0],U=V[1],F=(0,C.useState)({email:null,password:null,ministry:null}),H=(0,l.Z)(F,2),J=H[0],D=H[1],G=(0,C.useState)(null),R=(0,l.Z)(G,2),B=(R[0],R[1]),q=(0,C.useState)(!1),K=(0,l.Z)(q,2),Q=K[0],X=K[1],Y=(0,C.useState)(null),$=(0,l.Z)(Y,2),ee=$[0],te=$[1];(0,C.useEffect)((function(){console.log({user:J}),"admin.wan@gmail.com"===J.email&&D((0,s.Z)((0,s.Z)({},J),{},{password:"admin@wan",ministry:"ADMIN"}))}),[J.email]);var ne=function(){var e=(0,i.Z)(r().mark((function e(){var t,n;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return X(!0),te(null),e.prev=2,e.next=5,(0,P.Rg)((0,s.Z)({},J));case 5:t=e.sent,console.log({response:t}),t.auth?B(t.auth.currentUser.uid):(n="auth/email-already-in-use"===t.code?"Email already in use":"auth/wrong-password"===t.code?"The email or password that you've entered doesn't match any account.":"auth/invalid-email"===t.code?"Invalid Email":"No internet connection.",te(n),X(!1)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.log(e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(){return e.apply(this,arguments)}}();return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(f.Z,{onClick:function(){return _(!L)},sx:{position:"fixed",left:20,bottom:20,zIndex:1002},children:"dark"===n.palette.mode?(0,E.jsx)(o.Z,{}):(0,E.jsx)(d.Z,{})}),(0,E.jsxs)(p.Z,{sx:{py:2,px:4,textAlign:"center",m:2,width:"auto",maxWidth:345,background:"#ffffff22",backdropFilter:"blur(5px)",boxSizing:"border-box",boxShadow:"0 10px 30px -5px rgba(0,0,0,.1)",zIndex:1002},children:[(0,E.jsx)(I.Z,{sx:{width:"100%",mb:4},children:(0,E.jsx)("img",{src:S,alt:"WAN | Belleview",style:{width:"100%"}})}),(0,E.jsx)(h.Z,{variant:"body1",sx:{mb:2},children:"SIGN UP"}),ee&&(0,E.jsx)(v.Z,{severity:"error",sx:{mb:1,textAlign:"left",fontSize:12},onClose:function(){return te(null)},children:ee}),(0,E.jsxs)(b.ZP,{container:!0,spacing:2,children:[(0,E.jsx)(b.ZP,{item:!0,xs:12,md:12,children:(0,E.jsx)(g.Z,{variant:"standard",label:"Email Address",fullWidth:!0,type:"email",disabled:Q,onChange:function(e){return D((0,s.Z)((0,s.Z)({},J),{},{email:e.target.value}))}})}),(0,E.jsx)(b.ZP,{item:!0,xs:12,md:12,children:(0,E.jsxs)(j.Z,{variant:"standard",fullWidth:!0,children:[(0,E.jsx)(Z.Z,{id:"password",children:"Password"}),(0,E.jsx)(w.Z,{variant:"standard",label:"Password",labelId:"password",fullWidth:!0,type:O?"text":"password",onChange:function(e){return D((0,s.Z)((0,s.Z)({},J),{},{password:e.target.value}))},disabled:Q,endAdornment:(0,E.jsx)(y.Z,{position:"end",children:(0,E.jsx)(f.Z,{"aria-label":"toggle password visibility",onClick:function(){return U(!O)},onMouseDown:function(){return U(!O)},edge:"end",children:O?(0,E.jsx)(c.Z,{}):(0,E.jsx)(u.Z,{})})})})]})}),(0,E.jsx)(b.ZP,{item:!0,xs:12,md:12,children:(0,E.jsxs)(j.Z,{variant:"standard",fullWidth:!0,children:[(0,E.jsx)(Z.Z,{id:"ministry",children:"Ministry"}),(0,E.jsx)(N.Z,{labelId:"ministry",label:"Ministry",size:"small",sx:{fontSize:14},onChange:function(e){return D((0,s.Z)((0,s.Z)({},J),{},{ministry:e.target.value}))},children:W.map((function(e){return(0,E.jsx)(k.Z,{value:e.id,children:e.name})}))})]})}),(0,E.jsx)(b.ZP,{item:!0,xs:12,md:12,sx:{mt:2},children:(0,E.jsxs)(b.ZP,{container:!0,spacing:2,children:[(0,E.jsx)(b.ZP,{item:!0,xs:4,md:4,children:(0,E.jsx)(z.Z,{color:"primary",loadingPosition:"start",variant:"text",fullWidth:!0,disableElevation:!0,disabled:Q,onClick:function(){return t("login")},children:"Login"})}),(0,E.jsx)(b.ZP,{item:!0,xs:8,md:8,children:(0,E.jsx)(A.Z,{variant:"contained",disableElevation:!0,fullWidth:!0,onClick:ne,loading:Q,startIcon:(0,E.jsx)(x.Z,{}),sx:{background:"#00addd"},disabled:!J.email||!J.password||Q,children:"Sign up"})})]})})]})]})]})}},1871:function(e,t,n){n.r(t),n.d(t,{default:function(){return j}});var i=n(9201),s=n(3329),l=(0,i.Z)((0,s.jsx)("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}),"FavoriteBorderOutlined"),a=(0,i.Z)([(0,s.jsx)("path",{d:"M3 6.71v9.91c1.14-.41 2.31-.62 3.5-.62s2.36.21 3.5.62v-9.9C8.89 6.25 7.7 6 6.5 6c-1.22 0-2.39.24-3.5.71z",opacity:".3"},"0"),(0,s.jsx)("path",{d:"m19 .5-5 5V15l5-4.5z"},"1"),(0,s.jsx)("path",{d:"M22.47 5.2c-.47-.24-.96-.44-1.47-.61v12.03c-1.14-.41-2.31-.62-3.5-.62-1.9 0-3.78.54-5.5 1.58V5.48C10.38 4.55 8.51 4 6.5 4c-1.79 0-3.48.44-4.97 1.2-.33.16-.53.51-.53.88v12.08c0 .58.47.99 1 .99.16 0 .32-.04.48-.12C3.69 18.4 5.05 18 6.5 18c2.07 0 3.98.82 5.5 2 1.52-1.18 3.43-2 5.5-2 1.45 0 2.81.4 4.02 1.04.16.08.32.12.48.12.52 0 1-.41 1-.99V6.08c0-.37-.2-.72-.53-.88zM10 16.62C8.86 16.21 7.69 16 6.5 16s-2.36.21-3.5.62V6.71C4.11 6.24 5.28 6 6.5 6c1.2 0 2.39.25 3.5.72v9.9z"},"2")],"AutoStoriesTwoTone"),r=n(5748),o=n(2155),d=n(4361),c=n(3400),u=n(220),x=(n(2791),n(1523)),m=n(9271),f=n(113),p=n(6945),h=n(911),v=n(7659),b=n(7475),g=n(2209),j=function(e){var t,n,i,j,Z,w,y,N,k=e.user,A=e.paramsId,C=e.currentUser,M=e.handleHeart,z=e.setOpen,I=(0,m.k6)(),S=null===k||void 0===k||null===(t=k.life_verse)||void 0===t?void 0:t.split(""),P=function(){switch(null===k||void 0===k?void 0:k.ministry){case"JAM":return{gradient:"from-sky-700 via-sky-700",from:"from-sky-700",bg:f};case"VIA":return{gradient:"from-pink-600 via-pink-600",from:"from-pink-600",bg:p};case"TEAM":return{gradient:"from-yellow-600 via-yellow-600",from:"from-yellow-600",bg:v};case"ADMIN":return{gradient:"from-blue-600 via-blue-600",from:"from-blue-600",bg:h}}};return(0,s.jsxs)("section",{className:"w-full rounded-3xl relative overflow-hidden mb-4 mobile:pb-[50%] bg-sky-500 min-h-[380px]",children:[A===(null===C||void 0===C?void 0:C.uid)&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(c.Z,{className:"z-[1003] absolute top-[16px] right-[60px] bg-gray-800",onClick:function(){I.push("/"),window.location.reload()},children:(0,s.jsx)(r.Z,{className:"w-[20px] h-[20px]"})}),(0,s.jsx)(x.rU,{to:"/settings",children:(0,s.jsx)(c.Z,{className:"absolute z-[1003] top-[16px] right-[16px] bg-gray-800",children:(0,s.jsx)(o.Z,{className:"w-[20px] h-[20px]"})})})]}),(0,s.jsx)("span",{className:"absolute bottom-0 w-full h-[85%] z-[1001] bg-gradient-to-t ".concat(null===(n=P())||void 0===n?void 0:n.gradient," ")}),(0,s.jsx)("img",{src:null===(i=P())||void 0===i?void 0:i.bg,alt:"",className:"w-full ".concat("JAM"===(null===k||void 0===k?void 0:k.ministry)?"hue-rotate-15":"")}),(0,s.jsxs)("section",{className:"absolute z-[1002] w-full h-full flex flex-col top-0 left-0 items-center justify-center p-6 pt-16 box-border",children:[(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)(u.Z,{src:null===k||void 0===k?void 0:k.photoURL,className:" w-[120px] h-[120px] z-[1002] mt-[auto] saturate-[1.1]",onClick:function(){return z(!0)}}),(0,s.jsx)("label",{className:"absolute top-[80px] left-[80px] z-[1004]",htmlFor:"icon-button-file",children:(0,s.jsx)(c.Z,{color:"inherit","aria-label":"upload picture",component:"span",className:"bg-white/50",onClick:M,children:(null===k||void 0===k||null===(j=k.photoHeart)||void 0===j?void 0:j.findIndex((function(e){return e===C.uid})))>=0?(0,s.jsx)(d.Z,{color:"error",onClick:-1===(null===k||void 0===k||null===(Z=k.photoHeart)||void 0===Z?void 0:Z.findIndex((function(e){return e===C.uid})))?M:function(){return z(!0)}}):(0,s.jsx)(l,{})})})]}),(0,s.jsx)("div",{className:"font-bold text-white text-xl mt-2",children:null===k||void 0===k?void 0:k.displayName}),(0,s.jsx)("div",{className:"text-white/75 text-sm",children:null===(w=g.h.filter((function(e){return e.id===(null===k||void 0===k?void 0:k.ministry)}))[0])||void 0===w?void 0:w.name}),(0,s.jsxs)("div",{className:"w-[90%] mt-6 flex flex-row gap-4 items-center relative",children:[(0,s.jsx)(a,{className:"text-white"}),(0,s.jsx)(b.Z,{value:null===k||void 0===k||null===(y=k.life_verse)||void 0===y?void 0:y.substr(0,182),className:"w-full",size:".75rem",styles:{textAlign:"left",lineHeight:".90rem"},color:"#ffffffbf"}),(null===S||void 0===S?void 0:S.length)>182&&(0,s.jsx)("span",{className:"absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t ".concat(null===(N=P())||void 0===N?void 0:N.from," ")})]}),(null===S||void 0===S?void 0:S.length)>182&&(0,s.jsx)("button",{className:"text-xs text-white",children:"Read More"}),(0,s.jsx)("div",{className:"w-full flex-grow-1 mt-[auto]",children:A===(null===C||void 0===C?void 0:C.uid)&&(0,s.jsx)(x.rU,{to:"/edit_profile",style:{textDecoration:"none",width:"100%",flex:1},children:(0,s.jsx)("button",{className:"bg-white rounded-lg p-2 w-full font-bold text-sm place-self-end",children:"Edit Profile"})})})]})]})}},4361:function(e,t,n){var i=n(9201),s=n(3329);t.Z=(0,i.Z)((0,s.jsx)("path",{d:"m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}),"Favorite")},9849:function(e,t,n){n.d(t,{L:function(){return s}});var i=n(1217);function s(e){return(0,i.Z)("MuiListItemText",e)}var l=(0,n(5878).Z)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);t.Z=l},113:function(e,t,n){e.exports=n.p+"static/media/bg_jam.c529538b73df0d19c44e.webp"},7659:function(e,t,n){e.exports=n.p+"static/media/bg_team.73fef04fb04aa3b4caa2.webp"},6945:function(e,t,n){e.exports=n.p+"static/media/bg_via.d39133fba9b366597eaf.webp"},911:function(e,t,n){e.exports=n.p+"static/media/splash-bg.9aec96458ad56ded52d5.webp"},4246:function(e,t,n){e.exports=n.p+"static/media/WAN_LOGO.e5dfb9e940cedcae48a7.png"},9137:function(e,t,n){e.exports=n.p+"static/media/WAN_LOGO_WHITE.caf4984d60e0e25918c5.png"}}]);
//# sourceMappingURL=5884.5e8cd89d.chunk.js.map