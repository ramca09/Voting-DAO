import Link from 'next/link'
import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import useSWR from 'swr'
import { ProposalState, ProposalType } from 'state/types'
import { getProposals } from 'state/voting/helpers'
import { FetchStatus } from 'config/constants/types'
import { useSessionStorage } from 'hooks/useSessionStorage'
import { Box, Breadcrumbs, Card, Flex, Heading, Text } from '@pancakeswap/uikit'
import { filterProposalsByState, filterProposalsByType } from '../../helpers'
import ProposalsLoading from './ProposalsLoading'
import TabMenu from './TabMenu'
import ProposalRow from './ProposalRow'
import Filters from './Filters'

interface State {
  proposalType: ProposalType
  filterState: ProposalState
}

const Proposals = () => {
  const { t } = useTranslation()
  const [state, setState] = useSessionStorage<State>('proposals-filter', {
    proposalType: ProposalType.CORE,
    filterState: ProposalState.ACTIVE,
  })

  const { proposalType, filterState } = state

  const { status, data } = useSWR(['proposals', filterState], async () => getProposals(1000, 0, filterState))

  const handleProposalTypeChange = (newProposalType: ProposalType) => {
    setState((prevState) => ({
      ...prevState,
      proposalType: newProposalType,
    }))
  }

  const handleFilterChange = (newFilterState: ProposalState) => {
    setState((prevState) => ({
      ...prevState,
      filterState: newFilterState,
    }))
  }

  const filteredProposals = filterProposalsByState(filterProposalsByType(data, proposalType), filterState)

  return (
    <Container py="40px">
      {/* <div className="grid items-center gap-6 lg:grid-cols-12 z-40 relative pb-16">
        <div className="lg:col-span-6">
          <div className="dashboard-box p-6" data-aos="fade-up">
            <div className="w-full relative z-40">
              <div className="flex items-start justify-between mb-6">
                <h5 className="title text-2xl font-normal">iLearn - a Blockchain Enabled Educational Platform</h5>
                <button type="button" className="text-xs bg-white/[.1] py-1.5 px-4 rounded-full">Closed</button>
              </div>
              <ul className="meta-data flex items-center mb-4">
                <li className="border-r border-coolGray-400 mr-3 pr-3">
                  <span className="button-gradient text-coolGray-300 text-sm rounded-full py-1 px-4" >
                    Education
                  </span>
                </li>
                <li>
                  <span>Voting Period: 10/25/2022 - 11/1/2022</span>
                </li>
              </ul>
              <p>
                Quiz Game / Async quizzes Collection on Tomochain Educate and strengthen your community with Tomocha...
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="dashboard-box p-6" data-aos="fade-up">
            <div className="w-full relative z-40">
              <div className="flex items-start justify-between mb-6">
                <h5 className="title text-2xl font-normal">iLearn - a Blockchain Enabled Educational Platform</h5>
                <button type="button" className="text-xs bg-white/[.1] py-1.5 px-4 rounded-full">Closed</button>
              </div>
              <ul className="meta-data flex items-center mb-4">
                <li className="border-r border-coolGray-400 mr-3 pr-3">
                  <span className="button-gradient text-coolGray-300 text-sm rounded-full py-1 px-4">
                    Education
                  </span>
                </li>
                <li>
                  <span>Voting Period: 10/25/2022 - 11/1/2022</span>
                </li>
              </ul>
              <p>
                Quiz Game / Async quizzes Collection on Tomochain Educate and strengthen your community with Tomocha...
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="dashboard-box p-6" data-aos="fade-up">
            <div className="w-full relative z-40">
              <div className="flex items-start justify-between mb-6">
                <h5 className="title text-2xl font-normal">iLearn - a Blockchain Enabled Educational Platform</h5>
                <button type="button" className="text-xs bg-white/[.1] py-1.5 px-4 rounded-full">Closed</button>
              </div>
              <ul className="meta-data flex items-center mb-4">
                <li className="border-r border-coolGray-400 mr-3 pr-3">
                  <span className="button-gradient text-coolGray-300 text-sm rounded-full py-1 px-4">
                    Education
                  </span>
                </li>
                <li>
                  <span >Voting Period: 10/25/2022 - 11/1/2022</span>
                </li>
              </ul>
              <p>
                Quiz Game / Async quizzes Collection on Tomochain Educate and strengthen your community with Tomocha...
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="dashboard-box p-6" data-aos="fade-up">
            <div className="w-full relative z-40">
              <div className="flex items-start justify-between mb-6">
                <h5 className="title text-2xl font-normal">iLearn - a Blockchain Enabled Educational Platform</h5>
                <button type="button" className="text-xs bg-white/[.1] py-1.5 px-4 rounded-full">Closed</button>
              </div>
              <ul className="meta-data flex items-center mb-4">
                <li className="border-r border-coolGray-400 mr-3 pr-3">
                  <span className="button-gradient text-coolGray-300 text-sm rounded-full py-1 px-4" >
                    Education
                  </span>
                </li>
                <li>
                  <span>Voting Period: 10/25/2022 - 11/1/2022</span>
                </li>
              </ul>
              <p>
                Quiz Game / Async quizzes Collection on Tomochain Educate and strengthen your community with Tomocha...
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="dashboard-box p-6" data-aos="fade-up">
            <div className="w-full relative z-40">
              <div className="flex items-start justify-between mb-6">
                <h5 className="title text-2xl font-normal">iLearn - a Blockchain Enabled Educational Platform</h5>
                <button type="button" className="text-xs bg-white/[.1] py-1.5 px-4 rounded-full">Closed</button>
              </div>
              <ul className="meta-data flex items-center mb-4">
                <li className="border-r border-coolGray-400 mr-3 pr-3">
                  <span className="button-gradient text-coolGray-300 text-sm rounded-full py-1 px-4" >
                    Education
                  </span>
                </li>
                <li>
                  <span>Voting Period: 10/25/2022 - 11/1/2022</span>
                </li>
              </ul>
              <p>
                Quiz Game / Async quizzes Collection on Tomochain Educate and strengthen your community with Tomocha...
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="dashboard-box p-6" data-aos="fade-up">
            <div className="w-full relative z-40">
              <div className="flex items-start justify-between mb-6">
                <h5 className="title text-2xl font-normal">iLearn - a Blockchain Enabled Educational Platform</h5>
                <button type="button" className="text-xs bg-white/[.1] py-1.5 px-4 rounded-full">Closed</button>
              </div>
              <ul className="meta-data flex items-center mb-4">
                <li className="border-r border-coolGray-400 mr-3 pr-3">
                  <span className="button-gradient text-coolGray-300 text-sm rounded-full py-1 px-4">
                    Education
                  </span>
                </li>
                <li>
                  <span >Voting Period: 10/25/2022 - 11/1/2022</span>
                </li>
              </ul>
              <p>
                Quiz Game / Async quizzes Collection on Tomochain Educate and strengthen your community with Tomocha...
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="dashboard-box p-6" data-aos="fade-up">
            <div className="w-full relative z-40">
              <div className="flex items-start justify-between mb-6">
                <h5 className="title text-2xl font-normal">iLearn - a Blockchain Enabled Educational Platform</h5>
                <button type="button" className="text-xs bg-white/[.1] py-1.5 px-4 rounded-full">Closed</button>
              </div>
              <ul className="meta-data flex items-center mb-4">
                <li className="border-r border-coolGray-400 mr-3 pr-3">
                  <span className="button-gradient text-coolGray-300 text-sm rounded-full py-1 px-4" >
                    Education
                  </span>
                </li>
                <li>
                  <span >Voting Period: 10/25/2022 - 11/1/2022</span>
                </li>
              </ul>
              <p>
                Quiz Game / Async quizzes Collection on Tomochain Educate and strengthen your community with Tomocha...
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="dashboard-box p-6" data-aos="fade-up">
            <div className="w-full relative z-40">
              <div className="flex items-start justify-between mb-6">
                <h5 className="title text-2xl font-normal">iLearn - a Blockchain Enabled Educational Platform</h5>
                <button type="button" className="text-xs bg-white/[.1] py-1.5 px-4 rounded-full">Closed</button>
              </div>
              <ul className="meta-data flex items-center mb-4">
                <li className="border-r border-coolGray-400 mr-3 pr-3">
                  <span className="button-gradient text-coolGray-300 text-sm rounded-full py-1 px-4" >
                    Education
                  </span>
                </li>
                <li>
                  <span >Voting Period: 10/25/2022 - 11/1/2022</span>
                </li>
              </ul>
              <p>
                Quiz Game / Async quizzes Collection on Tomochain Educate and strengthen your community with Tomocha...
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="dashboard-box p-6" data-aos="fade-up">
            <div className="w-full relative z-40">
              <div className="flex items-start justify-between mb-6">
                <h5 className="title text-2xl font-normal">iLearn - a Blockchain Enabled Educational Platform</h5>
                <button type="button" className="text-xs bg-white/[.1] py-1.5 px-4 rounded-full">Closed</button>
              </div>
              <ul className="meta-data flex items-center mb-4">
                <li className="border-r border-coolGray-400 mr-3 pr-3">
                  <span className="button-gradient text-coolGray-300 text-sm rounded-full py-1 px-4" >
                    Education
                  </span>
                </li>
                <li>
                  <span >Voting Period: 10/25/2022 - 11/1/2022</span>
                </li>
              </ul>
              <p>
                Quiz Game / Async quizzes Collection on Tomochain Educate and strengthen your community with Tomocha...
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <Box mb="48px">
        <Breadcrumbs>
          <Link href="/">
            <div style={{ color: 'silver', cursor: 'pointer' }}>{t('Home')}</div>
          </Link>
          <Text>{t('Voting')}</Text>
        </Breadcrumbs>
      </Box>
      <Heading as="h2" scale="xl" mb="32px" id="voting-proposals">
        {t('Proposals')}
      </Heading>
      <Card>
        <TabMenu proposalType={proposalType} onTypeChange={handleProposalTypeChange} />
        <Filters
          filterState={filterState}
          onFilterChange={handleFilterChange}
          isLoading={status !== FetchStatus.Fetched}
        />
        {status !== FetchStatus.Fetched && <ProposalsLoading />}
        {status === FetchStatus.Fetched &&
          filteredProposals.length > 0 &&
          filteredProposals.map((proposal) => {
            return <ProposalRow key={proposal.id} proposal={proposal} />
          })}
        {status === FetchStatus.Fetched && filteredProposals.length === 0 && (
          <Flex alignItems="center" justifyContent="center" p="32px">
            <Heading as="h5">{t('No proposals found')}</Heading>
          </Flex>
        )}
      </Card>
    </Container>
  )
}

export default Proposals
