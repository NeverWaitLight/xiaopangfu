# 小胖福的作品集

这是一个基于React.js的作品集展示网站。

## 功能

- 展示作品集图片
- 响应式设计

## 技术栈

- React.js
- Webpack
- Babel
- CSS3

## 如何运行

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start
```

### 生产环境

```bash
# 构建生产版本
npm run build
```

构建后的文件将输出到`dist`目录。

## 项目结构

```
xiaopangfu/
├── assets/         # 静态资源文件
│   └── resume/
│       └── fu/     # 简历图片
├── public/         # 公共文件
│   └── index.html  # HTML模板
├── src/            # 源代码
│   ├── components/ # React组件
│   │   ├── App.jsx
│   │   └── ResumeGallery.jsx
│   ├── index.css   # 全局样式
│   └── index.js    # 应用入口
└── scripts/        # 工具脚本
    └── compress-image.js
```
