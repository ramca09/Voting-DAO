import { useMemo } from 'react'
import { Menu as UikitMenu } from '@pancakeswap/uikit'
import { useTranslation, languageList } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import UserMenu from './UserMenu'

const Menu = (props) => {
  const { isDark, setTheme } = useTheme()
  const { currentLanguage, setLanguage, t } = useTranslation()

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  return (
    <>
      <UikitMenu
        linkComponent={() => {
          // return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
        }}
        rightSide={
          <>
            {/* <GlobalSettings mode={SettingsMode.GLOBAL} /> */}
            {/* <NetworkSwitcher /> */}
            <UserMenu />
          </>
        }
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        links={[]}
        subLinks={[]}
        footerLinks={[]}
        activeItem=""
        activeSubItem=""
        buyCakeLabel={t('Buy Token')}
        {...props}
      />
    </>
  )
}

export default Menu
