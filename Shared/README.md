# 共用代理规则

Surge、Clash Party 与 OpenClash 共用本目录的文本规则。编辑 main 分支的对应文件，客户端在下一次更新时拉取。每行只写匹配条件，例如 `DOMAIN-SUFFIX,example.com`。这里存规则，不存机场订阅、节点、账号或密钥。

优先级是 Reject → YouTube → Google → Proxy → Direct → 中国 IP 直连 → PR-Proxy。YouTube 必须先于 Google，避免 googlevideo.com 等流量落到 Google 组。三个 PR 策略组各自选节点，节点选择由客户端独立保存。若有精确的例外，将它放入优先级更高的对应名单。

- Surge：保留现有 [General] 和 [Proxy]，用 Clients/Surge-Rules.conf 中的两个段落替换 [Proxy Group] 和 [Rule]。策略组选节点后由 Surge 定期更新外部名单。
- Clash Party：为当前订阅绑定 Clients/Clash-Party.js 作为 JavaScript 覆写。脚本保留节点及节点提供者，替换策略组和机场规则。规则列表每 6 小时检查一次。
- OpenClash：同样使用本目录的规则。AdGuard Home 的 DNS 规则与这里的连接分流独立。
