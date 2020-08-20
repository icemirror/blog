# Jenkins + Github 实现持续集成与自动化部署

## 在 CentOS 上安装 Jenkins

- 查看系统版本

```bash
cat /etc/system-release
# CentOS release 6.10 (Final)
```

## 安装 Jenkins

- 使用 yum 安装

```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key

sudo yum install jenkins java-1.8.0-openjdk-devel -y
```

Jenkins 是依赖 Java 环境运行的,因此我们需要安装 java 的 jdk.

- 查看 java 版本

```bash
java -version

#openjdk version "1.8.0_262"
#OpenJDK Runtime Environment (build 1.8.0_262-b10)
#OpenJDK 64-Bit Server VM (build 25.262-b10, mixed mode)
```

> 由于使用 yum 下载用的官方的源, 所以下载不是报错就是十分的慢. 于是转投国内镜像.

- 使用国内镜像安装 jenkins

```bash
wget https://mirrors.tuna.tsinghua.edu.cn/jenkins/redhat-stable/jenkins-2.164.2-1.1.noarch.rpm
rpm -ivh jenkins-2.164.2-1.1.noarch.rpm
```

## 修改 jenkins 配置

```bash
vim /etc/sysconfig/jenkins

# 修改端口号, 默认是8080端口

JENKINS_PORT="9090"
```

- 启动 jenkins

```bash
service jenkins start
#Starting Jenkins                                           [  OK  ]
```

## 访问 jenkins

访问`https://服务器地址:9090`,即可看到 Jenkins 的解锁界面.

![image](/1.png)

管理员初始化密码访问地址, 可以初始化日志文件.

```bash
cat /var/lib/jenkins/secrets/initialAdminPassword
```

- 创建用户

创建用户之前还需要安装插件, 漫长的等待之后, 可以创建管理员账户.

![image](/2.png)

- 重启 Jenkins

```bash
service jenkins reload
```

![image](/3.png)

- 进入 Jenkins 主界面

![image](/4.png)

## 修改 Jenkins 密码

如果忘记管理员账号, 可以删除 Jenkins 配置信息. `/var/lib/jenkins`

```bash
cd /var/lib/jenkins
# 备份配置文件
cp config.xml config.xml.backup
# 删除配置
rm config.xml

# 重启
service jenkins reload
```

## 创建任务

![image](/5.png)

<!-- ## 安装 Gitlab

新建 /etc/yum.repos.d/gitlab-ce.repo，内容为

```bash
# 新建gitlab-ce.repo
vim /etc/yum.repos.d/gitlab-ce.repo

# 新增以下内容
[gitlab-ce]
name=Gitlab CE Repository
baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el$releasever/
gpgcheck=0
enabled=1

# 再执行
sudo yum makecache
sudo yum install gitlab-ce -y
```

看到 complete!就证明已经安装完成了.

![image](/6.png)

执行配置命令

```bash
sudo gitlab-ctl reconfigure
```

## 保存 gitlab 配置、重启

```bash
sudo gitlab-ctl reconfigure
sudo gitlab-ctl restart
sudo gitlab-ctl status
```

访问 gitlab, gitlab 默认发布在 80 端口. `http://服务器地址`.访问的时候报错 502.

![image](/7.png)

查询资料发现 gitlab 报错 502, 是因为使用端口被占用了. 这时候我们需要修改一下 gitlab 的配置.

## 修改 gitlab 配置

```bash
# gitlab配置文件
sudo vi /etc/gitlab/gitlab.rb

# 修改gitlab
```

修改完配置之后仍然报错 502, 绝望. 查了半天, 才发现 gitlab 官方推荐 4G 内存, 贫民窟选手服务器 2G. 接下来就实现 2G 内存跑 gitlab 的妄想.



## 查看日志

```bash
sudo gitlab-ctl tail
``` -->

# 参考内容

[Jenkins 安装中文指南](https://www.jenkins.io/zh/doc/book/installing/#setup-wizard)

[清华开源软件镜像](https://mirrors.tuna.tsinghua.edu.cn/help/gitlab-ce/)
