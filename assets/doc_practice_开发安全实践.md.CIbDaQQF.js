import{_ as l,c as t,o as i,a2 as e}from"./chunks/framework.CBOTroAR.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/practice/开发安全实践.md","filePath":"doc/practice/开发安全实践.md"}'),p={name:"doc/practice/开发安全实践.md"},_=e("<ul><li>接口交互</li></ul><p>接口开发应该注意鉴权,加密等操作,部分数据需要进行脱密,</p><ul><li>参数校验</li></ul><p>管理系统等接口开发,需要注意接口参数校验,从根源上避免非法参数对系统的入侵,比如sql注入等</p><ul><li>框架等第三方库</li></ul><p>尽量使用安全稳定可靠的第三方库,积极关注安全事件,如果发生安全事件漏洞,及时升级或者使用替换方案</p><ul><li>github等开源</li></ul><p>github 提交代码一定要检查是否包含密码等重要数据</p><ul><li>文档</li></ul><p>提供给其它系统或者伙伴的sdk文档/接口文档,文档内容注意脱密</p><ul><li>公司数据库等密码信息</li></ul><p>杜绝公司内部数据库等密码信息上传至其它公有云平台,本地存储或者公司内部云文档或者git等存储数据库密码信息</p><ul><li>ops堡垒机</li></ul><p>通过堡垒机连接公司服务器使用,避免出现安全风险</p><ul><li>邮件等外部信息</li></ul><p>提高警惕,防止邮件等诈骗信息对公司内网的入侵</p><ul><li>使用正版软件</li></ul><p>避免使用破解软件,为公司带来安全或法律风险</p>",18),c=[_];function a(o,u,s,r,n,d){return i(),t("div",null,c)}const h=l(p,[["render",a]]);export{f as __pageData,h as default};
