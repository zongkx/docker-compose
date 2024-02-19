import{_ as s,c as a,o as i,a2 as t}from"./chunks/framework.CBOTroAR.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/db/QuestDB.md","filePath":"doc/db/QuestDB.md"}'),n={name:"doc/db/QuestDB.md"},e=t(`<h3 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h3><p>QuestDB 是一个面向关系列的数据库，专为时间序列和事件数据而设计.</p><p>特点: 快/兼容PostgreSQL 的 wire 协议，也兼容 InfluxDB Line 协议</p><p>用途: 基于ts的快照存储,高性能查询检索.</p><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker pull questdb/questdb</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run -p 9000:9000 \\</span></span>
<span class="line"><span> -p 9009:9009 \\</span></span>
<span class="line"><span> -p 8812:8812 \\</span></span>
<span class="line"><span> -p 9003:9003 \\</span></span>
<span class="line"><span> questdb/questdb</span></span></code></pre></div><h3 id="客户端" tabindex="-1">客户端 <a class="header-anchor" href="#客户端" aria-label="Permalink to &quot;客户端&quot;">​</a></h3><p>web console: <code>http://192.168.203.128:9000/</code></p><p>不支持dbeaver: 关键字<code>is</code>不支持</p><h3 id="java" tabindex="-1">Java <a class="header-anchor" href="#java" aria-label="Permalink to &quot;Java&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Test</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ag2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () throws SQLException, ClassNotFoundException {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Class.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;org.postgresql.Driver&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Connection connection </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DriverManager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getConnection</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;jdbc:postgresql://192.168.203.128:8812/qdb?sslmode=disable&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;admin&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;quest&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Statement stmt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> connection.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createStatement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ResultSet rs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> stmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">executeQuery</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;SELECT count(*) from TABLES&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rs.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rs.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;count&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre></div><h3 id="其它" tabindex="-1">其它 <a class="header-anchor" href="#其它" aria-label="Permalink to &quot;其它&quot;">​</a></h3><ol><li>没有类似pg的information_schema存储表信息</li></ol><p><code>TABLES</code>替代:<code>select * from TABLES</code></p><ol start="2"><li>表的元数据信息</li></ol><p><code>SELECT * from table_columns(&#39;telemetry&#39;)</code></p><h3 id="文档" tabindex="-1">文档 <a class="header-anchor" href="#文档" aria-label="Permalink to &quot;文档&quot;">​</a></h3><p><a href="https://questdb.io/docs/introduction" target="_blank" rel="noreferrer">doc</a></p>`,19),l=[e];function p(h,k,r,o,d,E){return i(),a("div",null,l)}const u=s(n,[["render",p]]);export{g as __pageData,u as default};
