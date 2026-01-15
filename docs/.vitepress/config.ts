import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Vanta Documentation",
  description: "Powering Discord Communities with Scalable Enterprise Solutions",
  lang: 'en-US',
  cleanUrls: true,
  ignoreDeadLinks: true,

  themeConfig: {
    logo: "/logo-big.png",
    siteTitle: "Vanta",

    // Search config
    search: {
      provider: "local",
    },

    // Navbar Links
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

    // Social Links
    socialLinks: [
      { icon: "github", link: "https://github.com/vantadevelopment" },
      { icon: "twitter", link: "https://x.com/VantaDev" },
      { icon: "youtube", link: "https://www.youtube.com/@vantadevelopment" },
      { icon: "discord", link: "https://discord.gg/wgF5mRyCgW" },
    ],

    // Sidebar with collapsible groups
    sidebar: [
      {
        text: "Vanta Panel",
        collapsible: true,
        collapsed: false, // default open
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

    // Footer
    footer: {
      message: "",
      copyright: "Copyright © 2025 Vanta Development",
    },

    // Doc Footer navigation
    docFooter: {
      prev: false,
      next: true,
    },

    // Edit link
    editLink: {
      pattern: 'https://github.com/vantadevelopment/documentation/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // Markdown settings
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    },

    // Mobile labels
    returnToTopLabel: 'Go to Top',
    sidebarMenuLabel: 'Menu',
  },

  // Custom theme folder (only import CSS, don't override theme JS)
  theme: './theme', // your theme folder must have index.ts importing DefaultTheme + custom.css
})
