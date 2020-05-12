# nginx 基础认知

## 安装

- 安装

```bash
brew install nginx
```

- 启动

```bash
sudo nginx
```

- 配置文件

```
/usr/local/etc/nginx/nginx.conf
```

## 基础命令

- 查看版本号

```bash
nginx -v
```

- 检查配置文件是否有语法错误

```bash
nginx -t
```

- 热加载，重新加载配置文件

```bash
nginx -s reload
```

- 快速关闭

```bash
nginx -s stop
```

- 等待工作进程处理完成后关闭

```bash
nginx -s quit
```

## 基础配置

nginx 的配置核心是定义要处理的`URL`以及如何响应这些`URL`请求。换句话说，就是定义一系列的虚拟服务器（virtual servers）控制对来自特定域名或者 IP 的请求的处理。

- 默认配置

```
# Nginx进程，一般设置为和CPU核数一样
worker_processes  1;

# 错误日志存放目录
error_log  /var/log/nginx/error.log warn;

# 进程pid存放位置
pid        /var/run/nginx.pid;

events {
    # 单个后台进程的最大并发数
    worker_connections  1024;
}


http {
    # 文件扩展名与类型映射表
    include       /etc/nginx/mime.types;

    # 默认文件类型
    default_type  application/octet-stream;

    # 日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    # nginx访问日志存放位置
    access_log  /var/log/nginx/access.log  main;

    # 开启高效传输模式
    sendfile        on;

    # 减少网络报文段的数量
    # tcp_nopush     on;

    # 保持连接的时间，也叫超时时间
    keepalive_timeout  65;

    # 开启gzip压缩
    # gzip  on;

    # 引入其他的配置文件
    include servers/*;
}

```

- 虚拟主机配置

通常虚拟主机有关的配置需要配置到`server`对象中。

```
# 虚拟主机
server {
  # 配置监听端口
  listen 80;

  # 浏览器放问域名
  server_name localhost;

  # 编码格式
  charset utf-8;

  # 访问日志
  access_log logs/localhost.access.log access;

  # 路由
  location / {
    # 访问根目录
    root www;

    # 入口文件
    index index.html index.htm;
  }

  # 配置404页面
  error_page 404 /404.html;

  # 错误状态码显示页面，配置后需要重启
  error_page 500 502 503 504 /50x.html;

  location = /50.html {
    root /usr/share/nginx/html;
  }
}
```

- 内置变量

这些内置变量属于全局性的，可以在 nginx 配置中的任意位置使用。

| 变量名            | 作用                                                               |
| ----------------- | ------------------------------------------------------------------ |
| \$host            | 请求信息中的`Host`, 如果请求信息中没有该字段，则等于设置的服务器名 |
| \$request_method  | 客户端请求类型，比如`GET`, `POST`, `PUT`等                         |
| \$args            | 请求参数                                                           |
| \$content_length  | 请求头中`Content-Length`字段                                       |
| \$http_user_agent | 客户端`agent`信息                                                  |
| \$http_cookie     | 客户端`cookie`信息                                                 |
| \$remote_port     | 客户端端口                                                         |
| \$server_protocal | 请求使用的协议，如`HTTP/1.0`, `HTTP/1.1`, `HTTP2.0`                |
| \$server_addr     | 服务器地址                                                         |
| \$server_name     | 服务器名称                                                         |
| \$server_port     | 服务器端口号                                                       |

- listen 指令使用方式与参数说明

`listen address[:port] | port | unix:path`, nginx 服务的 listen 监听指令可以设置`ip:port`, `port`或者套接字。

其他参数补充：

| 参数名         | 作用                                                                                   |
| -------------- | -------------------------------------------------------------------------------------- |
| default_server | 指定此虚拟主机为默认主机（监听在同一个端口中）；如果没有，则第一个虚拟主机为默认主机。 |
| ssl            | 指定此端口上接受的连接在 ssl 模式下工作。                                              |
| http2          | 配置端口接受 http2 的连接;                                                             |
| spdy           | 端口接受 spdy 的连接。                                                                 |
| proxy_protocol | 允许端口接受的连接使用代理服务器协议。                                                 |
| setfib         | 设置相关路由表                                                                         |
| fastopen       | TCP 快速打开，提高两端点间连接的打开速度。不建议使用。                                 |
| backlog        | 设置连接队列的最大长度。                                                               |
| rcvbuf         | 套接字接收缓冲区大小                                                                   |
| sndbuf         | 套接字发送缓冲区大小                                                                   |
| accept_filter  | 过滤器                                                                                 |
| deferred       | 延迟                                                                                   |
| bind           | 绑定一个 address:port 对。                                                             |
| ipv6only       | on                                                                                     |
| reuseport      | 为每个工作进程创建一个单独的监听套接字                                                 |
| so_keepalive   | on                                                                                     |

## 正向代理与反向代理

- 正向代理

客户端通过代理工具访问目标服务器，比如小明用酸酸乳访问 YouTube，就是正向代理的例子。正向代理过程中，访问过程对于客户端是透明的，但对目标服务器而言是非透明的。目标服务器接收到的请求是经过代理服务器转发的，因此无法知道真实的用户请求。

- 反向代理

客户端请求代理服务器资源，代理服务器再访问真实的目标服务器，代理服务器将目标服务器的请求结果再转发給客户端。这个过程对于客户端是不透明的，客户端始终访问的是代理服务器，至于真实的目标服务器，对于客户端是不透明的。

## https 服务

对于需要 https 的服务，需要获取第三方可信任的`SSL`证书。然后将虚拟主机监听`443`端口，并定义 SSL 证书文件和私钥文件。

```
server {
  # ssl 参数
  listen 443 ssl http2;

  # 服务名称
  server_name  www.funnycoder.cn;

  # 证书文件
  ssl_certificate      ssl/1_funnycoder.cn_bundle.crt;

  # 私钥文件
  ssl_certificate_key  ssl/2_funnycoder.cn.key;

  # ...
}
```

## 负载均衡

负载均衡实际上是反向代理的一次应用。当服务器访问量过大时，为了减轻服务器压力，我们需要通过负载均衡的策略来减轻服务器的压力。

- 轮询策略（默认）

这种策略就是将客户端发起的请求，通过轮询的方式分配給服务端。但这种方式的弊端在于，当其中一台服务器压力过大，出现响应延迟时，会影响所有在访问这台服务器的用户。

```
// nginx.config
upstream balanceServer {
  server 192.168.0.1;
  server 192.168.0.2;
}
```

- 权重策略

所谓权重策略就是为服务器添加`weight`权重值，权重越大的访问越大，这种可以解决不同性能服务器的分配。

```
// nginx.config
upstream balanceServer {
  server 192.168.0.1 weight=1;
  server 192.168.0.2 weight=6;
}
```

- 最小连接数策略

该策略就是将请求分配給连接较少的服务器，用于平衡每个队列的长度，避免为压力大的服务器施加更多的压力。

```
// nginx.config
upstream balanceServer {
  least_conn;
  server 192.168.0.1;
  server 192.168.0.2;
}
```

- 客户端绑定 ip

将来自同一 ip 的请求统一分配给一台服务器，用于解决动态网页存在的 session 共享问题。

```
// nginx.config
upstream balanceServer {
  ip_hash;
  server 192.168.0.1;
  server 192.168.0.2;
}
```

- 最快响应时间策略(fair 第三方)

利用第三方插件`nginx-upstream-fair`, 将请求优先分配給响应速度最快的服务器。

```
// nginx.config
upstream balanceServer {
  fair;
  server 192.168.0.1;
  server 192.168.0.2;
}
```

## 静态资源服务器

```
location ~* \.(png|gif|jpg|jpeg)$ {
  root /root/static/;
  autoindex on;
  access_log off;

  # 设置过期时间
  expires 10h;
}
```

该配置用于处理以 png、gif、jpg、jpeg 等后缀结尾的请求，将该请求转发到本地路径/root/static.

## 配置 gzip

gzip 是一种网页压缩技术，经过 gzip 压缩后，页面体积会减少 30%甚至更多。让用户可以有更好的访问体验，访问速度更快。gzip 网页压缩的实现需要浏览器和服务器的支持。

```
server {
  # 开启gzip 模块
  gzip on;

  # 设置系统获取几个单位的缓存用于存储 gzip 的压缩结果数据流
  gzip_buffers 32 4k;

  # 压缩机别 1-10， 数字越大压缩越明显，压缩率越大，但压缩时间也越长
  gzip_comp_level 6;

  # 设置允许压缩的页面的最小字节数，页面字节数从响应消息头 Content-Length 中获取
  gzip_min_length 100;

  # 压缩类型
  gzip_types application/javascript text/css text/html;

  # 关闭 gzip功能
  gzip_disable "MSIE [1-6]\.";

  # 开启从代理服务器上收到响应的内容 gzip 压缩（on/off）
  gzip_proxied on;

  # 识别 HTTP 协议版本 （1.0 / 1.1）
  gzip_http_version 1.1;

  # 在响应头添加 Vary: Accept_Encoding,使代理服务器根据请求头中的 Accept_Encoding来识别是否启用 gzip 压缩
  gzip_vary on;
}
```

## 跨域问题

```
server {
  listen 80;
  server_name aaa.xxx.com;
  location / {
    proxy_pass bbb.xxx.com;
  }
}
```

## 防盗链

```
location ~* \.(gif|jpg|png)$ {
  # 只允许来自指定 ip 的资源请求

  valid_referers none blocked 192.168.0.1;
  if ($invalid_referer) {
    rewrite ^/ http://$host/logo.png;
  }
}
```

## 访问权限控制

- 简单配置

```
location / {
  # 配置指定的 ip 访问
  allow 192.168.0.1;

  # 禁止所有
  deny all;
}
```

- 配置白名单

```
vi /etc/nginx/white_ip.conf

...
192.168.0.1;
...

// 修改 nginx_conf
geo $remote_addr $ip_whitelist {
  default: 0;
  include ip.conf;
}

// 使用白名单
server {
  location / {
    if ($ip_whitelist = 0) {
      return 403; // 不在白名单返回403
    }

    index index.html;
    root /tmp;
  }
}
```

> 参考

- [前端也要掌握的 Nginx 知识](https://juejin.im/post/5ea12412e51d4546e347f822)

