import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Modal, ModalBody, Text, InjectedModalProps } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import ConnectWalletButton from '../../ConnectWalletButton'

const TransactionsModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { account } = useActiveWeb3React()

  const { t } = useTranslation()

  return (
    <Modal title={t('Recent Transactions')} headerBackground="gradientCardHeader" onDismiss={onDismiss}>
      {account ? (
        <ModalBody>
          <Text>{t('No recent transactions')}</Text>
        </ModalBody>
      ) : (
        <ConnectWalletButton />
      )}
    </Modal>
  )
}

export default TransactionsModal
