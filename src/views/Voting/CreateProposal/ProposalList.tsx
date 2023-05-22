import { Flex } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { Proposals } from '../components/Proposals'
// import  { Dashboard } from './components/Dashboard'

const Chrome = styled.div`
  flex: none;
`

const Content = styled.div`
  flex: 1;
  height: 100%;
`

const ProposalList = () => {
  return (
    <>
      <PageMeta />
      <Flex flexDirection="column" minHeight="calc(100vh - 64px)" style={{backgroundImage: 'url(/assets/images/banner-image.jpg)', backgroundPosition: "center", backgroundSize: "cover"}}>
        <Chrome>
          <Hero />
        </Chrome>
        <Content>
          <Proposals />
        </Content>
        <Chrome>
          <Footer />
        </Chrome>
      </Flex>
    </>
  )
}

export default ProposalList
