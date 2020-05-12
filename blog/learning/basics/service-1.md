# 服务端小常识

### Linux命令

- 查看所有服务状态

```sh
service --status-all

abrt-ccpp hook is installed
abrtd (pid  1264) is running...
abrt-dump-oops is stopped
acpid (pid  1004) is running...
atd (pid  1297) is running...
auditd (pid  922) is running...
crond (pid  1282) is running...
ip6tables: Firewall is not running.
iptables: Firewall is not running.

```

- 查看某一个服务的状态

```sh
service xxx(服务名称) status // 查看某一个服务的状态
ps aux | grep xxx(服务名称) // 查看某个进程是否存在
```

- 查看某服务安装目录

```sh
~root: which flutter
```