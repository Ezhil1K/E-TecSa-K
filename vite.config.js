import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const GA_ID = 'G-M7SLMR3FY8'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-google-analytics',
      transformIndexHtml(html) {
        const gaScript = [
          '<\!-- Google Analytics -->',
          '<script async src="https://www.googletagmanager.com/gtag/js?id=' + GA_ID + '"></script>',
          '<script>',
          '  window.dataLayer = window.dataLayer || [];',
          '  function gtag(){dataLayer.push(arguments);}',
          '  gtag("js", new Date());',
          '  gtag("config", "' + GA_ID + '");',
          '</script>',
        ].join('\n    ')
        return html.replace('<head>', '<head>\n    ' + gaScript)
      },
    },
  ],
  base: './',
})
