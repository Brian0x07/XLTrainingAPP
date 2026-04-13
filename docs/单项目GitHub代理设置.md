# 单项目 GitHub 代理设置

这个说明用于给某一个 Git 项目单独设置 GitHub 代理，不开启 macOS 系统代理，也不影响其他项目。

下面命令里的 `127.0.0.1:7890` 换成你本地代理软件实际监听的地址和端口。

## 1. 进入项目目录

```bash
cd /path/to/your/project
git remote -v
```

根据 `git remote -v` 输出判断远程地址类型。

## 2. HTTPS 远程地址

如果远程地址类似：

```text
https://github.com/user/repo.git
```

只给当前项目的 GitHub HTTPS 访问设置 SOCKS5 代理：

```bash
git config --local http.https://github.com.proxy socks5h://127.0.0.1:7890
```

如果代理软件提供的是 HTTP 代理端口，改用：

```bash
git config --local http.https://github.com.proxy http://127.0.0.1:7890
```

说明：

- `--local` 表示只写入当前项目的 `.git/config`。
- `socks5h` 表示 DNS 解析也走代理，访问 GitHub 时更稳。
- 这个配置不会打开系统代理。

## 3. SSH 远程地址

如果远程地址类似：

```text
git@github.com:user/repo.git
```

只给当前项目的 SSH 访问设置 SOCKS5 代理：

```bash
git config --local core.sshCommand 'ssh -o ProxyCommand="nc -X 5 -x 127.0.0.1:7897 %h %p"'
```

如果代理软件提供的是 HTTP CONNECT 代理端口，改用：

```bash
git config --local core.sshCommand 'ssh -o ProxyCommand="nc -X connect -x 127.0.0.1:7897 %h %p"'
```

`%h` 和 `%p` 是 SSH 的占位符：

- `%h` 表示目标主机，例如 `github.com`。
- `%p` 表示目标端口，例如 SSH 默认端口 `22`。

实际连接 GitHub 时，这部分大致会被替换成：

```bash
nc -X 5 -x 127.0.0.1:7890 github.com 22
```

## 4. 检查当前项目配置

```bash
git config --local --get-regexp 'proxy|sshCommand'
```

然后测试：

```bash
git fetch
```

在 Fork 里使用时，重新打开或刷新这个仓库后再执行 `fetch/pull/push`。

## 5. 撤销配置

撤销 HTTPS 代理：

```bash
git config --local --unset http.https://github.com.proxy
```

如果之前设置过通用 HTTP 代理，也可以撤销：

```bash
git config --local --unset http.proxy
```

撤销 SSH 代理：

```bash
git config --local --unset core.sshCommand
```

## 6. 常用判断

- 远程地址是 `https://github.com/...`，用 HTTPS 配置。
- 远程地址是 `git@github.com:...` 或 `ssh://...`，用 SSH 配置。
- 只想影响当前项目，一律使用 `git config --local`。
- 不想开系统代理，就不要改 macOS 网络设置，只改当前项目的 Git 配置。
