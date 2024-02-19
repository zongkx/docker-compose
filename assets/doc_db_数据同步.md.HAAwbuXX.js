import{_ as a,c as e,o as t,a2 as o}from"./chunks/framework.CBOTroAR.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/db/数据同步.md","filePath":"doc/db/数据同步.md"}'),p={name:"doc/db/数据同步.md"},c=o('<p>目前已经接触到了包括 CDC/ts/snapshot 等方案实现的增量同步的功能</p><h2 id="cdc" tabindex="-1">CDC <a class="header-anchor" href="#cdc" aria-label="Permalink to &quot;CDC&quot;">​</a></h2><p><img src="https://cdn.nlark.com/yuque/0/2022/png/21561641/1646898140401-e7b08a63-736f-445f-ab47-adb0fe1ceb41.png#clientId=u2e6c874a-815d-4&amp;crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;from=paste&amp;height=176&amp;id=u52567237&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=176&amp;originWidth=794&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=20555&amp;status=done&amp;style=none&amp;taskId=u8d79fe73-2664-4d70-8cc0-16c8697695e&amp;title=&amp;width=794" alt="image.png"></p><p>拿<code>flink-cdc</code>来说,其核心在于 数据库产生的 操作log,比如<code>mysql</code>的 <code>binlog</code>,flink-cdc可以采用 <code>stream</code>模式进行持续的数据采集, 根据<code>log</code>进行区分,实现几乎无延迟的数据变更捕获. 缺点是需要相关数据库的配合.</p><p>下图是基于<code>canal</code>的常见的数据采集方案(我认为<code>flink-cdc</code>更简洁)</p><p><img src="https://cdn.nlark.com/yuque/0/2022/png/21561641/1646897965060-240559f5-2a86-48d4-adce-2cf874365fe0.png#clientId=u2e6c874a-815d-4&amp;crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;from=paste&amp;height=619&amp;id=uf079b2bc&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=619&amp;originWidth=1363&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=174120&amp;status=done&amp;style=none&amp;taskId=u071836ce-e7aa-49ea-b168-3dc648294bc&amp;title=&amp;width=1363" alt="image.png"></p><h2 id="ts" tabindex="-1">ts <a class="header-anchor" href="#ts" aria-label="Permalink to &quot;ts&quot;">​</a></h2><p>ts方案可以做到和数据库无关,需要在表中添加 ts字段,新增/修改(逻辑删除)数据时根据ts的改变进行数据捕获, 该方案更适合批处理,t+1 缺点: 流处理的成本过高,数据库压力过大</p><h2 id="snapshot" tabindex="-1">snapshot <a class="header-anchor" href="#snapshot" aria-label="Permalink to &quot;snapshot&quot;">​</a></h2><p>快照存储实际上并不局限于db, 假如我们需要对一个第三方接口进行数据变更捕获的时候,显然快照是一个不错的方案. snapshot的方案更加灵活多变,需要根据不同的<code>source</code>进行处理优化.</p><p>拿 <code>pg</code>做 snapshot来讲,我们可以利用 <code>except</code>实现快照diff,进行数据变更捕获. 当然也可以考虑使用 时序数据库存储快照</p>',11),d=[c];function i(n,s,m,r,l,h){return t(),e("div",null,d)}const f=a(p,[["render",i]]);export{_ as __pageData,f as default};
