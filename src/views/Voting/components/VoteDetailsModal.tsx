import { useState } from 'react'
import { Box, Flex, InjectedModalProps, Modal, Button, Spinner } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import useGetVotingPower from '../hooks/useGetVotingPower'
import DetailsView from './CastVoteModal/DetailsView'

interface VoteDetailsModalProps extends InjectedModalProps {
  block: number
}

const VoteDetailsModal: React.FC<React.PropsWithChildren<VoteDetailsModalProps>> = ({ block, onDismiss }) => {
  const { t } = useTranslation()
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const { isLoading, cakeBalance } = useGetVotingPower(block, modalIsOpen)
  const { theme } = useTheme()

  const handleDismiss = () => {
    setModalIsOpen(false)
    onDismiss()
  }

  return (
    <Modal title={t('Voting Power')} onDismiss={handleDismiss} headerBackground={theme.colors.gradientCardHeader}>
      <Box mb="24px" width={['100%', '100%', '100%', '320px']}>
        {isLoading ? (
          <Flex height="450px" alignItems="center" justifyContent="center">
            <Spinner size={80} />
          </Flex>
        ) : (
          <>
            <DetailsView cakeBalance={cakeBalance} block={block} />
            <Button
              variant="secondary"
              onClick={onDismiss}
              width="100%"
              mt="16px"
              style={{ borderColor: '#9A6AFF', color: '#9A6AFF' }}
            >
              {t('Close')}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default VoteDetailsModal
