import { Button, Card, CardBody, CardHeader, Heading } from '@pancakeswap/uikit'
import uniqueId from 'lodash/uniqueId'
import { useTranslation } from '@pancakeswap/localization'
import Choice from './Choice'

export interface Choice {
  id: string
  value: string
}

interface ChoicesProps {
  choices: Choice[]
  onChange: (newChoices: Choice[]) => void
}

export const MINIMUM_CHOICES = 2
export const makeChoice = (): Choice => ({ id: uniqueId(), value: '' })

const Choices: React.FC<React.PropsWithChildren<ChoicesProps>> = ({ choices, onChange }) => {
  const { t } = useTranslation()
  const hasMinimumChoices = choices.filter((choice) => choice.value.length > 0).length >= MINIMUM_CHOICES

  const addChoice = () => {
    onChange([...choices, makeChoice()])
  }

  return (
    <Card>
      <CardHeader>
        <Heading as="h3" scale="md" style={{ color: 'white' }}>
          {t('Choices')}
        </Heading>
      </CardHeader>
      <CardBody style={{ background: 'rgba(10,0,6, 0.8)' }}>
        {choices.map(({ id, value }, index) => {
          const handleTextInput = (newValue: string) => {
            const newChoices = [...choices]
            const choiceIndex = newChoices.findIndex((newChoice) => newChoice.id === id)

            newChoices[choiceIndex].value = newValue

            onChange(newChoices)
          }

          const handleRemove = () => {
            onChange(choices.filter((newPrevChoice) => newPrevChoice.id !== id))
          }

          return (
            <Choice
              style={{ backgroundColor: 'transparent', border: 'solid 1px white' }}
              key={id}
              scale="lg"
              onTextInput={handleTextInput}
              placeholder={t('Input choice text')}
              value={value}
              onRemove={index > 1 ? handleRemove : undefined}
            />
          )
        })}

        <Button
          onClick={addChoice}
          disabled={!hasMinimumChoices}
          className="button inline-block button-gradient border-2 border-white px-8 py-3 text-coolGray-200 text-lg font-bold rounded-full shadow transition duration-500"
        >
          {t('Add Choice')}
        </Button>
      </CardBody>
    </Card>
  )
}

export default Choices
