import "./styles.css";
import "./hamburger.css";
import "./menuicon.css";
import React, { useEffect, useState } from "react";
import { Route, Switch, Link as PageLink } from "wouter";

function BelowBreakpoint({ breakpoint, children }) {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsBelowBreakpoint(window.innerWidth < breakpoint);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  if (isBelowBreakpoint) {
    return children[0];
  } else {
    return children[1];
  }
}

class StyleClass {
  constructor() {
    this.styles = {
      heading: `
        background-color: blue;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
      `,
      paragraph: `font-size: 1rem;
    line-height: 1.5rem;
    margin-bottom: 1rem;
  `,
    };
  }

  getCamelCaseStyle(name) {
    const styleString = this.styles[name] || "";
    const styleObject = {};
    const properties = styleString.trim().split(";");
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i].trim();
      if (!property) continue;
      const [key, value] = property.split(":");
      const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) =>
        letter.toUpperCase()
      );
      styleObject[camelCaseKey] = value.trim();
    }
    return styleObject;
  }
}

function convertCSS(cssString) {
  const cssObj = {};
  const cssRules = cssString.split(";");
  cssRules.pop(); // Remove last empty element from split

  cssRules.forEach((rule) => {
    const [property, value] = rule.split(":").map((str) => str.trim());
    const camelCaseProperty = property.replace(/-([a-z])/g, (match, char) =>
      char.toUpperCase()
    );
    cssObj[camelCaseProperty] = value;
  });

  return cssObj;
}

const data = [
  {
    name: "The Shawshank Redemption",
    type: "movie",
    year: 1994,
    director: "Frank Darabont",
  },
  {
    name: "The Godfather",
    type: "movie",
    year: 1972,
    director: "Francis Ford Coppola",
  },
  {
    name: "The Dark Knight",
    type: "movie",
    year: 2008,
    director: "Christopher Nolan",
  },
];

function convertDataToCards(data) {
  const cards = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const cardItems = [];

    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const currentItem = {
          label: key.charAt(0).toUpperCase() + key.slice(1),
          value: item[key],
        };
        const paragraphContent = `${currentItem.label}: ${currentItem.value}`;
        cardItems.push({
          type: "paragraph",
          content: paragraphContent,
        });
      }
    }

    const card = {
      id: i + 1,
      type: "card",
      items: [
        {
          type: "heading",
          level: 2,
          content: item.name,
        },
        ...cardItems,
      ],
    };

    cards.push(card);
  }

  return cards;
}

const cards = convertDataToCards(data);

console.log(cards);

const Quote = ({ id, quote, author }) => {
  return (
    <div id={id} className="quote">
      <p className="quote-text">{quote}</p>
      <p className="quote-author">{author}</p>
    </div>
  );
};

const Heading = ({ item }) => {
  const myStyles = new StyleClass();
  const headingStyle = myStyles.getCamelCaseStyle(Heading.name.toLowerCase());

  const component = React.createElement(
    `h${item.level}`,
    { key: item.id, id: item.id, style: headingStyle },
    item.content
  );

  return component;
};

const Paragraph = ({ id, content }) => {
  const myStyles = new StyleClass();
  const paragraphStyle = myStyles.getCamelCaseStyle(
    Paragraph.name.toLowerCase()
  );

  return (
    <>
      <p id={id} style={paragraphStyle}>
        {content}
      </p>
    </>
  );
};

const List = ({ id, isOrdered, itemlist }) => {
  const ListElement = isOrdered ? "ol" : "ul";
  return React.createElement(
    ListElement,
    { key: id, id: id },
    itemlist.map((listItem, listIndex) => (
      <li id={listIndex} key={listIndex}>
        {listItem}
      </li>
    ))
  );
};

const Image = ({ item }) => {
  return <img id={item.id} src={item.src} alt={item.alt} />;
};

const Link = ({ item }) => {
  return (
    <a id={item.id} referrerpolicy="origin" href={item.href} target="_blank">
      {item.content}
    </a>
  );
};

const Card = ({ itemlist }) => {
  const className = Card.name.toLowerCase();
  const renderedItems = itemlist.map((item, index) => {
    switch (item.type) {
      case "heading":
        return <Heading item={item} />;
      case "paragraph":
        return <Paragraph content={item.content} id={item.id} />;
      case "link":
        return <Link item={item} />;
      // Add additional cases here for other types of content objects
      default:
        return null; // Ignore unknown content types
    }
  });

  return <section className={className}>{renderedItems}</section>;
};

const ConvertToJSX = ({ data }) => {
  return data.map((item) => {
    switch (item.type) {
      case "heading":
        return <Heading item={item} />;
      case "text":
        return <Paragraph id={item.id} content={item.content} />;
      case "paragraph":
        return <Paragraph id={item.id} content={item.content} />; //React.createElement(`p`, { key: index }, item.content);
      case "quote":
        return <Quote id={item.id} quote={item.content} author={item.author} />;
      case "list":
        return (
          <List id={item.id} isOrdered={item.ordered} itemlist={item.items} />
        );
      case "image":
        return <Image item={item} />;

      case "link":
        return <Link item={item} />;
      case "card":
        return <Card id={item.id} itemlist={item.items} />;
      default:
        return null;
    }
  });
};

function HamburgerMenu({ samplePages }) {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <nav>
      <button class="navbar-toggler" onClick={toggleMenu}>
        <span class="navbar-toggler-icon">&#9776;</span>
      </button>

      {showMenu && (
        <div className="menu-overlay">
          <div className="menu">
            <div className="close" onClick={toggleMenu}>
              <div></div>
              <div></div>
            </div>

            <ul>
              {samplePages.map((page) => (
                <li key={page.slug}>
                  <PageLink href={page.slug}>{page.title}</PageLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

const Navigation = ({ pageData }) => {
  return (
    <nav className="navbar">
      <BelowBreakpoint breakpoint={768}>
        <HamburgerMenu samplePages={samplePages} />
        <ul className="navbar-nav">
          {pageData.map((page) => (
            <li className="nav-item" key={page.slug}>
              <PageLink href={page.slug}>{page.title}</PageLink>
            </li>
          ))}
        </ul>
      </BelowBreakpoint>
    </nav>
  );
};

const PageTemplate = ({ page }) => {
  return (
    <Route key={page.slug} path={page.slug}>
      <h1>{page.title}</h1>
      <ConvertToJSX data={page.content} />
    </Route>
  );
};

const samplePages = [
  {
    id: 1,
    title: "Homepage",
    slug: "/",
    content: [
      {
        id: 1,
        type: "heading",
        level: 1,
        content: "Welcome to our website!",
      },
      {
        id: 2,
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et turpis libero. Nulla facilisi. Donec vitae convallis orci, at luctus lacus. Phasellus eget nunc est. Cras et posuere felis, eu lacinia odio. Donec at quam et enim posuere tincidunt a a ante. Duis vitae ligula eu eros dignissim maximus. Praesent venenatis, sapien vel facilisis tristique, libero turpis eleifend justo, id rhoncus arcu augue quis mauris. Aenean pellentesque elit eget odio maximus iaculis. Sed porta a nibh ac sodales. Aliquam et lorem vitae nulla pretium aliquam.",
      },
      {
        id: 3,
        type: "quote",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        author: "John Doe",
      },
      {
        id: 4,
        type: "image",
        src: "https://example.com/image.jpg",
        alt: "Example Image",
        caption: "This is an example image",
      },
      {
        id: 2,
        type: "card",
        items: [
          { type: "heading", level: 2, content: "The Godfather" },
          { type: "paragraph", content: "Type: movie" },
          { type: "paragraph", content: "Year: 1972" },
          { type: "paragraph", content: "Director: Francis Ford Coppola" },
        ],
      },
      {
        id: 3,
        type: "card",
        items: [
          { type: "heading", level: 2, content: "The Dark Knight" },
          { type: "paragraph", content: "Type: movie" },
          { type: "paragraph", content: "Year: 2008" },
          { type: "paragraph", content: "Director: Christopher Nolan" },
        ],
      },
      {
        id: 5,
        type: "card",
        items: [
          {
            type: "heading",
            level: 2,
            content: "Card Heading",
          },
          {
            type: "paragraph",
            content: "This is a paragraph in the card.",
          },
          {
            type: "link",
            href: "https://example.com",
            content: "Visit Example.com",
          },
        ],
      },
    ],
  },
  {
    id: "our-services",
    title: "Our Services",
    slug: "/our-services",
    content: [
      {
        id: 1,
        type: "heading",
        level: 3,
        content: "Our Services",
      },
      {
        id: 2,
        type: "paragraph",
        content: "We offer a range of services to meet your needs.",
      },
      {
        id: 3,
        type: "heading",
        level: 3,
        content: "Service 1",
      },
      {
        id: 4,

        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel metus malesuada, pulvinar nisl vel, fringilla felis.",
      },
      {
        id: 5,
        type: "heading",
        level: 3,
        content: "Service 2",
      },
      {
        id: 6,
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel metus malesuada, pulvinar nisl vel, fringilla felis.",
      },
      {
        id: 7,
        type: "heading",
        level: 3,
        content: "Service 3",
      },
      {
        id: 8,
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel metus malesuada, pulvinar nisl vel, fringilla felis.",
      },
    ],
  },
  {
    id: 2,
    title: "About Us",
    slug: "/about",
    content: [
      {
        id: 1,
        type: "heading",
        level: 1,
        content: "Who We Are",
      },
      {
        id: 2,
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et turpis libero. Nulla facilisi. Donec vitae convallis orci, at luctus lacus. Phasellus eget nunc est. Cras et posuere felis, eu lacinia odio. Donec at quam et enim posuere tincidunt a a ante. Duis vitae ligula eu eros dignissim maximus. Praesent venenatis, sapien vel facilisis tristique, libero turpis eleifend justo, id rhoncus arcu augue quis mauris. Aenean pellentesque elit eget odio maximus iaculis. Sed porta a nibh ac sodales. Aliquam et lorem vitae nulla pretium aliquam.",
      },
      {
        id: 3,
        type: "list",
        ordered: false,
        items: ["Item 1", "Item 2", "Item 3"],
      },
    ],
  },
];

export default function App() {
  const childStyles = [];

  function collectChildStyles(childStyleString) {
    childStyles.push(childStyleString);
  }

  return (
    <div>
      <Navigation pageData={samplePages} />
      {samplePages.map((page) => (
        <PageTemplate page={page} />
      ))}
    </div>
  );
}
