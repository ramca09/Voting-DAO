import { ChangeEvent, FormEvent, useEffect, useState, useMemo } from 'react'
import {
  AutoRenewIcon,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  LinkExternal,
  Text,
  useModal,
  useToast,
} from '@pancakeswap/uikit'
import { useWeb3React, useWeb3LibraryContext } from '@pancakeswap/wagmi'
import snapshot from '@snapshot-labs/snapshot.js'
import times from 'lodash/times'
import isEmpty from 'lodash/isEmpty'
import { useInitialBlock } from 'state/block/hooks'

import { getBlockExploreLink } from 'utils'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import { DatePicker, TimePicker, DatePickerPortal } from 'views/Voting/components/DatePicker'
import ConnectWalletButton from 'components/ConnectWalletButton'
import ReactMarkdown from 'components/ReactMarkdown'
import { PageMeta } from 'components/Layout/Page'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { SNAPSHOT_BASE_URL } from 'config/constants/endpoints'
import Layout from '../components/Layout'
import { FormErrors, Label, SecondaryLabel } from './styles'
import Choices, { Choice, makeChoice, MINIMUM_CHOICES } from './Choices'
import { combineDateAndTime, getFormErrors } from './helpers'
import { FormState } from './types'
import { ADMINS, PANCAKE_SPACE, VOTE_THRESHOLD } from '../config'
import VoteDetailsModal from '../components/VoteDetailsModal'

const EasyMde = dynamic(() => import('components/EasyMde'), {
  ssr: false,
})

const hub = SNAPSHOT_BASE_URL
const client = new snapshot.Client712(hub)

const CreateProposal = () => {
  const [state, setState] = useState<FormState>(() => ({
    name: '',
    body: '',
    choices: times(MINIMUM_CHOICES).map(makeChoice),
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    snapshot: 0,
  }))
  const [isLoading, setIsLoading] = useState(false)
  const [fieldsState, setFieldsState] = useState<{ [key: string]: boolean }>({})
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const initialBlock = useInitialBlock()
  const { push } = useRouter()
  const { toastSuccess, toastError } = useToast()
  const [onPresentVoteDetailsModal] = useModal(<VoteDetailsModal block={state.snapshot} />)
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { name, body, choices, startDate, startTime, endDate, endTime, snapshot } = state
  const formErrors = getFormErrors(state, t)

  const library = useWeb3LibraryContext()

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    try {
      setIsLoading(true)

      const data: any = await client.proposal(library as any, account, {
        space: PANCAKE_SPACE,
        type: 'single-choice',
        title: name,
        body,
        start: combineDateAndTime(startDate, startTime),
        end: combineDateAndTime(endDate, endTime),
        choices: choices
          .filter((choice) => choice.value)
          .map((choice) => {
            return choice.value
          }),
        snapshot,
        discussion: '',
        plugins: JSON.stringify({}),
        app: 'snapshot',
        timestamp: combineDateAndTime(startDate, startTime),
      })

      // Redirect user to newly created proposal page
      push(`/voting/proposal/${data.id}`)
      toastSuccess(t('Proposal created!'))
    } catch (error) {
      // eslint-disable-next-line camelcase
      toastError(t('Error'), (error as { error: any; error_description: any })?.error_description)
      console.error(error)
      setIsLoading(false)
    }
  }

  const updateValue = (key: string, value: string | Choice[] | Date) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }))

    // Keep track of what fields the user has attempted to edit
    setFieldsState((prevFieldsState) => ({
      ...prevFieldsState,
      [key]: true,
    }))
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = evt.currentTarget
    updateValue(inputName, value)
  }

  const handleEasyMdeChange = (value: string) => {
    updateValue('body', value)
  }

  const handleChoiceChange = (newChoices: Choice[]) => {
    updateValue('choices', newChoices)
  }

  const handleDateChange = (key: string) => (value: Date) => {
    updateValue(key, value)
  }

  const options = useMemo(() => {
    return {
      hideIcons:
        account && ADMINS.includes(account.toLowerCase())
          ? []
          : ['guide', 'fullscreen', 'preview', 'side-by-side', 'image'],
    }
  }, [account])

  useEffect(() => {
    if (initialBlock > 0) {
      setState((prevState) => ({
        ...prevState,
        snapshot: initialBlock,
      }))
    }
  }, [initialBlock, setState])

  return (
    <Container py="40px">
      <PageMeta />
      <Box mb="48px">
        <Breadcrumbs>
          <Link href="/">
            <div style={{ color: 'silver', cursor: 'pointer' }}>{t('Home')}</div>
          </Link>
          <Link href="/voting/proposal/list">
            <div style={{ color: 'silver', cursor: 'pointer' }}>{t('Voting')}</div>
          </Link>
          <Text style={{ color: 'white' }}>{t('Make a Proposal')}</Text>
        </Breadcrumbs>
      </Box>
      <form onSubmit={handleSubmit}>
        <Layout>
          <Box>
            <Box mb="24px">
              <Label htmlFor="name" style={{ color: 'white' }}>
                {t('Title')}
              </Label>
              <Input
                id="name"
                name="name"
                value={name}
                scale="lg"
                onChange={handleChange}
                style={{ backgroundColor: 'transparent', border: 'solid 1px white', color: 'white' }}
                required
              />
              {formErrors.name && fieldsState.name && <FormErrors errors={formErrors.name} />}
            </Box>
            <Box mb="24px">
              <Label htmlFor="body" style={{ color: 'white' }}>
                {t('Content')}
              </Label>
              <Text color="textSubtle" mb="8px">
                {t('Tip: write in Markdown!')}
              </Text>
              <EasyMde
                id="body"
                name="body"
                onTextChange={handleEasyMdeChange}
                value={body}
                options={options}
                required
              />
              {formErrors.body && fieldsState.body && <FormErrors errors={formErrors.body} />}
            </Box>
            {body && (
              <Box mb="24px">
                <Card>
                  <CardHeader>
                    <Heading as="h3" scale="md" style={{ color: 'white' }}>
                      {t('Preview')}
                    </Heading>
                  </CardHeader>
                  <CardBody p="0" px="24px">
                    <ReactMarkdown>{body}</ReactMarkdown>
                  </CardBody>
                </Card>
              </Box>
            )}
            <Choices choices={choices} onChange={handleChoiceChange} />
            {formErrors.choices && fieldsState.choices && <FormErrors errors={formErrors.choices} />}
          </Box>
          <Box>
            <Card>
              <CardHeader>
                <Heading as="h3" scale="md" style={{ color: 'white' }}>
                  {t('Actions')}
                </Heading>
              </CardHeader>
              <CardBody style={{ background: 'rgba(10,0,6, 0.8)' }}>
                <Box mb="24px">
                  <SecondaryLabel>{t('Start Date')}</SecondaryLabel>
                  <DatePicker
                    name="startDate"
                    onChange={handleDateChange('startDate')}
                    selected={startDate}
                    placeholderText="YYYY/MM/DD"
                  />
                  {formErrors.startDate && fieldsState.startDate && <FormErrors errors={formErrors.startDate} />}
                </Box>
                <Box mb="24px">
                  <SecondaryLabel>{t('Start Time')}</SecondaryLabel>
                  <TimePicker
                    name="startTime"
                    onChange={handleDateChange('startTime')}
                    selected={startTime}
                    placeholderText="00:00"
                  />
                  {formErrors.startTime && fieldsState.startTime && <FormErrors errors={formErrors.startTime} />}
                </Box>
                <Box mb="24px">
                  <SecondaryLabel>{t('End Date')}</SecondaryLabel>
                  <DatePicker
                    name="endDate"
                    onChange={handleDateChange('endDate')}
                    selected={endDate}
                    placeholderText="YYYY/MM/DD"
                  />
                  {formErrors.endDate && fieldsState.endDate && <FormErrors errors={formErrors.endDate} />}
                </Box>
                <Box mb="24px">
                  <SecondaryLabel>{t('End Time')}</SecondaryLabel>
                  <TimePicker
                    name="endTime"
                    onChange={handleDateChange('endTime')}
                    selected={endTime}
                    placeholderText="00:00"
                  />
                  {formErrors.endTime && fieldsState.endTime && <FormErrors errors={formErrors.endTime} />}
                </Box>
                {account && (
                  <Flex alignItems="center" mb="8px">
                    <Text color="textSubtle" mr="16px">
                      {t('Creator')}
                    </Text>
                    <LinkExternal href={getBlockExploreLink(account, 'address')} color="secondary">
                      {truncateHash(account)}
                    </LinkExternal>
                  </Flex>
                )}
                <Flex alignItems="center" mb="16px">
                  <Text color="textSubtle" mr="16px">
                    {t('Snapshot')}
                  </Text>
                  <LinkExternal href={getBlockExploreLink(snapshot, 'block')} color="secondary">
                    {snapshot}
                  </LinkExternal>
                </Flex>
                {account ? (
                  <>
                    <Button
                      type="submit"
                      width="100%"
                      isLoading={isLoading}
                      endIcon={isLoading ? <AutoRenewIcon spin color="currentColor" /> : null}
                      disabled={!isEmpty(formErrors)}
                      mb="16px"
                      className="StyledButton-sc-48cbd23f-0 hpGODf button inline-block button-gradient border-2 border-white px-8 py-3 text-coolGray-200 text-lg font-bold rounded-full shadow transition duration-500"
                      // style={{ backgroundColor: '#5f0d77' }}
                    >
                      {t('Publish')}
                    </Button>
                    <Text color="failure" as="p" mb="4px">
                      {t('You need at least %count% voting power to publish a proposal.', { count: VOTE_THRESHOLD })}{' '}
                    </Text>
                    <Button
                      scale="sm"
                      type="button"
                      variant="text"
                      onClick={onPresentVoteDetailsModal}
                      p={0}
                      style={{ color: '#9A6AFF' }}
                    >
                      {t('Check voting power')}
                    </Button>
                  </>
                ) : (
                  <ConnectWalletButton width="100%" type="button" />
                )}
              </CardBody>
            </Card>
          </Box>
        </Layout>
      </form>
      <DatePickerPortal />
    </Container>
  )
}

export default CreateProposal
