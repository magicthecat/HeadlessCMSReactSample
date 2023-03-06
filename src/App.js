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

const Quote = ({ id, quote, author }) => {
  return (
    <div id={id} className="quote">
      <p className="quote-text">{quote}</p>
      <p className="quote-author">{author}</p>
    </div>
  );
};

const Heading = ({ item }) => {
  return React.createElement(
    `h${item.level}`,
    { key: item.id, id: item.id },
    item.content
  );
};

const Paragraph = ({ id, content }) => {
  return <p id={id}>{content}</p>;
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
        content: "Welcome to our website!"
      },
      {
        id: 2,
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et turpis libero. Nulla facilisi. Donec vitae convallis orci, at luctus lacus. Phasellus eget nunc est. Cras et posuere felis, eu lacinia odio. Donec at quam et enim posuere tincidunt a a ante. Duis vitae ligula eu eros dignissim maximus. Praesent venenatis, sapien vel facilisis tristique, libero turpis eleifend justo, id rhoncus arcu augue quis mauris. Aenean pellentesque elit eget odio maximus iaculis. Sed porta a nibh ac sodales. Aliquam et lorem vitae nulla pretium aliquam."
      },
      {
        id: 3,
        type: "quote",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        author: "John Doe"
      },
      {
        id: 4,
        type: "image",
        src: "https://example.com/image.jpg",
        alt: "Example Image",
        caption: "This is an example image"
      }
    ]
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
        content: "Our Services"
      },
      {
        id: 2,
        type: "paragraph",
        content: "We offer a range of services to meet your needs."
      },
      {
        id: 3,
        type: "heading",
        level: 3,
        content: "Service 1"
      },
      {
        id: 4,

        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel metus malesuada, pulvinar nisl vel, fringilla felis."
      },
      {
        id: 5,
        type: "heading",
        level: 3,
        content: "Service 2"
      },
      {
        id: 6,
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel metus malesuada, pulvinar nisl vel, fringilla felis."
      },
      {
        id: 7,
        type: "heading",
        level: 3,
        content: "Service 3"
      },
      {
        id: 8,
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel metus malesuada, pulvinar nisl vel, fringilla felis."
      }
    ]
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
        content: "Who We Are"
      },
      {
        id: 2,
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et turpis libero. Nulla facilisi. Donec vitae convallis orci, at luctus lacus. Phasellus eget nunc est. Cras et posuere felis, eu lacinia odio. Donec at quam et enim posuere tincidunt a a ante. Duis vitae ligula eu eros dignissim maximus. Praesent venenatis, sapien vel facilisis tristique, libero turpis eleifend justo, id rhoncus arcu augue quis mauris. Aenean pellentesque elit eget odio maximus iaculis. Sed porta a nibh ac sodales. Aliquam et lorem vitae nulla pretium aliquam."
      },
      {
        id: 3,
        type: "list",
        ordered: false,
        items: ["Item 1", "Item 2", "Item 3"]
      }
    ]
  }
];

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

      //<img key={index} src={item.src} alt={item.alt} />;
      case "link":
        return <Link item={item} />;
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
          {samplePages.map((page) => (
            <li className="nav-item" key={page.slug}>
              <PageLink href={page.slug}>{page.title}</PageLink>
            </li>
          ))}
        </ul>
      </BelowBreakpoint>
    </nav>
  );
};

export default function App() {
  return (
    <div>
      <Navigation pageData={samplePages} />

      {samplePages.map((page) => (
        <Route key={page.slug} path={page.slug}>
          <h1>{page.title}</h1>
          <ConvertToJSX data={page.content} />
        </Route>
      ))}
    </div>
  );
}
