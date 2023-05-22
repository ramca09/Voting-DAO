import { useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Radio,
  Text,
  useModal,
  useToast,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Proposal } from 'state/types'
import { useTranslation } from '@pancakeswap/localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import CastVoteModal from '../components/CastVoteModal'

interface VoteProps extends CardProps {
  proposal: Proposal
  onSuccess?: () => void
}

interface State {
  label: string
  value: number
}

const Choice = styled.label<{ isChecked: boolean; isDisabled: boolean }>`
  align-items: center;
  border: 1px solid ${({ theme, isChecked }) => theme.colors[isChecked ? 'success' : 'cardBorder']};
  border-radius: 16px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  margin-bottom: 16px;
  padding: 16px;
`

const ChoiceText = styled.div`
  flex: 1;
  padding-left: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 0;
`

const Vote: React.FC<React.PropsWithChildren<VoteProps>> = ({ proposal, onSuccess, ...props }) => {
  const [vote, setVote] = useState<State>(null)
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { account } = useWeb3React()

  const handleSuccess = async () => {
    toastSuccess(t('Vote cast!'))
    onSuccess?.()
  }

  const [presentCastVoteModal] = useModal(
    <CastVoteModal
      onSuccess={handleSuccess}
      proposalId={proposal.id}
      vote={vote}
      block={Number(proposal.snapshot)}
      onDismiss={undefined}
    />,
  )

  return (
    <Card {...props}>
      <CardHeader>
        <Heading as="h3" scale="md">
          {t('Cast your vote')}
        </Heading>
      </CardHeader>
      <CardBody>
        {proposal.choices.map((choice, index) => {
          const isChecked = index + 1 === vote?.value

          const handleChange = () => {
            setVote({
              label: choice,
              value: index + 1,
            })
          }

          return (
            <Choice
              key={choice}
              isChecked={isChecked}
              isDisabled={!account}
              style={{ borderColor: isChecked ? '#9A6AFF' : '#383241' }}
            >
              <div style={{ flexShrink: 0 }}>
                <Radio
                  scale="sm"
                  value={choice}
                  checked={isChecked}
                  onChange={handleChange}
                  disabled={!account}
                  style={{ backgroundColor: isChecked ? '#9A6AFF' : '#383241' }}
                />
              </div>
              <ChoiceText>
                <Text as="span" title={choice}>
                  {choice}
                </Text>
              </ChoiceText>
            </Choice>
          )
        })}
        {account ? (
          <Button
            onClick={presentCastVoteModal}
            disabled={vote === null}
            className="StyledButton-sc-48cbd23f-0 hpGODf button inline-block button-gradient border-2 border-white px-8 py-3 text-coolGray-200 text-lg font-bold rounded-full shadow transition duration-500"
          >
            {t('Cast Vote')}
          </Button>
        ) : (
          <ConnectWalletButton />
        )}
      </CardBody>
    </Card>
  )
}

export default Vote
