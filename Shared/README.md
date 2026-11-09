# 共用代理规则

在 main 分支编辑这里的文本名单。客户端定期拉取名单，节点在各客户端独立选择。

自定义规则按 Reject → GlobalMedia → GlobalSearch → Proxy → Direct 匹配，随后进入原订阅规则。原订阅的策略组、规则及兜底保留。Global Media 和 Global Search 可加入其他同类网站。共享域名按靠前的规则归类。

- Surge：把 Clients/Surge-Rules.conf 的内容分别插入原有的 Proxy Group 和 Rule 段。保留原订阅引用，将自定义规则写在 Rule 段的原订阅引用之前。
- Clash Party：把 Clients/Clash-Party.js 绑定为现有订阅的 JavaScript 覆写。
- OpenClash：在生成运行配置时把共用规则插到原订阅规则之前。
