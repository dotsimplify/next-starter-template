export const markdownStyleObj = {
  p: ({ node, ...props }) => (
    <div
      style={{
        fontSize: "1rem",
        lineHeight: "2rem",
        width: "100%",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
      }}
      {...props}
    ></div>
  ),
  a: ({ node, ...props }) => (
    <a
      style={{
        color: "#2734f4",
        fontWeight: 600,
      }}
      {...props}
    ></a>
  ),
  h1: ({ node, ...props }) => (
    <h1
      style={{
        fontSize: "1.8rem",
        lineHeight: "2rem",
        width: "100%",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
      {...props}
    ></h1>
  ),
  h2: ({ node, ...props }) => (
    <h2
      style={{
        fontSize: "1.5rem",
        lineHeight: "2rem",
        width: "100%",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
      {...props}
    ></h2>
  ),
  h3: ({ node, ...props }) => (
    <h3
      style={{
        fontSize: "1.4rem",
        lineHeight: "2rem",
        width: "100%",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
      {...props}
    ></h3>
  ),

  h4: ({ node, ...props }) => (
    <h4
      style={{
        fontSize: "1.3rem",
        lineHeight: "2rem",
        width: "100%",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
      {...props}
    ></h4>
  ),

  h5: ({ node, ...props }) => (
    <h5
      style={{
        fontSize: "1.1rem",
        lineHeight: "2rem",
        width: "100%",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
      {...props}
    ></h5>
  ),
  h6: ({ node, ...props }) => (
    <h6
      style={{
        fontSize: "1rem",
        lineHeight: "2rem",
        width: "100%",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
      {...props}
    ></h6>
  ),

  ul: ({ node, ...props }) => (
    <ul
      style={{
        listStyleType: "disc",
        paddingLeft: "10px",
        paddingTop: "8px",
        paddingBottom: "8px",
        fontSize: "1.2rem",
        fontWeight: 500,
      }}
      {...props}
    ></ul>
  ),
  li: ({ node, ...props }) => (
    <li
      style={{
        paddingBottom: "6px",
      }}
      {...props}
    ></li>
  ),
  strong: ({ node, ...props }) => (
    <strong
      style={{
        color: "#116466",
        fontWeight: "bold",
      }}
      {...props}
    ></strong>
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      style={{
        borderLeft: "solid 4px #9e9e9e",
        color: "#116466",
        marginLeft: "1rem",
        fontStyle: "italic",
        marginTop: "12px",
        marginBottom: "1rem",
      }}
      {...props}
    ></blockquote>
  ),
  img: ({ node, ...props }) => (
    <img
      style={{
        borderRadius: "5px",
        marginTop: "6px",
        marginBottom: "6px",
        width: "100%",
      }}
      {...props}
    ></img>
  ),
};
