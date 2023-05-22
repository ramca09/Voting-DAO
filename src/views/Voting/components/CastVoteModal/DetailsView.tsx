import { Flex, LinkExternal, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { getBlockExploreLink } from 'utils'
import { formatNumber } from 'utils/formatBalance'
import { ModalInner, VotingBoxBorder, VotingBoxCardInner } from './styles'

const StyledLinkExternal = styled(LinkExternal)`
  display: inline-flex;
  font-size: 14px;
  > svg {
    width: 14px;
  }
`

interface DetailsViewProps {
  cakeBalance?: number
  block: number
}

const DetailsView: React.FC<React.PropsWithChildren<DetailsViewProps>> = ({ cakeBalance = 0, block }) => {
  const { t } = useTranslation()

  return (
    <ModalInner mb="0">
      <Text as="p" mb="24px" fontSize="14px" color="textSubtle">
        {t(
          'Your voting power is determined by the amount of PRVTX you held and the remaining duration on the fixed-term staking position (if you have one) at the block detailed below. PRVTX held in other places does not contribute to your voting power.',
        )}
      </Text>
      <Text color="secondary" textTransform="uppercase" mb="4px" bold fontSize="14px">
        {t('Overview')}
      </Text>
      <VotingBoxBorder>
        <VotingBoxCardInner>
          <Text color="secondary">{t('Your Voting Power')}</Text>
          <Text bold fontSize="20px">
            {formatNumber(cakeBalance, 0, 3)}
          </Text>
        </VotingBoxCardInner>
      </VotingBoxBorder>
      <Text color="secondary" textTransform="uppercase" mb="4px" bold fontSize="14px">
        {t('Your voting power at block')}
        <StyledLinkExternal href={getBlockExploreLink(block, 'block')} ml="8px" color="secondary">
          {block}
        </StyledLinkExternal>
      </Text>
      {Number.isFinite(cakeBalance) && (
        <Flex alignItems="center" justifyContent="space-between" mb="4px">
          <Text color="textSubtle" fontSize="16px">
            {t('Wallet')}
          </Text>
          <Text textAlign="right">{formatNumber(cakeBalance, 0, 3)}</Text>
        </Flex>
      )}
    </ModalInner>
  )
}

export default DetailsView
