# Centos7 下 nginx 的安装与发布

## 安装 nginx

- 使用 yum 安装 nginx

```bash
# 将 nginx 添加到 yum repro 库中
rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

# 安装 nginx
yum install nginx

# 已加载插件：fastestmirror, langpacks
# Loading mirror speeds from cached hostfile
# * base: mirror.usc.edu
# * extra: mirror.raystedman.net
# * updates: mirror.metrocast.net
# ...

# Thanks for using nginx!
# ...

# 启动 nginx

service nginx start

# 查看 nginx 版本
nginx -v

# 配置文件
/etc/nginx

```

因为 yum 的源的问题，可能需要修改一下 yum 的源，否则安装请求大概率超时。如何修改 yum 源？

```bash
# 备份源
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

# 进入 yum 源文件
cd /etc/yum.repos.d/

# 下载163的源到该文件夹
sudo wget -O CentOS-Base.repo http://mirrors.163.com/.help/CentOS7-Base-163.repo

# or 下载 aliyun 的源
sudo wget -O CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

# or 下载中科大的源
sudo wget -O CentOS-Base.repo https://lug.ustc.edu.cn/wiki/_export/code/mirrors/help/centos?codeblock=3

# 清除元数据缓存
sudo yum clean all

# 生成缓存
sudo yum makecache

# 更新 yum
sudo yum -y update
```

- 源码编译安装 nginx

```bash
# 下载 nginx 的 tar 包 http://nginx.org/en/download.html
nginx-1.18.0.tar.gz

# 上传至远程服务器
scp -r /Users/goodhome/Desktop/nginx-1.18.0.tar.gz root@172.xx.xx.xx:/user/local

# 登录远程服务器
ssh -p 22 root@172.xx.xx.xx

# 切换到对应目录
cd /user/local

# 解压 nginx tar 包
tar -xvf nginx-1.10.1.tar.gz nginx

# 切换到对应的文件
cd nginx

# 配置 (注需要gcc等编译工具)
./configure \

# 编译
make

# 安装
make install

# 验证
/usr/local/nginx/sbin/nginx -V
```

## 配置与发布网站

- 修改配置

修改 nginx 配置, 通过 yum 安装的 nginx 配置文件在`/etc/nginx/nginx.conf`, 编译安装在自定义的路径下,本次在`user/local/nginx/conf/nginx.conf`

```bash
# 配置之前, 需要为 nginx 默认文件做一下备份:
cp nginx.conf nginx.conf.backup

# 进入配置文件
vi nginx.conf

# 配置静态资源服务
server {
  listen 80;
  server_name www.winningcloud.com;
  charset utf-8;
  location / {
    root /usr/local/nginx/html/examples;
    index index.html index.htm;
  }
}

# 退出并保存
esc

:wq
```

- 配置资源

可以看到配置中有个字段是 root 后跟了路径`/usr/local/nginx/html/examples`, 这一句配置标示,我们的本地跟路径在该路径下.

接下来在`usr/local/nginx`目录下新增文件夹`html`,用于存放静态页面资源.

```bash
# 切换路径
cd /usr/local/nginx

# 新建文件夹
mkdir html

# 将静态页面上传至远程服务器指定路径下
scp -r /Users/goodhome/Desktop/examples root@172.xx.xx.xx:/usr/local/nginx/html
```

- 启动 nginx 服务

```bash
# 启动
/usr/local/nginx/sbin/nginx

# 重启
/usr/local/nginx/sbin/nginx -s reload

# 停止
/usr/local/nginx/sbin/nginx -s stop
```

- 访问静态页面

打开http://172.xx.xx.xx 即可看到发布的页面内容.

### 参考资源

- [修改 CentOS 默认 yum 源为国内 yum 镜像源](https://blog.csdn.net/inslow/article/details/54177191)
- [centos7 安装 nginx 的两种方法](https://www.jianshu.com/p/96691511295f)
- [CentOS 修改各大 yum 源(centos5,centos6,centos7)](https://juejin.im/post/5d1e1e9451882518fd49160a)
- [CentOS 7 源码编译安装 Nginx](https://www.cnblogs.com/stulzq/p/9291223.html)
