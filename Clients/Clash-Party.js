function main(config) {
  const base = "https://raw.githubusercontent.com/Prowinter/ProxyRuleSet/main/Shared";
  const groups = [
    ["PR-Google", /香港/],
    ["PR-YouTube", /日本/],
    ["PR-Proxy", /香港/],
  ];
  const names = (config.proxies || []).map(proxy => proxy.name)
    .filter(name => !/套餐|订阅|流量|重置|到期|官网|公告/.test(name));
  const providers = Object.keys(config["proxy-providers"] || {});
  if (!names.length && !providers.length) {
    throw new Error("The selected profile has no usable proxy nodes");
  }

  config["proxy-groups"] = groups.map(([name, preferred]) => {
    const ordered = names.filter(node => preferred.test(node))
      .concat(names.filter(node => !preferred.test(node)));
    const group = {name, type: "select"};
    if (ordered.length) group.proxies = ordered;
    if (providers.length) group.use = providers;
    return group;
  });
  config["rule-providers"] = {};
  for (const set of ["Reject", "YouTube", "Google", "Proxy", "Direct"]) {
    config["rule-providers"]["pr-" + set.toLowerCase()] = {
      type: "http", behavior: "classical", format: "text",
      url: base + "/" + set + ".list", path: "./rule_provider/pr-" + set.toLowerCase() + ".list",
      interval: 21600, proxy: "PR-Proxy",
    };
  }
  config.rules = [
    "RULE-SET,pr-reject,REJECT",
    "RULE-SET,pr-youtube,PR-YouTube",
    "RULE-SET,pr-google,PR-Google",
    "RULE-SET,pr-proxy,PR-Proxy",
    "RULE-SET,pr-direct,DIRECT",
    "GEOIP,CN,DIRECT",
    "MATCH,PR-Proxy",
  ];
  return config;
}
