import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
// import Flex from "../../components/Box/Flex";
// import Footer from "../../components/Footer";
// import MenuItems from "../../components/MenuItems/MenuItems";
// import { SubMenuItems } from "../../components/SubMenuItems";
import { useMatchBreakpoints } from "../../contexts";
// import CakePrice from "../../components/CakePrice/CakePrice";
// import Logo from "./components/Logo";
import { MENU_HEIGHT /* , MOBILE_MENU_HEIGHT */, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { NavProps } from "./types";
// import LangSelector from "../../components/LangSelector/LangSelector";
import { MenuContext } from "./context";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

/* const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  transform: translate3d(0, 0, 0);

  padding-left: 16px;
  padding-right: 16px;
`;

const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`; */

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`;

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  rightSide,
  // isDark,
  // toggleTheme,
  // currentLang,
  // setLang,
  // cakePriceUsd,
  links,
  subLinks,
  // footerLinks,
  activeItem,
  activeSubItem,
  // langs,
  // buyCakeLabel,
  children,
}) => {
  const { isMobile /* , isMd */ } = useMatchBreakpoints();
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  // const homeLink = links.find((link) => link.label === "Home");

  // const subLinksWithoutMobile = subLinks?.filter((subLink) => !subLink.isMobileOnly);
  // const subLinksMobileOnly = subLinks?.filter((subLink) => subLink.isMobileOnly);

  return (
    <MenuContext.Provider value={{ linkComponent }}>
      <Wrapper>
        <nav
          className="header-nav flex items-center justify-between relative"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "auto",
            padding: "20px",
          }}
        >
          <div className="header-logo">
            <Link href="/" className="flex items-center flex-shrink-0">
              <img src="/assets/images/brand-logo.png" alt="header-logo" style={{ cursor: "pointer" }} />
            </Link>
          </div>
          <div className="flex-grow lg:flex lg:items-center lg:w-auto">
            <ul
              style={{ listStyle: "none" }}
              className="toggle-menu-class justify-end bg-image-menu bg-transparent shadow lg:shadow-none absolute lg:relative inset-x-0 hidden lg:flex lg:flex-grow items-center mt-10 lg:mt-0"
            >
              <li className="relative list-none">
                <span className="block m-4 py-2 text-coolGray-200 text-lg font-bold transition duration-500">
                  <Link href="/voting/proposal/list">Proposals</Link>
                </span>
              </li>
              <li className="relative">
                <span className="block m-4 py-2 text-coolGray-200 text-lg font-bold transition duration-500">
                  <Link href="/how-it-works">How It Works</Link>
                </span>
              </li>
              <li className="relative">
                <span className="block m-4 py-2 text-coolGray-200 text-lg font-bold transition duration-500">
                  <Link href="/voting/proposal/create">Create a Proposal</Link>
                </span>
              </li>
              <li className="relative">
                <span className="block m-4 py-2 text-coolGray-200 text-lg font-bold transition duration-500">
                  <Link href="/voting/become-a-voter">Become a Voter</Link>
                </span>
              </li>
              <li className="relative">
                {rightSide}
                {/* <a className="button block button-gradient border-2 border-white ml-3 px-3 py-3 text-coolGray-200 text-lg font-bold rounded-full shadow transition duration-500"
                           href="#">Connect Wallet</a> */}
              </li>
            </ul>
          </div>
          <button type="button" className="bg-transparent mobile-toggle block lg:hidden">
            <span className="bg-white" />
            <span className="bg-white" />
            <span className="bg-white" />
          </button>
        </nav>
        {/* <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
          {banner && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
          <StyledNav>
            <Flex>
              <Logo isDark={isDark} href={homeLink?.href ?? "/"} />
              {!isMobile && <MenuItems items={links} activeItem={activeItem} activeSubItem={activeSubItem} ml="24px" />}
            </Flex>
            <Flex alignItems="center" height="100%">
              {!isMobile && !isMd && (
                <Box mr="12px">
                  <CakePrice showSkeleton={false} cakePriceUsd={cakePriceUsd} />
                </Box>
              )}
              <Box mt="4px">
                <LangSelector
                  currentLang={currentLang}
                  langs={langs}
                  setLang={setLang}
                  buttonScale="xs"
                  color="textSubtle"
                  hideLanguage
                />
              </Box>
              {rightSide}
            </Flex>
          </StyledNav>
        </FixedContainer> */}
        <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : "0"}>
          <Inner isPushed={false} showMenu={showMenu}>
            {children}
            {/* <Footer
              items={footerLinks}
              isDark={isDark}
              toggleTheme={toggleTheme}
              langs={langs}
              setLang={setLang}
              currentLang={currentLang}
              cakePriceUsd={cakePriceUsd}
              buyCakeLabel={buyCakeLabel}
              mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
            /> */}
          </Inner>
        </BodyWrapper>
        {isMobile && <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />}
      </Wrapper>
    </MenuContext.Provider>
  );
};

export default Menu;
