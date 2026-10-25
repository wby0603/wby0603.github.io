# CodeScope · GitHub Pages 部署说明

作者：枫

## 直接部署

仓库里已经生成好发布版目录：

```text
docs/
  index.html
  app.js        # 已混淆压缩
  styles.css    # 已压缩
  vendor/       # 本地 CodeMirror
  .nojekyll
```

上传到 GitHub 后：

1. 打开仓库 **Settings → Pages**。
2. **Build and deployment → Source** 选择 **Deploy from a branch**。
3. Branch 选择 `main`，Folder 选择 **`/docs`**。
4. 保存并等待发布，访问 `https://<你的用户名>.github.io/<仓库名>/`。

`docs/.nojekyll` 已经包含，避免 GitHub Pages 的 Jekyll 处理影响静态资源。

## 官方域名（防伪域名锁）

已配置为：

```html
<meta name="codescope-official-hosts" content="wby0603.github.io">
```

因此：

- `https://wby0603.github.io/` 和 `https://wby0603.github.io/<仓库名>/` 都视为官方站点。
- 其他域名打开会显示“非官方镜像”，校验按钮也会失败。
- 本地 `file://` 预览仍然允许，方便开发。

如果以后绑定自定义域名，把该域名追加到 content 里，多个域名用英文逗号分隔，例如：

```html
<meta name="codescope-official-hosts" content="wby0603.github.io,codescope.example.com">
```

## 防伪说明

页脚包含：

- 枫印 + 作者署名 + 版权信息
- 正版签名码（`CS-XXXX-XXXX`）
- “校验”按钮：检查作者、签名码和官方域名
- `data-owner`、`data-signature`、meta 作者信息和控制台签名

这些都是**水印/防伪标识**，不是不可复制的密码学证书。静态网页的防伪码本身可以被复制；域名锁和可见署名主要用于识别盗用镜像。

## 关于“加密”

- `docs/app.js` 使用了 JavaScript 混淆 + 压缩，`docs/styles.css` 使用了 CSS 压缩。
- 这能显著降低直接阅读、复制源码的成本，但**不是真正的加密**；静态站点代码最终可以被还原。
- CodeMirror 是 MIT 开源库，仍保持可读，不建议混淆第三方库。
- 如果仓库是公开的，根目录的源码仍然可以被看到。要尽量避免源码暴露：
  - 只把 `docs/` 内容放到一个**独立的部署仓库**；或
  - 把源码放在私有仓库，只发布构建后的静态文件。
- 没有加入“密码门禁/禁用右键/检测开发者工具”这类功能：在纯静态站点上它们都能被绕过，还会干扰正常使用。

## 更新发布版

修改 `index.html`、`app.js` 或 `styles.css` 后，需要重新生成 `docs/`。发布版是基于根目录源码构建的；如果直接改 `docs/` 里的混淆文件，后续会难以维护。

## 备注

- 页面不上传代码、不执行代码，所有分析在浏览器本地完成。
- 如果部署后仍看到旧页面，请用 `Ctrl + F5` 强制刷新，或确认 Pages 已经完成新的构建。
