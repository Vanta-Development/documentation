export default {
  title: "Vanta Documentation",
  description: "Powering Discord Communities with Scalable Enterprise Solutions",
  lang: 'en-US',
  cleanUrls: true,
  // If this is disabled, when building it it will give deadlink errors if your markdown has the wrong links
  ignoreDeadLinks: true,

  themeConfig: {
    logo: "/logo-big.png",
    siteTitle: "Vanta",
    search: {
      provider: "local",
    },
    // Navbar Link
    nav: [
      { text: "Home", link: "/" },
      { text: "Discord", link: "#" },
      {
        text: "Products",
        items: [
          { text: "Vanta Panel", link: "/panel/intro" },
          { text: "Vanta Fivem", link: "/fivem/intro" },
        ],
      },
    ],
    // Social Icons
    socialLinks: [
      { icon: "github", link: "https://github.com/vantadevelopment" },
      { icon: "twitter", link: "#" },
      { icon: "youtube", link: "#" },
      { icon: "discord", link: "#" },
      /* {
        icon: {
          svg: '<svg role="img" width="26.01" height="32" viewBox="0 0 256 315"><path d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615c-.35 1.116-6.599 22.563-21.757 44.716c-13.104 19.153-26.705 38.235-48.13 38.63c-21.05.388-27.82-12.483-51.888-12.483c-24.061 0-31.582 12.088-51.51 12.871c-20.68.783-36.428-20.71-49.64-39.793c-27-39.033-47.633-110.3-19.928-158.406c13.763-23.89 38.36-39.017 65.056-39.405c20.307-.387 39.475 13.662 51.889 13.662c12.406 0 35.699-16.895 60.186-14.414c10.25.427 39.026 4.14 57.503 31.186c-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199c-15.826.636-34.962 10.546-46.314 23.828c-10.173 11.763-19.082 30.589-16.678 48.633c17.64 1.365 35.66-8.964 46.64-22.262"/></svg>',
        },
        link: "https://google.com",
      }, */
    ],
    // Sidebar
    sidebar: [
      {
        text: "Vanta Panel",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/panel/intro" },
        ],
      },
            {
        text: "Vanta Fivem",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/fivem/intro" },
          { text: "Setup", link: "/fivem/setup" },
        ],
      },
    ],
    // you can disable the previous and next page here
    docFooter: {
      prev: false,
      next: true,
    },
    editLink: {
      pattern: 'https://github.com/vantadevelopment/documentation/edit/production/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: "",
      copyright: "Copyright © 2025 Vanta Development",
    },
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    },
    // Mobile Config only
    returnToTopLabel: 'Go to Top',
    sidebarMenuLabel: 'Menu',
  },
};
