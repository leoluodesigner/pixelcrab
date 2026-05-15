# GitHub Pages 搭建指南

## 什么是 GitHub Pages

GitHub Pages 是 GitHub 提供的免费静态网站托管服务，可以把你的 HTML 网页直接发布到互联网上。

---

## 完整操作步骤

### 第一步：创建 GitHub 仓库

1. 登录 [github.com](https://github.com)
2. 点击右上角 `+` → `New repository`
3. 仓库名填写：`你的用户名.github.io`
   - 例如你的用户名是 `luoao`，就填 `luoao.github.io`
   - 这是你的主网站，必须用这个格式
4. 其他设置保持默认，点击 `Create repository`

### 第二步：上传网页文件

假设你本地有这些文件：

```
我的网站/
├── index.html      ← 首页（必须）
├── style.css       ← 样式文件
└── images/
    └── logo.png    ← 图片资源
```

上传方法：
1. 打开刚创建的仓库页面
2. 点击 `Add file` → `Upload files`
3. 把本地文件夹里的所有文件拖进去
4. 点击 `Commit changes` 完成上传

### 第三步：开启 GitHub Pages

1. 进入仓库页面，点击顶部 `Settings` 标签
2. 左侧菜单找到 `Pages`
3. **Source** 部分设置：
   - Branch：选择 `main`
   - 文件夹：选择 `/ (root)`
4. 点击 `Save`

### 第四步：访问你的网站

- 等待 1-2 分钟
- 访问地址：`https://你的用户名.github.io`
- 例如：`https://luoao.github.io`

---

## 常见问题

### 1. 仓库名填错了怎么办？
删除仓库重新创建，仓库名必须是 `用户名.github.io` 格式。

### 2. 网页显示 404？
检查是否上传了 `index.html` 文件，这是网站的入口文件。

### 3. 样式/图片加载不出来？
检查文件路径是否正确，建议所有文件放在根目录，不要用中文文件名。

### 4. 想用自定义域名？
在仓库根目录创建 `CNAME` 文件，里面写你的域名（如 `www.example.com`）。

---

## 技术限制

GitHub Pages 只支持静态网页：
- ✅ HTML、CSS、JavaScript
- ❌ PHP、Python、数据库

适合做：个人主页、作品集、文档站点
不适合做：需要登录、数据库的动态网站
