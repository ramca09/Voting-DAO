import { Token } from '@pancakeswap/sdk'
import { Modal, Box, InjectedModalProps } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

interface Props extends InjectedModalProps {
  tokens: Token[]
  onCancel: () => void
}

const ImportTokenWarningModal: React.FC<React.PropsWithChildren<Props>> = ({ onDismiss, onCancel }) => {
  const { t } = useTranslation()
  return (
    <Modal
      title={t('Import Token')}
      onDismiss={() => {
        onDismiss?.()
        onCancel()
      }}
    >
      <Box maxWidth="380px" />
    </Modal>
  )
}

export default ImportTokenWarningModal
