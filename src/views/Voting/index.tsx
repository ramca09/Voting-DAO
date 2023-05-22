import { Flex } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import styled from 'styled-components'
import Footer from './components/Footer'
// import  { Dashboard } from './components/Dashboard'
import Dashboard from './components/Dashboard'

const Chrome = styled.div`
  flex: none;
`

const Content = styled.div`
  flex: 1;
  height: 100%;
`

const Voting = () => {
  return (
    <>
      <PageMeta />
      <Flex
        flexDirection="column"
        minHeight="calc(100vh - 64px)"
        style={{
          backgroundImage: 'url(/assets/images/banner-image.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* <Chrome>
          <Hero />
        </Chrome> */}
        <Content>
          {/* <Proposals /> */}
          <Dashboard />
        </Content>
        <Chrome>
          <Footer />
        </Chrome>
      </Flex>
    </>
  )
}

export default Voting
