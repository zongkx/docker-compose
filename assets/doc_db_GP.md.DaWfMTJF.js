import{_ as s,c as i,o as a,a2 as h}from"./chunks/framework.CBOTroAR.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/db/GP.md","filePath":"doc/db/GP.md"}'),n={name:"doc/db/GP.md"},k=h(`<p><a href="https://greenplum.docs.pivotal.io/6-0/main/index.html" target="_blank" rel="noreferrer">https://greenplum.docs.pivotal.io/6-0/main/index.html</a><a href="https://www.bookstack.cn/read/greenplum-admin_guide-6.0-zh/9ccd913ea8be24b9.md" target="_blank" rel="noreferrer">https://www.bookstack.cn/read/greenplum-admin_guide-6.0-zh/9ccd913ea8be24b9.md</a></p><h2 id="pxf访问外部数据" tabindex="-1">PXF访问外部数据 <a class="header-anchor" href="#pxf访问外部数据" aria-label="Permalink to &quot;PXF访问外部数据&quot;">​</a></h2><p><a href="https://greenplum.docs.pivotal.io/6-0/admin_guide/external/pxf-overview.html" target="_blank" rel="noreferrer">https://greenplum.docs.pivotal.io/6-0/admin_guide/external/pxf-overview.html</a></p><h2 id="分布-distributed" tabindex="-1">分布 DISTRIBUTED <a class="header-anchor" href="#分布-distributed" aria-label="Permalink to &quot;分布 DISTRIBUTED&quot;">​</a></h2><ul><li>数据分布是在物理上拆分表数据，将数据打散到各个节点，使数据可以并行计算，这在Greenplum中是必须的。</li><li>表分区是在逻辑上拆分大表的数据提高查询性能，也有利于数据生命周期的管理，这在Greenplum中是可选的。</li></ul><blockquote><p>查询各个分区数据量 select gp_segment_id,count(<em>) from tab_name group by gp_segment_id order by count(</em>) desc</p></blockquote><blockquote><p>调整分区字段 alter table tab_name set distributed by (字段，字段);</p></blockquote><blockquote><p>create table 选择随机分区字段 CREATE TABLE zkx ( id varchar(200), name varchar(200) ) DISTRIBUTED RANDOMLY;</p></blockquote><h2 id="分区-partition" tabindex="-1">分区 partition <a class="header-anchor" href="#分区-partition" aria-label="Permalink to &quot;分区 partition&quot;">​</a></h2><h3 id="什么时候使用分区表" tabindex="-1">什么时候使用分区表 <a class="header-anchor" href="#什么时候使用分区表" aria-label="Permalink to &quot;什么时候使用分区表&quot;">​</a></h3><p>是否使用分区表，可以通过以下几个方面进行考虑：</p><ul><li><strong>表数据量是否足够大</strong>：通常对于大的事实表，比如数据量有几千万或者过亿，我们可以考虑使用分区表，但数据量大小并没有一个绝对的标准可以使用，一般是根据经验，以及对目前性能是否满意。</li><li><strong>表是否有合适的分区字段</strong>：如果数据量足够大了，这个时候我们就需要看下是否有合适的字段能够用来分区，通常如果数据有时间维度，比如按天，按月等，是比较理想的分区字段。</li><li><strong>表内数据是否具有生命周期</strong>：通常数仓中的数据不可能一直存放，一般都会有一定的生命周期，比如最近一年等，这里就涉及到对旧数据的管理，如果有分区表，就很容易删除旧的数据，或者将旧的数据归档到<a href="https://cloud.tencent.com/product/cos?from=10680" target="_blank" rel="noreferrer">对象存储</a>等更为廉价的存储介质上。</li><li><strong>查询语句中是否含有分区字段</strong>：如果你对一个表做了分区，但是所有的查询都不带分区字段，这不仅无法提高性能反而会使性能下降，因为所有的查询都会扫描所有的分区表。</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CREATE TABLE test_range_partition_every_1 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    uid </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    fdate date</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">partition by </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (fdate) </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    PARTITION pn </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">START</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;2018-11-01&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">date) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">END</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;2018-12-01&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">date) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">EVERY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1 day&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">interval), </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    DEFAULT PARTITION pdefault</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h2 id="heap-ao" tabindex="-1">Heap / AO <a class="header-anchor" href="#heap-ao" aria-label="Permalink to &quot;Heap / AO&quot;">​</a></h2><ul><li>Heap 表：这种存储格式是从 PostgreSQL 继承而来的，目前是 GP 默认的表存储格式，只支持行存储。</li><li>AO 表： AO 表最初设计是只支持 append 的（就是只能 insert ），因此全称是Append-Only，在4.3之后进行了优化，目前已经可以 update 和 delete 了，全称也改为 Append-Optimized。AO 支持行存储（AORO）和列存储（AOCO）。</li></ul><h3 id="heap" tabindex="-1">heap <a class="header-anchor" href="#heap" aria-label="Permalink to &quot;heap&quot;">​</a></h3><p>Heap 表是从 PostgreSQL 继承而来，使用 MVCC 来实现一致性。如果你在创建表的时候没有指定任何存储格式，那么 GP 就会使用 Heap 表。 Heap 表支持分区表，只支持行存，不支持列存和压缩。需要注意的是在处理 update 和 delete 的时候，Heap 表并没有真正删除数据，而只是依靠 version 信息屏蔽老的数据，因此如果你的表有大量的 update 或者 delete，表占用的物理空间会不断增大，这个时候需要依靠 vacuum 来清理老数据。 Heap 表不支持逻辑增量备份，因此如果要对 Heap 表做快照，每次都需要导出全量数据。</p><ul><li><em>如果该表是一张小表，比如数仓中的维度表，或者数据量在百万以下，推荐使用 Heap 表。</em></li><li><em>如果该表的使用场景是 OLTP 的，比如有较多的 update 和 delete，查询多是带索引的点查询等，推荐使用 Heap 表。</em></li></ul><h3 id="ao" tabindex="-1">AO <a class="header-anchor" href="#ao" aria-label="Permalink to &quot;AO&quot;">​</a></h3><p>对于有大量 update 和 delete 的 AO 表，同样需要 vacuum 进行维护，不过在 AO 表中， vacuum 需要对 bitmap 进行重置并压缩物理文件，因此通常比 Heap 的 vacuum 要慢。</p><p><img src="https://gitee.com/zongkx/pic-go/raw/master/202211111558123.png" alt=""></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> zkx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  dt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  appendonly </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> true,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ORIENTATION  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> column,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  COMPRESSTYPE </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  RLE_TYPE,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  COMPRESSLEVEL </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">DISTRIBUTED</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> BY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (dt);</span></span></code></pre></div><h3 id="修改表的存储模型" tabindex="-1">修改表的存储模型 <a class="header-anchor" href="#修改表的存储模型" aria-label="Permalink to &quot;修改表的存储模型&quot;">​</a></h3><p>表存储、压缩和行列类型只能在创建时声明。 要改变存储模型，用户必须用正确的存储选项创建一个表，再把原始表的数据载入到新表中，接着删除原始表并且把新表重命名为原始表的名称。 用户还必须重新授权原始表上有的权限。例如：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sales2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">LIKE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sales) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WITH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (appendoptimized</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">true, compresstype</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">quicklz,   </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                                       compresslevel</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, orientation</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">column);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INSERT INTO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sales2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sales;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">DROP</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sales;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ALTER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sales2 RENAME </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sales;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">GRANT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ALL PRIVILEGES </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sales </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TO</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> admin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">GRANT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sales </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> guest;</span></span></code></pre></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h3><h2 id="常用的sql" tabindex="-1">常用的sql <a class="header-anchor" href="#常用的sql" aria-label="Permalink to &quot;常用的sql&quot;">​</a></h2><h3 id="表结构化信息" tabindex="-1">表结构化信息 <a class="header-anchor" href="#表结构化信息" aria-label="Permalink to &quot;表结构化信息&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attrelid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> attrelid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">table_name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> table_name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> column_name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ,</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">format_type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">atttypid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">atttypmod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> data_type</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">description</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> description</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attnum</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attnotnull</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> notnull</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">coalesce</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">indisprimary</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, FALSE) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> primary_key</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">f</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">adsrc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> default_val</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pg_attribute a</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">LEFT JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pg_index p                  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">indrelid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attrelid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AND</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attnum</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ANY(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">indkey</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">LEFT JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pg_description d            </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">objoid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attrelid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AND</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">objsubid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attnum</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">LEFT JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pg_attrdef f                </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> f</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">adrelid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attrelid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AND</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> f</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">adnum</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attnum</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">LEFT JOIN</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> information_schema</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TABLES</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TABLE_SCHEMA</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;dcm_crm&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AND</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attrelid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">table_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::regclass </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">--表名转为oid</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WHERE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attnum</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AND</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> NOT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attisdropped</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AND</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">table_name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;null&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">and</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">table_name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> not</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> like</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;%prt%&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ORDER BY</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">attrelid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h3 id="kill-query" tabindex="-1">kill query <a class="header-anchor" href="#kill-query" aria-label="Permalink to &quot;kill query&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pg_locks </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> relation </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;dcm_ysm.&quot;AllOrderBill&quot;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::regclass::</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">oid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pg_stat_activity </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WHERE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> state</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;active&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- 39249 63412</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pg_cancel_backend(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">39249</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pg_terminate_backend(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">39249</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pid , query, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pg_stat_activity</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  WHERE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> state</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;idle&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> xact_start;</span></span></code></pre></div>`,31),l=[k];function t(p,e,E,r,d,g){return a(),i("div",null,l)}const c=s(n,[["render",t]]);export{F as __pageData,c as default};
