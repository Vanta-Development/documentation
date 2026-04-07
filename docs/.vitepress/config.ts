import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Vanta Documentation",
  description: "Powering Discord Communities with Scalable Enterprise Solutions",
  lang: 'en-US',
  cleanUrls: true,
  ignoreDeadLinks: true,

  markdown: {
    theme: "material-theme-palenight",
    lineNumbers: true,
  },

  themeConfig: {
    logo: "/logo-big.png",
    siteTitle: "Vanta",

    search: {
      provider: "local",
    },

    nav: [
      { text: "Home", link: "/" },
      { text: "Discord", link: "https://discord.gg/wgF5mRyCgW" },
      {
        text: "Products",
        items: [
          { text: "Vanta Panel", link: "/panel/intro" },
          { text: "Vanta Fivem", link: "/fivem/intro" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vantadevelopment" },
      { icon: "twitter", link: "https://x.com/VantaDev" },
      { icon: "youtube", link: "https://www.youtube.com/@vantadevelopment" },
      { icon: "discord", link: "https://discord.gg/wgF5mRyCgW" },
    ],

    sidebar: [
      {
        text: "Vanta Panel",
        collapsible: true,
        collapsed: false,
        items: [
          { text: "Introduction", link: "/panel/intro" },
          { text: "Setup", link: "/panel/setup" },
        ],
      },
      {
        text: "Vanta Fivem",
        collapsible: true,
        collapsed: false,
        items: [
          { text: "Introduction", link: "/fivem/intro" },
          { text: "Setup", link: "/fivem/setup" },
        ],
      },
    ],

    footer: {
      message: "",
      copyright: "Copyright © 2025 Vanta Development",
    },

    docFooter: {
      prev: false,
      next: true,
    },

    editLink: {
      pattern: 'https://github.com/vantadevelopment/documentation/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    returnToTopLabel: 'Go to Top',
    sidebarMenuLabel: 'Menu',
  },
})