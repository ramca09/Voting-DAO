// import { Box, Button, Flex, Heading, ProposalIcon } from '@pancakeswap/uikit'
// import styled from 'styled-components'
// import { useTranslation } from '@pancakeswap/localization'
// import Container from 'components/Layout/Container'
import Link from 'next/link'
import Footer from 'views/Voting/components/Footer'

const HowItWorks = () => {
  // const { t } = useTranslation()

  return (
    <>
      {/* <Container> */}
      <section className="about-area relative" style={{ paddingTop: '50px' }}>
        <div className="container z-40 relative">
          <div className="grid items-center gap-6 lg:grid-cols-12 z-40 relative">
            <div className="lg:col-span-12">
              <div className="section-content">
                <h1 className="section-title text-3xl lg:text-6xl pb-56">How it works</h1>
              </div>
            </div>
          </div>
          <div className="grid items-center gap-6 lg:grid-cols-12 z-40 relative pb-56">
            <div className="lg:col-span-8">
              <div className="about-image" data-aos="fade-up">
                <img src="assets/images/how-works-img.png" alt="title" />
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="about-content" data-aos="fade-down">
                <h2 className="section-title text-2xl lg:text-4xl mb-8">Objective</h2>
                <p className="mb-4">
                  PrivateX DAO is your chance to show your power towards a future direction of a given token or
                  suggestion within the PrivateX ecosystem. We believe that letting the community take part in the
                  decision making process alongside an incentive program, would benefit both sides of the scales.
                </p>
                <h2 className="section-title text-2xl lg:text-4xl mb-8">Governance Model</h2>
                <p className="">
                  Proposals can be submitted to build on the PrivateX ecosystem, community initiatives or marketing
                  campaigns. Proposals are reviewed by the PrivateX DAO Board and posted for voting if the appropriate
                  criteria is met. Community members then can use their PRVT token to vote for their desired proposals.
                </p>
              </div>
            </div>
          </div>
          <div className="grid items-center gap-6 lg:grid-cols-12 z-40 relative">
            <div className="lg:col-span-6">
              <div className="about-content lg:pr-10">
                <h4 className="section-title text-2xl lg:text-4xl mb-8">Voting with the PRVT Token</h4>
                <p>
                  Begin voting with PrivateX DAO today to decide which projects will receive funding to build on the
                  PrivateX DAO ecosystem.
                </p>
                <p>The faith of a project lies within your hands!</p>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="grid items-center gap-6 lg:grid-cols-12 z-40 relative">
                <Link href="/voting/become-a-voter">
                  <div className="lg:col-span-6" style={{ cursor: 'pointer' }}>
                    <div
                      className="button-gradient token-box text-center rounded-xl pt-16 pb-8 px-4"
                      data-aos="fade-up"
                    >
                      <div className="flex items-center justify-center token-icon  bg-white/[.1] rounded-full mx-auto mb-4">
                        <img src="assets/images/token-icon1.svg" alt="title" />
                      </div>
                      <p className="text-lg">Become a Voter</p>
                    </div>
                  </div>
                </Link>
                <Link href="/voting/proposal/create">
                  <div className="lg:col-span-6" style={{ cursor: 'pointer' }}>
                    <div
                      className="button-gradient token-box text-center rounded-xl pt-16 pb-8 px-4"
                      data-aos="fade-down"
                    >
                      <div className="flex items-center justify-center token-icon  bg-white/[.1] rounded-full mx-auto mb-4">
                        <img src="assets/images/token-icon2.svg" alt="title" />
                      </div>
                      <p className="text-lg">Vote on a Proposal</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {/* </Container> */}
    </>
  )
}

export default HowItWorks
