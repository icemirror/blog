# 基于 docker 搭建 gitlab

### 1. 安装docker for mac
[download from store](https://store.docker.com/editions/community/docker-ce-desktop-mac)

### 2. 配置镜像加速器（aliyun）

- 注册阿里云
- [mac操作文档](https://cr.console.aliyun.com/cn-hangzhou/mirrors)
```
// 加速器地址
https://wzlmpckz.mirror.aliyuncs.com

/* aliyun 教程*/
1. 安装/升级Docker客户端
10.10.3以上的用户，推荐使用Docker for Mac

2. 配置镜像加速器
docker -> Preferences -> Registry mirros

将 https://wzlmpckz.mirror.aliyuncs.com 添加到 "registry-mirros"数组中
```
### 3. 修改/etc/docker/daemon.json，为docker配置运行目录和镜像仓库地址

```
mkdir /etc/docker
vi /etc/docker/daemon.json

// 向daemon.json中输入如下内容
{
    "graph": "/usr/local/bin/docker", // which docker
    "registry-mirros": ["https://wzlmpckz.mirror.aliyuncs.com"]
}
```

### 4. 下载gitlab镜像

```
docker pull gitlab/gitlab-ce
// 镜像有点大，需要一点时间
// 文档参考: https://docs.gitlab.com/omnibus/docker/
```
### 5. 运行gitlab实例

```
sudo docker run -d \
 --name gitlab \
 --restart always \
 --publish 30001:22 --publish 30000:80 --publish 30002:443 \
 --volume $HOME/gitlab/data:/var/opt/gitlab \
 --volume $HOME/gitlab/logs:/var/log/gitlab \
 --volume $HOME/gitlab/config:/etc/gitlab \
 gitlab/gitlab-ce
```

volume选项，将gitlab的目录挂在到用户本地目录，以防container删除或停止时数据丢失。publish选项时将宿主机器30000/30001/30002映射为容器到80(http)/22(ssh)和443(http)端口

### 6.配置gitlab实例

- 先从gitlab container进入bash
```
sudo docker exec -it gitlab /bin/bash
```
- 编辑gitlab.rb文件
```
vi /etc/gitlab/gitlab.rb
```
#### 6.1 配置gitlab的访问地址
ps: vi 文档输入 /keyword 即可搜索
```
external_url 'http://hostname:30000'
// external_url 'http://192.168.0.110:30000'
```
由于定义的url中存在端口号，因此需要将nginx监听的端口号指定为80,否则nginx将监听容器的30000端口，造成gitlab无法使用。
```
nginx['listen_port'] = 80
```

#### 6.3 配置ssh协议的访问地址和端口
```
gitlab_rails['gitlab_ssh_host'] = 'data.comdyn.cn'
gitlab_rails['gitlab_shell_ssh_port'] = 30001
```

#### 6.4 配置邮箱
```
// email settings
gitlab_rails['gitlab_email_from'] = "565149480@qq.com"

// smtp服务器，需要设置sendmail发送邮件
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.exmail.qq.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "565149480@qq.com"
gitlab_rails['smtp_password'] = "mysmtp"
gitlab_rails['smtp_domain'] = "exmail.qq.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true
// SMTP配置示例: https://docs.gitlab.com/omnibus/settings/smtp.html

gitlab_rails['smtp_openssl_verify_mode'] = "peer"
```

修改完毕，需要重新配置gitlab：
```
// 1. bash模式下,重新配置
gitlab-ctl reconfigure
// 2. exit退出bash后，使用docker重启gitlab
docker restart gitlab
```

### 导入现在的git仓库

git仓库存放目录：
$HOME/gitlab/data/git-data/repositories

### docker 命令
```
docker restart gitlab
```
参考文章：
1. [在mac os x中配置gitlab](http://comdyn.hy.tsinghua.edu.cn/from-web/mac-os/570-docker-gitlat)
2. [通过 docker 搭建自用的 gitlab 服务](https://juejin.im/post/5a4c9ff36fb9a04507700fcc)
3. [gitlab.rb配置模板](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/files/gitlab-config-template/gitlab.rb.template)
