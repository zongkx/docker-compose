import{_ as e,c as o,o as n,a2 as a}from"./chunks/framework.CBOTroAR.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/ops/Jenkins-安装.md","filePath":"doc/ops/Jenkins-安装.md"}'),t={name:"doc/ops/Jenkins-安装.md"},r=a('<h2 id="docker部署" tabindex="-1">docker部署 <a class="header-anchor" href="#docker部署" aria-label="Permalink to &quot;docker部署&quot;">​</a></h2><p><code>docker pull jenkins</code></p><p><code>docker run -u root -d -p 8080:8080 -p 50000:50000 -v jenkins-data:/var/jenkins_home jenkins</code></p><p><a href="https://www.jenkins.io/zh/doc/book/installing/" target="_blank" rel="noreferrer">参考</a></p><p>admin密码:</p><p><code>docker exec -u 0 -it b3f6901172a5 /bin/bash</code></p><p><code>cat /var/jenkins_home/secrets/initialAdminPassword</code></p>',7),c=[r];function s(d,i,_,p,k,l){return n(),o("div",null,c)}const f=e(t,[["render",s]]);export{m as __pageData,f as default};
