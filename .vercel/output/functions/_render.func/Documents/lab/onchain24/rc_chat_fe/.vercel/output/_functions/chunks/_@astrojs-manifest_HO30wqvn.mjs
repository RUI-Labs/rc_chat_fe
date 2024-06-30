import 'cookie';
import { b as bold, r as red, y as yellow, d as dim, a as blue } from './astro/server_BtvYfb51.mjs';
import 'clsx';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.11.3_sass@1.77.6_typescript@5.5.2/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BcFN_gqt.js"}],"styles":[{"type":"external","src":"/_astro/overlayscrollbars.DeHy3ZkO.css"},{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/admin/chat","isIndex":false,"type":"page","pattern":"^\\/admin\\/chat\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/chat.astro","pathname":"/admin/chat","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Bwvswh3d.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/admin/login","isIndex":false,"type":"page","pattern":"^\\/admin\\/login\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/login.astro","pathname":"/admin/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CBYC2X4a.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/admin/project/[id]/campaign/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/project\\/([^/]+?)\\/campaign\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"project","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"campaign","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id","id"],"component":"src/pages/admin/project/[id]/campaign/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CBYC2X4a.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/admin/project/[id]/users","isIndex":false,"type":"page","pattern":"^\\/admin\\/project\\/([^/]+?)\\/users\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"project","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"users","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/admin/project/[id]/users.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CBYC2X4a.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/admin/project/[id]","isIndex":true,"type":"page","pattern":"^\\/admin\\/project\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"project","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/project/[id]/index.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CBYC2X4a.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/admin/users","isIndex":false,"type":"page","pattern":"^\\/admin\\/users\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/users.astro","pathname":"/admin/users","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CBYC2X4a.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/campaigns.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/campaigns\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"campaigns.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/campaigns.json.ts","pathname":"/api/campaigns.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contactbook.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contactbook\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contactbook.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contactbook.json.ts","pathname":"/api/contactbook.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/keys.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/keys\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keys.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/keys.json.ts","pathname":"/api/keys.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/logout.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/logout\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"logout.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/logout.json.ts","pathname":"/api/logout.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/logs.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/logs\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"logs.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/logs.json.ts","pathname":"/api/logs.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/nonce.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/nonce\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"nonce.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/nonce.json.ts","pathname":"/api/nonce.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/project/[project].json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/project\\/([^/]+?)\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"project","dynamic":false,"spread":false}],[{"content":"project","dynamic":true,"spread":false},{"content":".json","dynamic":false,"spread":false}]],"params":["project"],"component":"src/pages/api/project/[project].json.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/projects/[id]/campaigns.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/projects\\/([^/]+?)\\/campaigns\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"projects","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"campaigns.json","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/api/projects/[id]/campaigns.json.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/projects/[id]/users.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/projects\\/([^/]+?)\\/users\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"projects","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"users.json","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/api/projects/[id]/users.json.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/projects.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/projects\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"projects.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/projects.json.ts","pathname":"/api/projects.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/token.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/token\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"token.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/token.json.ts","pathname":"/api/token.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/uploadstamp.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/uploadstamp\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"uploadstamp.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/uploadstamp.json.ts","pathname":"/api/uploadstamp.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/verify.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/verify\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"verify.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/verify.json.ts","pathname":"/api/verify.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/wallet/[wallet].json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/wallet\\/([^/]+?)\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"wallet","dynamic":false,"spread":false}],[{"content":"wallet","dynamic":true,"spread":false},{"content":".json","dynamic":false,"spread":false}]],"params":["wallet"],"component":"src/pages/api/wallet/[wallet].json.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BEAJmhbj.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/campaign","isIndex":false,"type":"page","pattern":"^\\/campaign\\/?$","segments":[[{"content":"campaign","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/campaign.astro","pathname":"/campaign","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b7VjStS6.js"}],"styles":[],"routeData":{"route":"/chat","isIndex":false,"type":"page","pattern":"^\\/chat\\/?$","segments":[[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/chat.astro","pathname":"/chat","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.YohHOKX_.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/new","isIndex":false,"type":"page","pattern":"^\\/new\\/?$","segments":[[{"content":"new","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/new.astro","pathname":"/new","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BEAJmhbj.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/project/[project]","isIndex":false,"type":"page","pattern":"^\\/project\\/([^/]+?)\\/?$","segments":[[{"content":"project","dynamic":false,"spread":false}],[{"content":"project","dynamic":true,"spread":false}]],"params":["project"],"component":"src/pages/project/[project].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BEAJmhbj.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"}],"routeData":{"route":"/project","isIndex":false,"type":"page","pattern":"^\\/project\\/?$","segments":[[{"content":"project","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/project.astro","pathname":"/project","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.WeLJYjS2.js"}],"styles":[{"type":"external","src":"/_astro/chat.C7ysgT5A.css"},{"type":"inline","content":".chat-parent[data-v-9a8e9842]{background:#fff}.chat[data-v-9a8e9842]{display:flex;flex-direction:column;padding:10px}.messages[data-v-9a8e9842]{margin-top:30px;display:flex;flex-direction:column}.message[data-v-9a8e9842]{border-radius:20px;padding:8px 15px;margin-top:5px;margin-bottom:5px;display:inline-block;font-size:large;font-family:Sora,serif;font-weight:600}.yours[data-v-9a8e9842]{align-items:flex-start}.yours .message[data-v-9a8e9842]{margin-right:25%;background-color:#f7e1f2;color:#ff22cb;position:relative}.yours .message.last[data-v-9a8e9842]:before{content:\"\";position:absolute;z-index:0;bottom:0;left:-7px;height:20px;width:20px;background-color:#f7e1f2;border-bottom-right-radius:15px}.yours .message.last[data-v-9a8e9842]:after{content:\"\";position:absolute;z-index:1;bottom:0;left:-10px;width:10px;height:20px;background:#fff;border-bottom-right-radius:10px}.mine[data-v-9a8e9842]{align-items:flex-end}.mine .message[data-v-9a8e9842]{color:#eae9ff;margin-left:25%;background:#5750e9;background-attachment:fixed;position:relative}.mine .message.last[data-v-9a8e9842]:before{content:\"\";position:absolute;z-index:0;bottom:0;right:-8px;height:20px;width:20px;background:#5750e9;background-attachment:fixed;border-bottom-left-radius:15px}.mine .message.last[data-v-9a8e9842]:after{content:\"\";position:absolute;z-index:1;bottom:0;right:-10px;width:10px;height:20px;background:#fff;border-bottom-left-radius:10px}\n"},{"type":"external","src":"/_astro/overlayscrollbars.DeHy3ZkO.css"}],"routeData":{"route":"/project_1/[project]","isIndex":false,"type":"page","pattern":"^\\/project_1\\/([^/]+?)\\/?$","segments":[[{"content":"project_1","dynamic":false,"spread":false}],[{"content":"project","dynamic":true,"spread":false}]],"params":["project"],"component":"src/pages/project_1/[project].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/chat.astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/login.astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/project/[id]/campaign/[id].astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/project/[id]/index.astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/project/[id]/users.astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/admin/users.astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/campaign.astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/project.astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/project/[project].astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/chat.astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/new.astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/project_1/[project].astro",{"propagation":"none","containsHead":true}],["/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.11.3_sass@1.77.6_typescript@5.5.2/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin/chat@_@astro":"pages/admin/chat.astro.mjs","\u0000@astro-page:src/pages/admin/login@_@astro":"pages/admin/login.astro.mjs","\u0000@astro-page:src/pages/admin/project/[id]/campaign/[id]@_@astro":"pages/admin/project/_id_/campaign/_id_.astro.mjs","\u0000@astro-page:src/pages/admin/project/[id]/users@_@astro":"pages/admin/project/_id_/users.astro.mjs","\u0000@astro-page:src/pages/admin/project/[id]/index@_@astro":"pages/admin/project/_id_.astro.mjs","\u0000@astro-page:src/pages/admin/users@_@astro":"pages/admin/users.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/campaigns.json@_@ts":"pages/api/campaigns.json.astro.mjs","\u0000@astro-page:src/pages/api/contactbook.json@_@ts":"pages/api/contactbook.json.astro.mjs","\u0000@astro-page:src/pages/api/keys.json@_@ts":"pages/api/keys.json.astro.mjs","\u0000@astro-page:src/pages/api/logout.json@_@ts":"pages/api/logout.json.astro.mjs","\u0000@astro-page:src/pages/api/logs.json@_@ts":"pages/api/logs.json.astro.mjs","\u0000@astro-page:src/pages/api/nonce.json@_@ts":"pages/api/nonce.json.astro.mjs","\u0000@astro-page:src/pages/api/project/[project].json@_@ts":"pages/api/project/_project_.json.astro.mjs","\u0000@astro-page:src/pages/api/projects/[id]/campaigns.json@_@ts":"pages/api/projects/_id_/campaigns.json.astro.mjs","\u0000@astro-page:src/pages/api/projects/[id]/users.json@_@ts":"pages/api/projects/_id_/users.json.astro.mjs","\u0000@astro-page:src/pages/api/projects.json@_@ts":"pages/api/projects.json.astro.mjs","\u0000@astro-page:src/pages/api/token.json@_@ts":"pages/api/token.json.astro.mjs","\u0000@astro-page:src/pages/api/uploadstamp.json@_@ts":"pages/api/uploadstamp.json.astro.mjs","\u0000@astro-page:src/pages/api/verify.json@_@ts":"pages/api/verify.json.astro.mjs","\u0000@astro-page:src/pages/api/wallet/[wallet].json@_@ts":"pages/api/wallet/_wallet_.json.astro.mjs","\u0000@astro-page:src/pages/campaign@_@astro":"pages/campaign.astro.mjs","\u0000@astro-page:src/pages/chat@_@astro":"pages/chat.astro.mjs","\u0000@astro-page:src/pages/new@_@astro":"pages/new.astro.mjs","\u0000@astro-page:src/pages/project/[project]@_@astro":"pages/project/_project_.astro.mjs","\u0000@astro-page:src/pages/project@_@astro":"pages/project.astro.mjs","\u0000@astro-page:src/pages/project_1/[project]@_@astro":"pages/project_1/_project_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/node_modules/.pnpm/astro@4.11.3_sass@1.77.6_typescript@5.5.2/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/node_modules/.pnpm/astro@4.11.3_sass@1.77.6_typescript@5.5.2/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_DiWS4r4A.mjs","/src/pages/admin/chat.astro":"chunks/chat_ByBZ4lwX.mjs","/src/pages/admin/login.astro":"chunks/login__fCe_4eV.mjs","/src/pages/admin/project/[id]/campaign/[id].astro":"chunks/_id__BDA8vUse.mjs","/src/pages/admin/project/[id]/users.astro":"chunks/users_8I4l4dOi.mjs","/src/pages/admin/project/[id]/index.astro":"chunks/index_BeyCQXDi.mjs","/src/pages/admin/users.astro":"chunks/users_Ud0KQKSt.mjs","/src/pages/admin/index.astro":"chunks/index_IwG-ylON.mjs","/src/pages/api/campaigns.json.ts":"chunks/campaigns.json_BJocIQ8C.mjs","/src/pages/api/contactbook.json.ts":"chunks/contactbook.json_CqqYTM47.mjs","/src/pages/api/keys.json.ts":"chunks/keys.json_Duus0oEB.mjs","/src/pages/api/logout.json.ts":"chunks/logout.json_B7NixaWM.mjs","/src/pages/api/logs.json.ts":"chunks/logs.json_D9-GGctY.mjs","/src/pages/api/nonce.json.ts":"chunks/nonce.json_ZnujOli8.mjs","/src/pages/api/project/[project].json.ts":"chunks/_project_.json_UkjKz_6N.mjs","/src/pages/api/projects/[id]/campaigns.json.ts":"chunks/campaigns.json_DNH6uz4W.mjs","/src/pages/api/projects/[id]/users.json.ts":"chunks/users.json_DNH6uz4W.mjs","/src/pages/api/projects.json.ts":"chunks/projects.json_DiXvvUXy.mjs","/src/pages/api/token.json.ts":"chunks/token.json_DLv5U8nL.mjs","/src/pages/api/uploadstamp.json.ts":"chunks/uploadstamp.json_SQatOzOy.mjs","/src/pages/api/verify.json.ts":"chunks/verify.json_C11PGbyW.mjs","/src/pages/api/wallet/[wallet].json.ts":"chunks/_wallet_.json_DYXn-WLr.mjs","/src/pages/campaign.astro":"chunks/campaign_Cx3fvLgD.mjs","/src/pages/chat.astro":"chunks/chat_CwGZdgfP.mjs","/src/pages/new.astro":"chunks/new_B6AX7G5W.mjs","/src/pages/project/[project].astro":"chunks/_project__Bq3AqHIK.mjs","/src/pages/project.astro":"chunks/project_Bj6N3A4r.mjs","/src/pages/project_1/[project].astro":"chunks/_project__LL_BM1Vu.mjs","/src/pages/index.astro":"chunks/index_DaW_2kF4.mjs","\u0000@astrojs-manifest":"manifest_BpgPe9TG.mjs","@/components/admin/NewProjectFromFresh.vue":"_astro/NewProjectFromFresh.y4yzpVIB.js","@/components/campaign/CampaignLink.vue":"_astro/CampaignLink.NICJu0VV.js","@/components/HeaderAction.vue":"_astro/HeaderAction.B3QC6vR_.js","/astro/hoisted.js?q=4":"_astro/hoisted.BEAJmhbj.js","@/components/admin/ProjectDropdown.vue":"_astro/ProjectDropdown.B4lbE9fw.js","@/components/Siwe.vue":"_astro/Siwe.jn_EVc0Q.js","/astro/hoisted.js?q=3":"_astro/hoisted.WeLJYjS2.js","@/components/chat/Chat.vue":"_astro/Chat.DpO9NyzA.js","@astrojs/vue/client.js":"_astro/client.CohaJ8G8.js","@/components/campaign/NewCampaignDialog.vue":"_astro/NewCampaignDialog.DOQD5Oye.js","/astro/hoisted.js?q=6":"_astro/hoisted.CBYC2X4a.js","/astro/hoisted.js?q=5":"_astro/hoisted.BcFN_gqt.js","/astro/hoisted.js?q=2":"_astro/hoisted.b7VjStS6.js","@/components/admin/NewChatDialog.vue":"_astro/NewChatDialog.xxCN-ys9.js","@/components/admin/Xmtpclient.vue":"_astro/Xmtpclient.BSmlAmPA.js","@/components/campaign/CampaignTable.vue":"_astro/CampaignTable.BJTW1z5M.js","@/components/SignOutButton.vue":"_astro/SignOutButton.vfdXX_26.js","@/components/users/UserTable.vue":"_astro/UserTable.Db6WjwVM.js","@/components/campaign/Modal.vue":"_astro/Modal.C9-II9Oc.js","@/components/campaign/CardTooltip.vue":"_astro/CardTooltip.1omwm_QA.js","/Users/junyaoc/Documents/lab/onchain24/rc_chat_fe/src/components/chat.vue":"_astro/chat.B8jYvMXN.js","@/components/Stamper.vue":"_astro/Stamper.UBEwruTT.js","/astro/hoisted.js?q=1":"_astro/hoisted.YohHOKX_.js","@/components/NewStamper.vue":"_astro/NewStamper.BKDc7L3s.js","@/components/ChatBubble.vue":"_astro/ChatBubble.jw7aR2iq.js","/astro/hoisted.js?q=0":"_astro/hoisted.Bwvswh3d.js","@/components/chat_1/Chat.vue":"_astro/Chat.BtpdNtiu.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/chat.C7ysgT5A.css","/OneSignalSDKWorker.js","/bg.jpeg","/favicon.svg","/logo.png","/_astro/CampaignLink.NICJu0VV.js","/_astro/CampaignTable.BJTW1z5M.js","/_astro/CardTooltip.1omwm_QA.js","/_astro/Chat.BtpdNtiu.js","/_astro/Chat.DpO9NyzA.js","/_astro/ChatBubble.jw7aR2iq.js","/_astro/DialogFooter.DtzIYxse.js","/_astro/DropdownMenuLabel.CcxHB94g.js","/_astro/HeaderAction.B3QC6vR_.js","/_astro/Input.z9xLTbiq.js","/_astro/Label.B320eMaW.js","/_astro/Modal.C9-II9Oc.js","/_astro/NewCampaignDialog.DOQD5Oye.js","/_astro/NewChatDialog.xxCN-ys9.js","/_astro/NewProjectDialog.BbezzSfO.js","/_astro/NewProjectFromFresh.y4yzpVIB.js","/_astro/NewStamper.BKDc7L3s.js","/_astro/ProjectDropdown.B4lbE9fw.js","/_astro/SignOutButton.vfdXX_26.js","/_astro/Siwe.jn_EVc0Q.js","/_astro/StampCircle.DyuAEC7d.js","/_astro/Stamper.UBEwruTT.js","/_astro/TableRow.4Kn-oSxF.js","/_astro/Textarea.D9scu3iE.js","/_astro/UserTable.Db6WjwVM.js","/_astro/Xmtpclient.BSmlAmPA.js","/_astro/_plugin-vue_export-helper.DlAUqK2U.js","/_astro/anime.es.BNELU3II.js","/_astro/browser.DFSiHcg7.js","/_astro/chat.B8jYvMXN.js","/_astro/client.CohaJ8G8.js","/_astro/createLucideIcon.CCYx18s6.js","/_astro/disconnect.fQnpZ0pp.js","/_astro/getAccount.CrAKNmNJ.js","/_astro/getConnectorClient.CvN7nnx2.js","/_astro/getEthersSigner.DIrFHjWe.js","/_astro/hoisted.BEAJmhbj.js","/_astro/hoisted.BcFN_gqt.js","/_astro/hoisted.Bwvswh3d.js","/_astro/hoisted.CBYC2X4a.js","/_astro/hoisted.WeLJYjS2.js","/_astro/hoisted.YohHOKX_.js","/_astro/hoisted.b7VjStS6.js","/_astro/hooks.module.2OrbNQp7.js","/_astro/index.BUh_L0Ny.js","/_astro/index.CZygRCoE.js","/_astro/index.DG-Uutyh.js","/_astro/index.DUM513om.js","/_astro/index.Dkz4T-iq.js","/_astro/index.LclF5nvU.js","/_astro/index.SVBtah2_.js","/_astro/inherits_browser.BGXtg88A.js","/_astro/overlayscrollbars.BZdJ0bwW.js","/_astro/overlayscrollbars.DeHy3ZkO.css","/_astro/runtime-core.esm-bundler.C8n-v3-D.js","/_astro/runtime-dom.esm-bundler.CkxCeCJQ.js","/_astro/signMessage.bXjFpeGI.js","/_astro/stamp.DRRuyw06.js","/_astro/supabase.Cq5c-OsS.js","/_astro/user_preferences_bindings_wasm_bg.CCaStjan.wasm","/_astro/utils.CFP4Y51R.js","/_astro/wagmiConfig.Chk1Y_fx.js","/_astro/watchConnections.CEVD3vQ5.js"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
