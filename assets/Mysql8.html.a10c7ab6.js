import{_ as t,o as c,c as o,b as n,d as e,F as p,e as s,a as l,r as u}from"./app.d740ecc1.js";const i={},r=n("h2",{id:"window-function",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#window-function","aria-hidden":"true"},"#"),s(" Window Function")],-1),k={href:"https://baijiahao.baidu.com/s?id=1728966619393719484&wfr=spider&for=pc",target:"_blank",rel:"noopener noreferrer"},d=s("https://baijiahao.baidu.com/s?id=1728966619393719484&wfr=spider&for=pc"),_=l(`<p>\u7C7B\u6BD4oracle\u7684 ROW_NUMBER() PARTITION BY,\u5206\u7EC4\u540E\u6392\u5E8F</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>   <span class="token class-name">SELECT</span> stu_id<span class="token punctuation">,</span>name<span class="token punctuation">,</span>subject<span class="token punctuation">,</span>score<span class="token punctuation">,</span>
    <span class="token function">ROW_NUMBER</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token constant">OVER</span> <span class="token punctuation">(</span><span class="token constant">PARTITION</span> <span class="token constant">BY</span> subject <span class="token constant">ORDER</span> <span class="token constant">BY</span> score <span class="token constant">DESC</span><span class="token punctuation">)</span> <span class="token class-name">AS</span> <span class="token constant">ROW_NUM</span><span class="token punctuation">,</span>
    <span class="token function">DENSE_RANK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token constant">OVER</span> <span class="token punctuation">(</span><span class="token constant">PARTITION</span> <span class="token constant">BY</span> subject <span class="token constant">ORDER</span> <span class="token constant">BY</span> score <span class="token constant">DESC</span><span class="token punctuation">)</span> <span class="token class-name">AS</span> <span class="token constant">DENSE_RK</span><span class="token punctuation">,</span>
    <span class="token function">RANK</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token constant">OVER</span> <span class="token punctuation">(</span><span class="token constant">PARTITION</span> <span class="token constant">BY</span> subject <span class="token constant">ORDER</span> <span class="token constant">BY</span> score <span class="token constant">DESC</span><span class="token punctuation">)</span> <span class="token constant">AS</span> <span class="token constant">RK</span>
   <span class="token constant">FROM</span> tb_score ts <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,2);function b(m,R){const a=u("ExternalLinkIcon");return c(),o(p,null,[r,n("blockquote",null,[n("p",null,[n("a",k,[d,e(a)])])]),_],64)}var f=t(i,[["render",b],["__file","Mysql8.html.vue"]]);export{f as default};
