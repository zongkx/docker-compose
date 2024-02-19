import{_ as s,c as a,o as i,a2 as n}from"./chunks/framework.CBOTroAR.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/java/JdbcTemplate.md","filePath":"doc/java/JdbcTemplate.md"}'),t={name:"doc/java/JdbcTemplate.md"},p=n(`<h2 id="key转换为大写-小写" tabindex="-1">key转换为大写/小写 <a class="header-anchor" href="#key转换为大写-小写" aria-label="Permalink to &quot;key转换为大写/小写&quot;">​</a></h2><p>重写ColumnMapRowMapper</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TestInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(TestInstance.Lifecycle.PER_CLASS)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> JdbcTests</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    JdbcTemplate jdbcTemplate </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> JdbcTemplate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">BeforeAll</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> before</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        MysqlDataSource dataSource </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MysqlDataSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        dataSource.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setPort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3306</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        dataSource.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setUser</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;root&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        dataSource.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setPassword</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;@@@@@&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        dataSource.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setServerName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;39.97.243.43&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        jdbcTemplate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setDataSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(dataSource);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Test</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SneakyThrows</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> a1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        String sql </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;select * from test.demo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        List&lt;Map&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt; query </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> jdbcTemplate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">query</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sql, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ColumnMapRowMapper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            protected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getColumnKey</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">columnName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> columnName.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toUpperCase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(query);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="queryforsteam-使用-数据库连接池的超时的问题" tabindex="-1">QueryForSteam 使用 数据库连接池的超时的问题 <a class="header-anchor" href="#queryforsteam-使用-数据库连接池的超时的问题" aria-label="Permalink to &quot;QueryForSteam 使用 数据库连接池的超时的问题&quot;">​</a></h2><blockquote><p><a href="https://blog.csdn.net/u010916254/article/details/127091549" target="_blank" rel="noreferrer">https://blog.csdn.net/u010916254/article/details/127091549</a></p></blockquote><p>stream 模式需要显示关闭，否则会造成链接不能释放，链接池会满了，之后就不能使用了，参考内部处理</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Override</span></span>
<span class="line"><span>	public &lt;T&gt; Stream&lt;T&gt; queryForStream(String sql, RowMapper&lt;T&gt; rowMapper) throws DataAccessException {</span></span>
<span class="line"><span>		class StreamStatementCallback implements StatementCallback&lt;Stream&lt;T&gt;&gt;, SqlProvider {</span></span>
<span class="line"><span>			@Override</span></span>
<span class="line"><span>			public Stream&lt;T&gt; doInStatement(Statement stmt) throws SQLException {</span></span>
<span class="line"><span>				ResultSet rs = stmt.executeQuery(sql);</span></span>
<span class="line"><span>				Connection con = stmt.getConnection();</span></span>
<span class="line"><span>				return new ResultSetSpliterator&lt;&gt;(rs, rowMapper).stream().onClose(() -&gt; {</span></span>
<span class="line"><span>					JdbcUtils.closeResultSet(rs);</span></span>
<span class="line"><span>					JdbcUtils.closeStatement(stmt);</span></span>
<span class="line"><span>					DataSourceUtils.releaseConnection(con, getDataSource());</span></span>
<span class="line"><span>				});</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>			@Override</span></span>
<span class="line"><span>			public String getSql() {</span></span>
<span class="line"><span>				return sql;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		return result(execute(new StreamStatementCallback(), false));</span></span>
<span class="line"><span>	}</span></span></code></pre></div><p>对于stream 进行释放处理，可以声明式关闭或者使用try resource 模式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>try(Stream&lt;Conf&gt; streamB = jdbcTemplate.queryForStream(</span></span>
<span class="line"><span>     &quot;select * from sys.sys_config&quot;, new BeanPropertyRowMapper&lt;&gt;(Conf.class))){</span></span>
<span class="line"><span>     System.out.println(streamB.findFirst().get().toString());</span></span>
<span class="line"><span>     return &quot;ok&quot;;</span></span>
<span class="line"><span>  }</span></span></code></pre></div>`,9),e=[p];function l(h,k,r,E,c,d){return i(),a("div",null,e)}const y=s(t,[["render",l]]);export{g as __pageData,y as default};
