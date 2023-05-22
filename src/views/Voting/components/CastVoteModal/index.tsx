import { useState } from 'react'
import { Box, Modal, useToast } from '@pancakeswap/uikit'
import { useWeb3React, useWeb3LibraryContext } from '@pancakeswap/wagmi'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import { PANCAKE_SPACE } from 'views/Voting/config'
import snapshot from '@snapshot-labs/snapshot.js'
import { SNAPSHOT_BASE_URL } from 'config/constants/endpoints'
import { CastVoteModalProps, ConfirmVoteView } from './types'
import MainView from './MainView'
import DetailsView from './DetailsView'
import useGetVotingPower from '../../hooks/useGetVotingPower'

// Slav const hub = 'https://testnet.snapshot.org'
const hub = SNAPSHOT_BASE_URL // Slav
const client = new snapshot.Client712(hub)

const CastVoteModal: React.FC<React.PropsWithChildren<CastVoteModalProps>> = ({
  onSuccess,
  proposalId,
  vote,
  block,
  onDismiss,
}) => {
  const [view, setView] = useState<ConfirmVoteView>(ConfirmVoteView.MAIN)
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const library = useWeb3LibraryContext()
  const { toastError } = useToast()
  const { theme } = useTheme()
  const { isLoading, isError, cakeBalance } = useGetVotingPower(block, modalIsOpen)

  const isStartView = view === ConfirmVoteView.MAIN
  const handleBack = isStartView ? null : () => setView(ConfirmVoteView.MAIN)
  const handleViewDetails = () => setView(ConfirmVoteView.DETAILS)

  const title = {
    [ConfirmVoteView.MAIN]: t('Confirm Vote'),
    [ConfirmVoteView.DETAILS]: t('Voting Power'),
  }

  const handleDismiss = () => {
    setModalIsOpen(false)
    onDismiss()
  }

  const handleConfirmVote = async () => {
    try {
      setIsPending(true)

      await client.vote(library as any, account, {
        space: PANCAKE_SPACE,
        choice: vote.value,
        reason: '',
        type: 'single-choice',
        proposal: proposalId,
        app: 'snapshot',
      })

      await onSuccess()

      handleDismiss()
    } catch (error) {
      toastError(
        t('Error'),
        // eslint-disable-next-line camelcase
        (error as { error: any; error_description: any })?.error_description ?? t('Error occurred, please try again'),
      )
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Modal
      title={title[view]}
      onBack={handleBack}
      onDismiss={onDismiss}
      hideCloseButton={!isStartView}
      headerBackground={theme.colors.gradientCardHeader}
    >
      <Box mb="24px">
        {view === ConfirmVoteView.MAIN && (
          <MainView
            total={cakeBalance}
            vote={vote}
            isError={isError}
            isLoading={isLoading}
            isPending={isPending}
            onConfirm={handleConfirmVote}
            onViewDetails={handleViewDetails}
            onDismiss={handleDismiss}
          />
        )}
        {view === ConfirmVoteView.DETAILS && <DetailsView cakeBalance={cakeBalance} block={block} />}
      </Box>
    </Modal>
  )
}

export default CastVoteModal
