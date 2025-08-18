export const products = [
  {
    id: 0,
    img: "/images/jag1.jpg",
    hoverImg: "/images/jag.jpg",
    discount: "-20%",
    name: "Storm Small Jug",
    oldPrice: "€21.97",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    newPrice: "€17.58",
    newimg:"/images/1-brand_default.jpg",
    stock: "100"
  },
  {
    id: 1,
    img: "/images/chair.jpg",
    hoverImg: "/images/chair1.jpg",
    discount: "-30%",
    name: "Elegant Vase",
    oldPrice: "€30.00",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    newPrice: "€21.00",
    newimg:"/images/1-brand_default.jpg",
    stock: "10"
  },
  {
    id: 2,
    img: "/images/table.jpg",
    hoverImg: "/images/table1.jpg",
    discount: "-10%",
    name: "Elegant Vase",
    oldPrice: "€30.00",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    newPrice: "€21.00",
    newimg:"/images/1-brand_default.jpg",
    stock: "200"
  },
  {
    id: 3,
    img: "/images/basket.jpg",
    discount: "-20%",
    name: "Elegant Vase",
    oldPrice: "€30.00",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    newPrice: "€21.00",
    newimg:"/images/1-brand_default.jpg",
    stock: "300"
  },
];

export const posters = [
  {
    id: 1,
    src: "/images/poster.jpg", 
    alt: "Poster 1",
  },
  {
    id: 2,
    src: "/images/poster1.jpg",
    alt: "Poster 2",
  },
  {
    id: 3,
    src: "/images/patti.webp",
    alt: "Poster 3",
  },
  {
    id: 4,
    src: "/images/chair3.jpg",
    alt: "Poster 4",
  },
  {
    id: 5,
    src: "/images/sofa.webp",
    alt: "Poster 5",
  },
  {
    id: 6,
    src: "/images/banner.jpg",
    alt: "Poster 6",
  }
];

// Language dropdown options
export const languageOptions = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
];

// Currency dropdown options
export const currencyOptions = [
  { code: "USD", symbol: "$", name: "USD $" },
  { code: "GBP", symbol: "£", name: "GBP £" },
  { code: "JPY", symbol: "¥", name: "JPY ¥" },
  { code: "EUR", symbol: "€", name: "EUR €" },
];

// Social media links
export const socialMediaLinks = [
  { name: "Facebook", icon: "FaFacebook", href: "/", color: "hover:text-blue-600" },
  { name: "Instagram", icon: "FaInstagram", href: "/", color: "hover:text-pink-600" },
  { name: "Twitter", icon: "FaTwitter", href: "/", color: "hover:text-blue-400" },
  { name: "Dribbble", icon: "FaBasketballBall", href: "/", color: "hover:text-pink-500" },
];

// Navigation items
export const navigationItems = [
  {
    title: "Home",
    href: "/",
    hasDropdown: true,
    dropdownItems: [
      { 
        title: "Home 1", 
        href: "/home-1"
      },
      { 
        title: "Home 2", 
        href: "/home-2"
      },
      { 
        title: "Home 3", 
        href: "/home-3"
      },
    ],
  },
  {
    title: "Shop",
    href: "/shop",
    hasDropdown: true,
    dropdownItems: [
      { 
        title: "Shop Grid", 
        href: "/shop-grid"
      },
      { 
        title: "Shop List", 
        href: "/shop-list"
      },
      { 
        title: "Product Details", 
        href: "/product-details"
      },
      { 
        title: "Shopping Cart", 
        href: "/cart",
      
      },
      { 
        title: "Checkout", 
        href: "/checkout"
      },
    ],
  },
  {
    title: "Pages",
    href: "/pages",
    hasDropdown: true,
    dropdownItems: [
      { 
        title: "About Us", 
        href: "/about"
      },
      { 
        title: "Our Team", 
        href: "/team"
      },
      { 
        title: "Services", 
        href: "/services"
      },
      { 
        title: "FAQ", 
        href: "/faq"
      },
      { 
        title: "404 Page", 
        href: "/404"
      },
    ],
  },
  {
    title: "Collections",
    href: "/collections",
    hasDropdown: true,
    dropdownItems: [
      { 
        title: "Furniture", 
        href: "/collections/furniture",
        badge: "Hot"
      },
      { 
        title: "Lighting", 
        href: "/collections/lighting"
      },
      { 
        title: "Decor", 
        href: "/collections/decor"
      },
      { 
        title: "Kitchen", 
        href: "/collections/kitchen"
      },
      { 
        title: "Bathroom", 
        href: "/collections/bathroom"
      },
    ],
  },
  {
    title: "Blog",
    href: "/blog",
    hasDropdown: true,
    dropdownItems: [
      { 
        title: "Blog Grid", 
        href: "/blog-grid"
      },
      { 
        title: "Blog List", 
        href: "/blog-list"
      },
      { 
        title: "Blog Single", 
        href: "/blog-single"
      },
      { 
        title: "Blog Sidebar", 
        href: "/blog-sidebar"
      },
    ],
  }
];

export const productss = [
  {
    id: 4,
    img: "/images/jag1.jpg",
    hoverImg: "/images/jag.jpg",
    discount: "-20%",
    name: "Storm Small Jug",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    oldPrice: "€21.97",
    newPrice: "€17.58",
    newimg:"/images/1-brand_default.jpg",
    stock: "100"
  },
  {
    id: 5,
    img: "/images/table.jpg",
    hoverImg: "/images/table1.jpg",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    discount: "-10%",
    name: "Elegant Vase",
    oldPrice: "€30.00",
    newPrice: "€21.00",
    newimg:"/images/1-brand_default.jpg",
    stock: "100"
    
  },
  {
    id: 6,
    img: "/images/lamp.jpg",
    hoverImg: "/images/lamp1.jpg",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    discount: "-20%",
    name: "Elegant Vase",
    oldPrice: "€30.00",
    newPrice: "€21.00",
    newimg:"/images/1-brand_default.jpg",
    stock: "100"
  },
  {
    id: 7,
    img: "/images/chairbig.jpg",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    discount: "-10%",
    name: "Elegant Vase",
    oldPrice: "€30.00",
    newPrice: "€21.00",
    newimg:"/images/1-brand_default.jpg",
    stock: "180"
  },
  {
    id: 8,
    img: "/images/chair.jpg",
    hoverImg: "/images/chair1.jpg",
    discount: "-15%",
    name: "Elegant Vase",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    oldPrice: "€30.00",
    newPrice: "€21.00",
    newimg:"/images/1-brand_default.jpg",
    stock: "170"
  },
  {
    id: 9,
    img: "/images/basket.jpg",
    hoverImg: "/images/basket.jpg",
    discount: "-20%",
    name: "Elegant Vase",
    oldPrice: "€30.00",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    newPrice: "€21.00",
    newimg:"/images/1-brand_default.jpg",
    stock: "140"
  },
  {
    id: 10,
    img: "/images/jummar.jpg",
    hoverImg: "/images/jummar.jpg",
    discount: "-20%",
    name: "Elegant Vase",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    oldPrice: "€30.00",
    newPrice: "€21.00",
    newimg:"/images/1-brand_default.jpg",
    stock: "150"
  },
  {
    id: 11,
    img: "/images/smallchair1.jpg",
    hoverImg: "/images/smallchiar.jpg",
    discount: "-20%",
    name: "Elegant Vase",
    oldPrice: "€30.00",
    dicription: "The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.",
    newPrice: "€21.00",
    newimg:"/images/1-brand_default.jpg",
    stock: "20"
  }
];

export const features = [
  {
    icon: "FaPlane",
    title: "Free Worldwide Shipping",
    description: "On all orders over $75.00",
    link: "#",
  },
  {
    icon: "FaCreditCard",
    title: "100% Payment Secure",
    description: "We ensure secure payment with PEV",
    link: "#",
  },
  {
    icon: "FaUndo",
    title: "30 Days Return",
    description: "Return it within 20 day for an exchange",
    link: "#",
  },
];



export const Blogmain1 = [
  {
    id: 1,
    img: "/images/b-2.jpg",
    date: "05 Aug, 2025",
    title: "Turpis at eleifend leo mi elit Aenean porta ac sed faucibus",
    description: `Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam risus,
                  sit amet dictum ligula lorem non nisl Urna pretium elit mauris cursus Curabitur
                  at elit Vestibulum Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quas.Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam 
                  risus, sit amet dictum ligula lorem non nisl. Ut vitae nibh id massa vulputate euismod 
                  ut quis justo. Ut bibendum sem at massa lacinia, eget elementum ante consectetur. Nulla 
                  id pharetra dui, at rhoncus urna. Maecenas non porttitor purus. Nullam ullamcorper nisl 
                  quis ornare molestie.Etiam eget erat est. Phasellus elit justo, mattis non lorem non, 
                  aliquam aliquam leo. Sed fermentum consectetur magna, eget semper ante. Aliquam scelerisque 
                  justo velit. Fusce cursus blandit dolor, in sodales urna vulputate lobortis. Nulla ut tellus
                  turpis. Nullam lacus sem, volutpat id odio sed, cursus tristique eros. Duis at pellentesque 
                  magna. Donec magna nisi, vulputate ac nulla eu, ultricies tincidunt tellus. Nunc tincidunt sem 
                  urna, nec venenatis libero vehicula ut.Vestibulum ante ipsum primis in faucibus orci luctus 
                  et ultrices posuere cubilia Curae; Curabitur faucibus aliquam pulvinar. Vivamus mattis volutpat
                  erat, et congue nisi semper quis. Cras vehicula dignissim libero in elementum. Mauris sit amet
                  dolor justo. Morbi consequat velit vel est fermentum euismod. Curabitur in magna augue.`,
    
  },
  {
    id: 2,
    img: "/images/b-3.jpg",
    date: "05 Aug, 2025",
    title: "Turpis at eleifend leo mi elit Aenean porta ac sed faucibus",
    description: `Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam risus,
                  sit amet dictum ligula lorem non nisl Urna pretium elit mauris cursus Curabitur
                  at elit Vestibulum Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quas.Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam 
                  risus, sit amet dictum ligula lorem non nisl. Ut vitae nibh id massa vulputate euismod 
                  ut quis justo. Ut bibendum sem at massa lacinia, eget elementum ante consectetur. Nulla 
                  id pharetra dui, at rhoncus urna. Maecenas non porttitor purus. Nullam ullamcorper nisl 
                  quis ornare molestie.Etiam eget erat est. Phasellus elit justo, mattis non lorem non, 
                  aliquam aliquam leo. Sed fermentum consectetur magna, eget semper ante. Aliquam scelerisque 
                  justo velit. Fusce cursus blandit dolor, in sodales urna vulputate lobortis. Nulla ut tellus
                  turpis. Nullam lacus sem, volutpat id odio sed, cursus tristique eros. Duis at pellentesque 
                  magna. Donec magna nisi, vulputate ac nulla eu, ultricies tincidunt tellus. Nunc tincidunt sem 
                  urna, nec venenatis libero vehicula ut.Vestibulum ante ipsum primis in faucibus orci luctus 
                  et ultrices posuere cubilia Curae; Curabitur faucibus aliquam pulvinar. Vivamus mattis volutpat
                  erat, et congue nisi semper quis. Cras vehicula dignissim libero in elementum. Mauris sit amet
                  dolor justo. Morbi consequat velit vel est fermentum euismod. Curabitur in magna augue.`,
    
  },
  {
    id: 3,
    img: "/images/b-4.jpg",
    date: "05 Aug, 2025",
    title: "Turpis at eleifend leo mi elit Aenean porta ac sed faucibus",
    description: `Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam risus,
                  sit amet dictum ligula lorem non nisl Urna pretium elit mauris cursus Curabitur
                  at elit Vestibulum Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quas.Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam 
                  risus, sit amet dictum ligula lorem non nisl. Ut vitae nibh id massa vulputate euismod 
                  ut quis justo. Ut bibendum sem at massa lacinia, eget elementum ante consectetur. Nulla 
                  id pharetra dui, at rhoncus urna. Maecenas non porttitor purus. Nullam ullamcorper nisl 
                  quis ornare molestie.Etiam eget erat est. Phasellus elit justo, mattis non lorem non, 
                  aliquam aliquam leo. Sed fermentum consectetur magna, eget semper ante. Aliquam scelerisque 
                  justo velit. Fusce cursus blandit dolor, in sodales urna vulputate lobortis. Nulla ut tellus
                  turpis. Nullam lacus sem, volutpat id odio sed, cursus tristique eros. Duis at pellentesque 
                  magna. Donec magna nisi, vulputate ac nulla eu, ultricies tincidunt tellus. Nunc tincidunt sem 
                  urna, nec venenatis libero vehicula ut.Vestibulum ante ipsum primis in faucibus orci luctus 
                  et ultrices posuere cubilia Curae; Curabitur faucibus aliquam pulvinar. Vivamus mattis volutpat
                  erat, et congue nisi semper quis. Cras vehicula dignissim libero in elementum. Mauris sit amet
                  dolor justo. Morbi consequat velit vel est fermentum euismod. Curabitur in magna augue.`,
    
  },
  {
    id: 4,
    img: "/images/b-6.jpg",
    date: "05 Aug, 2025",
    title: "Turpis at eleifend leo mi elit Aenean porta ac sed faucibus",
    description: `Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam risus,
                  sit amet dictum ligula lorem non nisl Urna pretium elit mauris cursus Curabitur
                  at elit Vestibulum Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quas.Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam 
                  risus, sit amet dictum ligula lorem non nisl. Ut vitae nibh id massa vulputate euismod 
                  ut quis justo. Ut bibendum sem at massa lacinia, eget elementum ante consectetur. Nulla 
                  id pharetra dui, at rhoncus urna. Maecenas non porttitor purus. Nullam ullamcorper nisl 
                  quis ornare molestie.Etiam eget erat est. Phasellus elit justo, mattis non lorem non, 
                  aliquam aliquam leo. Sed fermentum consectetur magna, eget semper ante. Aliquam scelerisque 
                  justo velit. Fusce cursus blandit dolor, in sodales urna vulputate lobortis. Nulla ut tellus
                  turpis. Nullam lacus sem, volutpat id odio sed, cursus tristique eros. Duis at pellentesque 
                  magna. Donec magna nisi, vulputate ac nulla eu, ultricies tincidunt tellus. Nunc tincidunt sem 
                  urna, nec venenatis libero vehicula ut.Vestibulum ante ipsum primis in faucibus orci luctus 
                  et ultrices posuere cubilia Curae; Curabitur faucibus aliquam pulvinar. Vivamus mattis volutpat
                  erat, et congue nisi semper quis. Cras vehicula dignissim libero in elementum. Mauris sit amet
                  dolor justo. Morbi consequat velit vel est fermentum euismod. Curabitur in magna augue.`,
    
  },
  {
    id: 5,
    img: "/images/b-7.jpg",
    date: "05 Aug, 2025",
    title: "Turpis at eleifend leo mi elit Aenean porta ac sed faucibus",
    description: `Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam risus,
                  sit amet dictum ligula lorem non nisl Urna pretium elit mauris cursus Curabitur
                  at elit Vestibulum Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quas.Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam 
                  risus, sit amet dictum ligula lorem non nisl. Ut vitae nibh id massa vulputate euismod 
                  ut quis justo. Ut bibendum sem at massa lacinia, eget elementum ante consectetur. Nulla 
                  id pharetra dui, at rhoncus urna. Maecenas non porttitor purus. Nullam ullamcorper nisl 
                  quis ornare molestie.Etiam eget erat est. Phasellus elit justo, mattis non lorem non, 
                  aliquam aliquam leo. Sed fermentum consectetur magna, eget semper ante. Aliquam scelerisque 
                  justo velit. Fusce cursus blandit dolor, in sodales urna vulputate lobortis. Nulla ut tellus
                  turpis. Nullam lacus sem, volutpat id odio sed, cursus tristique eros. Duis at pellentesque 
                  magna. Donec magna nisi, vulputate ac nulla eu, ultricies tincidunt tellus. Nunc tincidunt sem 
                  urna, nec venenatis libero vehicula ut.Vestibulum ante ipsum primis in faucibus orci luctus 
                  et ultrices posuere cubilia Curae; Curabitur faucibus aliquam pulvinar. Vivamus mattis volutpat
                  erat, et congue nisi semper quis. Cras vehicula dignissim libero in elementum. Mauris sit amet
                  dolor justo. Morbi consequat velit vel est fermentum euismod. Curabitur in magna augue.`,
    
  },
  {
    id: 6,
    img: "/images/b-8.jpg",
    date: "05 Aug, 2025",
    title: "Turpis at eleifend leo mi elit Aenean porta ac sed faucibus",
    description: `Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam risus,
                  sit amet dictum ligula lorem non nisl Urna pretium elit mauris cursus Curabitur
                  at elit Vestibulum Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quas.Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam 
                  risus, sit amet dictum ligula lorem non nisl. Ut vitae nibh id massa vulputate euismod 
                  ut quis justo. Ut bibendum sem at massa lacinia, eget elementum ante consectetur. Nulla 
                  id pharetra dui, at rhoncus urna. Maecenas non porttitor purus. Nullam ullamcorper nisl 
                  quis ornare molestie.Etiam eget erat est. Phasellus elit justo, mattis non lorem non, 
                  aliquam aliquam leo. Sed fermentum consectetur magna, eget semper ante. Aliquam scelerisque 
                  justo velit. Fusce cursus blandit dolor, in sodales urna vulputate lobortis. Nulla ut tellus
                  turpis. Nullam lacus sem, volutpat id odio sed, cursus tristique eros. Duis at pellentesque 
                  magna. Donec magna nisi, vulputate ac nulla eu, ultricies tincidunt tellus. Nunc tincidunt sem 
                  urna, nec venenatis libero vehicula ut.Vestibulum ante ipsum primis in faucibus orci luctus 
                  et ultrices posuere cubilia Curae; Curabitur faucibus aliquam pulvinar. Vivamus mattis volutpat
                  erat, et congue nisi semper quis. Cras vehicula dignissim libero in elementum. Mauris sit amet
                  dolor justo. Morbi consequat velit vel est fermentum euismod. Curabitur in magna augue.`,
    
  },
  {
    id: 7,
    img: "/images/b-9.jpg",
    date: "05 Aug, 2025",
    title: "Turpis at eleifend leo mi elit Aenean porta ac sed faucibus",
    description: `Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam risus,
                  sit amet dictum ligula lorem non nisl Urna pretium elit mauris cursus Curabitur
                  at elit Vestibulum Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quas.Suspendisse posuere, diam in bibendum lobortis, turpis ipsum aliquam 
                  risus, sit amet dictum ligula lorem non nisl. Ut vitae nibh id massa vulputate euismod 
                  ut quis justo. Ut bibendum sem at massa lacinia, eget elementum ante consectetur. Nulla 
                  id pharetra dui, at rhoncus urna. Maecenas non porttitor purus. Nullam ullamcorper nisl 
                  quis ornare molestie.Etiam eget erat est. Phasellus elit justo, mattis non lorem non, 
                  aliquam aliquam leo. Sed fermentum consectetur magna, eget semper ante. Aliquam scelerisque 
                  justo velit. Fusce cursus blandit dolor, in sodales urna vulputate lobortis. Nulla ut tellus
                  turpis. Nullam lacus sem, volutpat id odio sed, cursus tristique eros. Duis at pellentesque 
                  magna. Donec magna nisi, vulputate ac nulla eu, ultricies tincidunt tellus. Nunc tincidunt sem 
                  urna, nec venenatis libero vehicula ut.Vestibulum ante ipsum primis in faucibus orci luctus 
                  et ultrices posuere cubilia Curae; Curabitur faucibus aliquam pulvinar. Vivamus mattis volutpat
                  erat, et congue nisi semper quis. Cras vehicula dignissim libero in elementum. Mauris sit amet
                  dolor justo. Morbi consequat velit vel est fermentum euismod. Curabitur in magna augue.`,
    
  }
];

export const brandlogo = [
    {
      id: 1,
      img: "/images/1-brand_default.jpg",
    },
    {
      id: 2,
      img: "/images/2-brand_default.jpg",
    },
    {
      id: 3,
      img: "/images/3-brand_default.jpg",
    },
    {
      id: 4,
      img: "/images/4-brand_default.jpg",
    },
    {
      id: 5,
      img: "/images/5-brand_default.jpg",
    },
    {
      id: 6,
      img: "/images/6-brand_default.jpg",
    }
  
];

export const follow = [
  {
    id: 1,
    img: "/images/i1.jpg",
  },
  {
    id: 2,
    img: "/images/i2.jpg",
  },
  {
    id: 3,
    img: "/images/i3.jpg",
  },
  {
    id: 4,
    img: "/images/i4.jpg",
  },
  {
    id: 5,
    img: "/images/i5.jpg",
  },
  {
    id: 6,
    img: "/images/i6.jpg",
  }
];

// footerData.js
export const footerLinks = {
  customerServices: [
    "My Account",
    "Track Your Order",
    "FAQs",
    "Payment Methods",
    "Shipping Guide",
    "Products Support",
    "Gift Card Balance",
  ],
  moreFromRubix: [
    "About Rubix",
    "Our Guarantees",
    "Terms and Conditions",
    "Privacy Policy",
    "Return Policy",
    "Delivery & Return",
    "Sitemap",
  ],
};

export const socialLinks = [
  { icon: "FaFacebookF", url: "#" },
  { icon: "FaInstagram", url: "#" },
  { icon: "FaDribbble", url: "#" },
  { icon: "FaYoutube", url: "#" },
];



