import{d as _,au as f,r as i,t as r,v as h,x as t,a4 as n,ae as k,ab as y,z as c,A as g,a6 as V,B as x,S as C,aO as u,ad as N,a1 as b,m as A,q as B}from"./zaMRx6L0.js";import{V as w}from"./DhbZxorU.js";const G={class:"login-alert_position"},S={class:"login-btn_position"},U={class:"login-btn_center"},z=_({__name:"login",setup(E){let d=f("authUserInfo");const m=B(),o=i(!1),s=i(!1),l=i(null),p=async()=>{l.value=null,s.value=!1,o.value=!0,await u().signInWithGoogle(),u().token.value&&await v(u().userInfo)},v=async e=>{const{data:a,pending:L}=await N("item",()=>$fetch(`${m.public.apiCocoaSignInAuth}`,{method:"POST",body:{token:e.value.token,uid:e.value.uid,email:e.value.email,photoURL:e.value.photoURL,phoneNumber:e.value.phoneNumber,displayName:e.value.displayName,emailVerified:e.value.emailVerified?1:0}}));if(b(a.value))l.value="システムエラーが発生しました。",s.value=!0,o.value=!1;else if(o.value=!1,!a.value.success)l.value="システムエラーが発生しました。",s.value=!0;else return d.value={token:e.value.token,permission:a.value.permission},await A("/",{replace:!0})};return(e,a)=>(r(),h("div",null,[t("div",G,[n(s)?(r(),k(w,{key:0,density:"compact",text:n(l),title:"エラー",type:"error",class:"login-alert_message"},null,8,["text"])):y("",!0)]),a[1]||(a[1]=t("div",{class:"login-logo_position"},[t("div",{class:"login-logo_center login-logo_font"}," CocoaGram ")],-1)),t("div",S,[t("div",U,[c(C,{onClick:p,size:"x-large",loading:n(o)},{prepend:g(()=>[c(V,{image:"https://api.playneko.com/file/cocoa/image/assets/image/google_g_icon.png"})]),default:g(()=>[a[0]||(a[0]=x(" Google ログイン "))]),_:1},8,["loading"])])])]))}});export{z as default};
