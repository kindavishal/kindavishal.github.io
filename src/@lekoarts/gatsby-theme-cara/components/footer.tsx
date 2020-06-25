/** @jsx jsx */
import { Box, Flex, Link, useColorMode, jsx } from "theme-ui";

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const toggleColorMode = (e: any) => {
    setColorMode(isDark ? `light` : `dark`);
  };

  return (
    <Box as="footer" variant="footer">
      <button
        sx={{
          variant: `buttons.toggle`,
          fontWeight: `semibold`,
          display: `block`,
          mx: `auto`,
          mb: 3,
        }}
        onClick={toggleColorMode}
        type="button"
        aria-label="Toggle dark mode"
      >
        {isDark ? `Light` : `Dark`}
      </button>
      Copyright &copy; {new Date().getFullYear()}. All rights reserved.
      <br />
      <Flex
        sx={{
          justifyContent: `center`,
          alignItems: `center`,
          mt: 3,
          color: `text`,
          fontWeight: `semibold`,
          a: { color: `text` },
        }}
      >
        <div>
          Inspired from{" "}
          <Link
            aria-label="Link to the theme's GitHub repository"
            href="https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-cara"
          >
            Cara by LekoArts{" "}
            <span role="img" aria-label="Rocket emoji">
              🚀
            </span>
          </Link>
          <div>
            {" "}
            Remixed by kindavishal{" "}
            <span role="img" aria-label="Sparkles emoji">
              ✨
            </span>
          </div>
        </div>
      </Flex>
    </Box>
  );
};

export default Footer;
