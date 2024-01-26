import{_ as g,L as _,s as p,q as y,c as f,d as t,f as d,w as l,e as a,t as r,n as C,r as u,o as m}from"./index-3X6NywY1.js";const k={name:"detail",data:()=>({record:null,loading:!0,category:null}),components:{Loader:_},mounted(){p(this.$route.params.id).then(e=>{if(!e.data){this.$router.push("/not-found-page");return}const s=e.data,o=this.$store.getters.getCategories.find(n=>n.id===e.data.categoryId)||null;this.record={...s,categoryName:o.title,typeClass:s.type==="outcome"?"red":"green",typeText:s.type==="outcome"?"Outcome":"Income"}}).catch(e=>{console.log("Error",e)}).finally(()=>{this.loading=!1})},methods:{formatCurrency(e){return typeof e=="number"?e.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"):""},dateFormat(e,s){const o={};return s.includes("date")&&(o.day="2-digit",o.month="long",o.year="numeric"),s.includes("time")&&(o.hour="2-digit",o.minute="2-digit",o.second="2-digit"),new Intl.DateTimeFormat("en-En",o).format(new Date(e))}}},w={key:1},b={class:"breadcrumb","aria-label":"breadcrumbs"},$={class:"is-active"},v={class:"is-size-5"},D=t("strong",{class:"white"},"Description: ",-1),N={class:"is-size-5"},z=t("strong",{class:"white"},"Sum: ",-1),B={class:"is-size-5 mb-4"},F=t("strong",{class:"white"},"Category: ",-1);function I(e,s,o,n,L,i){const h=u("Loader"),c=u("router-link");return e.loading?(m(),y(h,{key:0})):(m(),f("div",w,[t("nav",b,[t("ul",null,[t("li",null,[d(c,{to:"/history"},{default:l(()=>[a(" History ")]),_:1})]),t("li",$,[d(c,{to:"#","aria-current":"page"},{default:l(()=>[a(r(e.record.typeText),1)]),_:1})])])]),t("div",{class:C(["detail-block white",e.record.typeClass])},[t("h5",v,[D,a(" "+r(e.record.description),1)]),t("h5",N,[z,a(" "+r(i.formatCurrency(+e.record.amount))+" UAH ",1)]),t("h5",B,[F,a(" "+r(e.record.categoryName),1)]),t("small",null,r(i.dateFormat(e.record.date,"datetime")),1)],2)]))}const E=g(k,[["render",I]]);export{E as default};