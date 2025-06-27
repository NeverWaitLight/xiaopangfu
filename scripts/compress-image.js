// npm install sharp
// node compress-png.js
// compress.js

const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

// --- 配置区域 ---
// 请在这里指定你的输入图片目录
const inputDir = "C:/Users/admin/Downloads/作品集排版";

// 输出文件夹的名称
const outputDirName = "compressed";
// --- 配置结束 ---

/**
 * 将字节大小格式化为更易读的字符串 (KB, MB)
 * @param {number} bytes - 文件大小（字节）
 * @returns {string} 格式化后的大小字符串
 */
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * 主压缩函数
 */
async function compressPngImages() {
  const fullOutputDir = path.join(inputDir, outputDirName);

  try {
    // 1. 检查输入目录是否存在
    await fs.access(inputDir);
    console.log(`✅ 输入目录找到: ${inputDir}`);
  } catch (error) {
    console.error(
      `❌ 错误: 输入目录 "${inputDir}" 不存在或无法访问。请检查路径是否正确。`
    );
    return;
  }

  // 2. 创建输出目录 (如果不存在)
  await fs.mkdir(fullOutputDir, { recursive: true });
  console.log(`📂 输出目录已准备好: ${fullOutputDir}`);
  console.log("-------------------------------------------");

  // 3. 读取目录中的所有文件
  const files = await fs.readdir(inputDir);

  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let processedCount = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(fullOutputDir, file);

    // 仅处理 .png 文件
    if (path.extname(file).toLowerCase() !== ".png") {
      continue;
    }

    try {
      const stats = await fs.stat(inputPath);
      // 跳过子目录
      if (stats.isDirectory()) {
        continue;
      }

      const originalSize = stats.size;
      totalOriginalSize += originalSize;

      console.log(`🚀 开始处理: ${file}`);

      // 4. 使用 sharp 进行压缩
      const info = await sharp(inputPath)
        .png({
          // --- 压缩设置 ---
          // `quality` 是实现高压缩率的关键。范围 0-100。值越低，颜色越少，文件越小。
          // 60-80 是一个在质量和大小之间取得良好平衡的范围。我们使用 65 作为积极的起点。
          quality: 65,

          // `compressionLevel` 是 zlib 压缩级别，范围 0-9。9 是最慢但压缩效果最好。
          compressionLevel: 9,

          // `palette` 强制使用8位调色板格式，这是PNG有损压缩的核心。
          palette: true,

          // `adaptiveFiltering` 尝试应用自适应行过滤，有时可以进一步减小文件大小。
          adaptiveFiltering: true,
        })
        .toFile(outputPath);

      const compressedSize = info.size;
      totalCompressedSize += compressedSize;
      processedCount++;

      const reduction = ((originalSize - compressedSize) / originalSize) * 100;

      console.log(
        `  -> ✅ 完成! | 原始大小: ${formatBytes(
          originalSize
        )} | 压缩后: ${formatBytes(
          compressedSize
        )} | 压缩率: ${reduction.toFixed(2)}%`
      );
    } catch (err) {
      console.error(`  -> ❌ 处理文件 "${file}" 时发生错误:`, err.message);
    }
  }

  console.log("-------------------------------------------");
  if (processedCount > 0) {
    const totalReduction =
      ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100;
    console.log("🎉 全部处理完成！");
    console.log(`总共处理文件: ${processedCount}`);
    console.log(`总原始大小: ${formatBytes(totalOriginalSize)}`);
    console.log(`总压缩大小: ${formatBytes(totalCompressedSize)}`);
    console.log(`总体积压缩率: ${totalReduction.toFixed(2)}%`);
  } else {
    console.log("🤔 在输入目录中没有找到 PNG 文件。");
  }
}

// 运行主函数
compressPngImages().catch(console.error);
