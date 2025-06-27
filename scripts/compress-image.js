// npm install sharp
// node compress-png.js
// compress-png.js (v2 - 智能判断版本)

const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

// =================================================================
// ========================= 用户配置区域 ==========================
// =================================================================

// 【请在这里填入你的图片文件夹的绝对路径】
// Windows 示例: 'C:/Users/YourUser/Desktop/MyPictures'
// macOS/Linux 示例: '/Users/YourUser/Documents/MyImages'
const INPUT_FOLDER_PATH = "C:/Users/admin/Downloads/作品集排版"; // <--- 在这里填入你的文件夹路径

// =================================================================

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} - 格式化后的大小字符串
 */
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * 主执行函数
 */
async function processImages() {
  console.log("--- PNG 图片高质量压缩脚本启动 (智能判断版) ---");

  if (!INPUT_FOLDER_PATH) {
    console.error("错误：请在脚本中填入你的文件夹路径 (INPUT_FOLDER_PATH)");
    return;
  }

  const outputDir = path.join(INPUT_FOLDER_PATH, "compressed_output");

  try {
    await fs.access(INPUT_FOLDER_PATH);
    console.log(`源文件夹: ${INPUT_FOLDER_PATH}`);

    await fs.mkdir(outputDir, { recursive: true });
    console.log(`输出文件夹: ${outputDir}`);
    console.log("-----------------------------------------");

    const files = await fs.readdir(INPUT_FOLDER_PATH);
    const pngFiles = files.filter((file) =>
      file.toLowerCase().endsWith(".png")
    );

    if (pngFiles.length === 0) {
      console.log("在指定文件夹中未找到任何 PNG 图片。");
      return;
    }

    console.log(`共找到 ${pngFiles.length} 个 PNG 文件，开始处理...`);
    let totalOriginalSize = 0;
    let totalFinalSize = 0;

    for (const file of pngFiles) {
      const inputPath = path.join(INPUT_FOLDER_PATH, file);
      const outputPath = path.join(outputDir, file);

      try {
        const stats = await fs.stat(inputPath);
        if (stats.isDirectory()) continue;

        const originalSize = stats.size;
        totalOriginalSize += originalSize;

        console.log(`\n[处理中] ${file}`);
        console.log(`  - 原始大小: ${formatBytes(originalSize)}`);

        // 【核心改动】先将压缩结果生成到内存 Buffer 中
        const compressedBuffer = await sharp(inputPath)
          .png({
            quality: 85,
            palette: true,
            compressionLevel: 9,
            adaptiveFiltering: true,
          })
          .toBuffer();

        const compressedSize = compressedBuffer.length;

        // 【核心改动】比较大小，决定最终操作
        if (compressedSize < originalSize) {
          // 如果压缩后变小了，保存压缩后的文件
          await fs.writeFile(outputPath, compressedBuffer);
          totalFinalSize += compressedSize;
          const savedRatio = (
            ((originalSize - compressedSize) / originalSize) *
            100
          ).toFixed(2);
          console.log(`  - 压缩后大小: ${formatBytes(compressedSize)}`);
          console.log(`  - ✅ 压缩成功，节省了 ${savedRatio}%`);
        } else {
          // 如果压缩后没有变小（或变大了），直接复制原文件
          await fs.copyFile(inputPath, outputPath);
          totalFinalSize += originalSize;
          console.log(`  - 压缩后大小: ${formatBytes(originalSize)}`);
          console.log(`  - ⚠️ 优化无效，已复制原文件。原文件已是最佳状态。`);
        }
      } catch (err) {
        console.error(`处理文件 ${file} 时发生错误:`, err.message);
      }
    }

    console.log("\n-----------------------------------------");
    console.log("🎉 所有图片处理完成！");
    console.log("--- 压缩结果统计 ---");
    console.log(`总原始大小: ${formatBytes(totalOriginalSize)}`);
    console.log(`总输出大小: ${formatBytes(totalFinalSize)}`);
    const totalSavedRatio =
      totalOriginalSize > 0
        ? (
            ((totalOriginalSize - totalFinalSize) / totalOriginalSize) *
            100
          ).toFixed(2)
        : 0;
    console.log(`总共节省空间: ${totalSavedRatio}%`);
    console.log("-----------------------------------------");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`错误: 找不到指定的文件夹路径 "${INPUT_FOLDER_PATH}"`);
    } else {
      console.error("发生未知错误:", error);
    }
  }
}

// 运行主函数
processImages();
