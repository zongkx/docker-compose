import{_ as e,c as o,o as a,a4 as t}from"./chunks/framework.JVJExM9n.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/ops/Docker-常用指令.md","filePath":"doc/ops/Docker-常用指令.md"}'),r={name:"doc/ops/Docker-常用指令.md"},c=t(`<h2 id="build" tabindex="-1">build <a class="header-anchor" href="#build" aria-label="Permalink to &quot;build&quot;">​</a></h2><blockquote><p>docker build -t my/demoapp .</p></blockquote><h2 id="exec" tabindex="-1">exec <a class="header-anchor" href="#exec" aria-label="Permalink to &quot;exec&quot;">​</a></h2><blockquote><p>docker exec -it {} /bin/bash</p></blockquote><h2 id="log" tabindex="-1">log <a class="header-anchor" href="#log" aria-label="Permalink to &quot;log&quot;">​</a></h2><blockquote><p>docker logs -f {}</p></blockquote><h2 id="run" tabindex="-1">run <a class="header-anchor" href="#run" aria-label="Permalink to &quot;run&quot;">​</a></h2><blockquote><p>docker run -d -p 8081:8081 -p 9999:9999 my/demoapp</p></blockquote><pre><code>-p: 指定端口映射，格式为：主机(宿主)端口:容器端口
-d: 后台运行容器，并返回容器ID；
-t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
-i: 以交互模式运行容器，通常与 -t 同时使用；
</code></pre><blockquote><p>docker run -d -p 8080:8080 -e PARAMS=&quot;--server.port=8080&quot; my/demoapp</p></blockquote><h2 id="clean" tabindex="-1">clean <a class="header-anchor" href="#clean" aria-label="Permalink to &quot;clean&quot;">​</a></h2><blockquote><p>docker rmi $(docker images -q -f dangling=true)</p></blockquote><h2 id="push" tabindex="-1">push <a class="header-anchor" href="#push" aria-label="Permalink to &quot;push&quot;">​</a></h2><ol><li>docker login **.com 输入账号密码</li><li>docker tag my/demoapp **.com/my/demoapp:1.0</li><li>docker push **.com/my/demoapp:1.0</li></ol>`,14),l=[c];function d(i,n,p,u,s,h){return a(),o("div",null,l)}const _=e(r,[["render",d]]);export{m as __pageData,_ as default};
