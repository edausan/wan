"use strict";(self.webpackChunkwan_bagtas=self.webpackChunkwan_bagtas||[]).push([[7529],{7529:function(e,t,i){i.r(t),i.d(t,{default:function(){return w}});var n=i(9439),s=i(8439),r=i(2791),l=i(9434),a=i(9271),u=i(9431),o=i(8251),d=i(8916),c=i(7621),f=i(7047),v=i(3329),h=function(){return(0,v.jsxs)(c.Z,{className:"w-full",fullWidth:!0,children:[(0,v.jsxs)("div",{className:"flex flex-row p-3 gap-3",children:[(0,v.jsx)(f.Z,{variant:"circular",width:40,height:40}),(0,v.jsx)(f.Z,{variant:"text",width:"45%"})]}),(0,v.jsx)(f.Z,{variant:"rectangular",width:"100%",height:100}),(0,v.jsxs)("div",{className:"p-3",children:[(0,v.jsx)(f.Z,{variant:"text",width:"100%"}),(0,v.jsx)(f.Z,{variant:"text",width:"55%"})]})]})},x=r.lazy((function(){return Promise.all([i.e(6010),i.e(3640),i.e(6886),i.e(2537),i.e(9953),i.e(7087),i.e(5722),i.e(8809),i.e(3194)]).then(i.bind(i,8809))})),p=function(e){var t=e.profile,i=(0,s.v0)(u.O),c=(0,l.I0)(),f=(0,l.v9)(o.F8),p=f.posts,w=f.userPosts,j=(0,l.v9)(d.YN).currentUser,g=(0,a.UO)(),m=(0,r.useState)([]),b=(0,n.Z)(m,2),S=b[0],Z=b[1];return(0,r.useEffect)((function(){}),[w,p]),(0,r.useEffect)((function(){if(t&&(null===g||void 0===g?void 0:g.id)!==j.user.uid){var e=p.filter((function(e){return e.post.uid===(null===g||void 0===g?void 0:g.id)}));console.log("OTHER POSTS",{other:e}),Z(e)}else if(t&&(null===g||void 0===g?void 0:g.id)===j.user.uid)console.log("USER POSTS",{userPosts:w}),Z(w);else{var n=p.filter((function(e){var t,n;return(null===e||void 0===e||null===(t=e.post)||void 0===t?void 0:t.uid)===(null===i||void 0===i||null===(n=i.currentUser)||void 0===n?void 0:n.uid)}));c((0,o.iD)(n)),Z(p)}}),[g]),(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("section",{className:"flex flex-col gap-3 mt-2 pb-[".concat(t?"0":"200px","] w-full"),children:S.slice().sort((function(e,t){return new Date(t.post.date_created)-new Date(e.post.date_created)})).map((function(e){return(0,v.jsx)(r.Suspense,{fallback:(0,v.jsx)(h,{}),children:(0,v.jsx)(x,{post:e})},e.id)}))})})},w=r.memo(p)}}]);
//# sourceMappingURL=7529.b803c647.chunk.js.map