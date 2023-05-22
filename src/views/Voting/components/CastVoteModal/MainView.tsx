import { IconButton, Text, Skeleton, Button, AutoRenewIcon, ChevronRightIcon, Message, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { formatNumber } from 'utils/formatBalance'
import TextEllipsis from '../TextEllipsis'
import { VotingBoxBorder, VotingBoxCardInner, ModalInner } from './styles'
import { CastVoteModalProps } from './types'

interface MainViewProps {
  vote: {
    label: string
    value: number
  }
  isLoading: boolean
  isPending: boolean
  isError: boolean
  total: number
  disabled?: boolean
  onConfirm: () => void
  onViewDetails: () => void
  onDismiss: CastVoteModalProps['onDismiss']
}

const MainView: React.FC<React.PropsWithChildren<MainViewProps>> = ({
  vote,
  total = 0,
  isPending,
  isLoading,
  isError,
  onConfirm,
  onViewDetails,
  onDismiss,
  disabled,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <ModalInner>
        <Text color="secondary" mb="8px" textTransform="uppercase" fontSize="12px" bold>
          {t('Voting For')}
        </Text>
        <TextEllipsis bold fontSize="20px" mb="8px" title={vote.label}>
          {vote.label}
        </TextEllipsis>
        <Text color="secondary" mb="8px" textTransform="uppercase" fontSize="12px" bold>
          {t('Your Voting Power')}
        </Text>
        {isLoading && !isError ? (
          <Skeleton height="64px" mb="12px" />
        ) : isError ? (
          <Message variant="danger" mb="12px">
            <Text color="text">{t('Error occurred, please try again later')}</Text>
          </Message>
        ) : (
          <>
            <VotingBoxBorder hasBoosted onClick={onViewDetails} style={{ cursor: 'pointer' }}>
              <VotingBoxCardInner hasBoosted>
                <Flex flexDirection="column">
                  <Text bold fontSize="20px" color={total === 0 ? 'failure' : 'text'}>
                    {formatNumber(total, 0, 3)}
                  </Text>
                </Flex>
                <IconButton scale="sm" variant="text">
                  <ChevronRightIcon width="24px" />
                </IconButton>
              </VotingBoxCardInner>
            </VotingBoxBorder>
            {total === 0 ? (
              <Message variant="danger" mb="12px">
                <Text color="danger">
                  {t(
                    'Hold some PRVTX in your wallet or on PrivateX DAO at the snapshot block to get voting power for future proposals.',
                  )}
                </Text>
              </Message>
            ) : (
              <Text as="p" color="textSubtle" fontSize="14px">
                {t('Are you sure you want to vote for the above choice? This action cannot be undone.')}
              </Text>
            )}
          </>
        )}
      </ModalInner>
      <Button
        isLoading={isPending}
        endIcon={isPending ? <AutoRenewIcon spin color="currentColor" /> : null}
        disabled={disabled || isLoading || total === 0}
        width="100%"
        mb="8px"
        onClick={onConfirm}
        className="StyledButton-sc-48cbd23f-0 hpGODf button inline-block button-gradient border-2 border-white px-8 py-3 text-coolGray-200 text-lg font-bold rounded-full shadow transition duration-500"
      >
        {t('Confirm Vote')}
      </Button>
      <Button variant="secondary" width="100%" onClick={onDismiss} style={{ borderColor: '#9A6AFF', color: '#9A6AFF' }}>
        {t('Cancel')}
      </Button>
    </>
  )
}

export default MainView
