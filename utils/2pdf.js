const path = require('path')
const initPuppeteerPool = require('./puppeteer-pool.js')

const pool = initPuppeteerPool({
  puppeteerArgs: {
    args: ['--no-sandbox'],
    headless: true
  }
})

module.exports.handlePdf = async function (query = '?') {
  const page = await pool.use(async (instance) => {
    const newPage = await instance.newPage()
    await newPage.goto(`file:///${path.resolve('./pdf')}/index.html?` + query, { waitUntil: 'networkidle0' })
    const options2 = {
      format: 'A4', // 这个会让height失效
      scale: 1,
      pageRanges: '1-5',
      printBackground: true, // 是否打印背景颜色
      '-webkit-print-color-adjust': 'exact'
    }
    const pdf = await newPage.pdf(options2)
    // 关闭页面
    if (newPage) {
      await newPage.close()// 完成后关闭页面相当于关闭浏览器tab，会杀死页面进程
    }
    return pdf
  })
  return page
}
