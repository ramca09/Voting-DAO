import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
// import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import Link from 'next/link'

const StyledHero = styled(Box)`
  padding-top: 32px;
`

const Hero = () => {
  // const { t } = useTranslation()

  return (
    <StyledHero>
      <Container>
        <Flex alignItems="center" flexDirection="column">
          <h1 className="section-title text-3xl lg:text-6xl">Proposal Dashboard</h1>
          <Link href="/voting/proposal/create" passHref prefetch={false}>
            {/* <Button startIcon={<ProposalIcon color="currentColor" width="24px" />}>{t('Make a Proposal')}</Button> */}
            <button
              type="button"
              className="button inline-block button-gradient border-2 border-white px-3 py-3 text-coolGray-200 text-lg font-bold rounded-full shadow transition duration-500 mt-4"
            >
              Submit Proposal
            </button>
          </Link>
        </Flex>
      </Container>
    </StyledHero>
  )
}

export default Hero
