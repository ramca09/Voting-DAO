// import { Box } from '@pancakeswap/uikit'
// import styled from 'styled-components'
// import { useTranslation } from '@pancakeswap/localization'
import Link from 'next/link'

// const StyledFooter = styled(Box)`
//   background: ${({ theme }) => theme.colors.gradientBubblegum};
//   padding-bottom: 32px;
//   padding-top: 32px;
//   margin-top: 32px;
// `

const Footer = () => {
  // const { t } = useTranslation()

  return (
    <footer className="footer-area bg-gradient2 py-10 relative">
      <div className="container">
        <div className="text-center mb-16" data-aos="fade-up">
          <button type="button" className="button2 inline-block">
            <Link href="/">
              <img src="assets/images/footer-button.png" alt="title" />
            </Link>
          </button>
        </div>
        <ul className="flex items-center justify-center" style={{ listStyle: 'none' }}>
          <li>
            <button
              type="button"
              className="footer-social-icon rounded-full bg-coolGray-800 hover:bg-coolGray-100 flex items-center justify-center m-2 transition duration-500"
            >
              <Link href="/">
                <img src="assets/images/social-icon1.svg" alt="title" />
              </Link>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="footer-social-icon rounded-full bg-coolGray-800 hover:bg-coolGray-100 flex items-center justify-center m-2 transition duration-500"
            >
              <Link href="/">
                <img src="assets/images/social-icon2.svg" alt="title" />
              </Link>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="footer-social-icon rounded-full bg-coolGray-800 hover:bg-coolGray-100 flex items-center justify-center m-2 transition duration-500"
            >
              <Link href="/">
                <img src="assets/images/social-icon3.svg" alt="title" />
              </Link>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="footer-social-icon rounded-full bg-coolGray-800 hover:bg-coolGray-100 flex items-center justify-center m-2 transition duration-500"
            >
              <Link href="/">
                <img src="assets/images/social-icon4.svg" alt="title" />
              </Link>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="footer-social-icon rounded-full bg-coolGray-800 hover:bg-coolGray-100 flex items-center justify-center m-2 transition duration-500"
            >
              <Link href="/">
                <img src="assets/images/social-icon5.svg" alt="title" />
              </Link>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="footer-social-icon rounded-full bg-coolGray-800 hover:bg-coolGray-100 flex items-center justify-center m-2 transition duration-500"
            >
              <Link href="/">
                <img src="assets/images/social-icon6.svg" alt="title" />
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
