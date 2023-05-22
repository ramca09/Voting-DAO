import { TextareaHTMLAttributes, useEffect, useRef } from 'react'
import EasyMde from 'easymde'
import styled from 'styled-components'
import merge from 'lodash/merge'

import 'easymde/dist/easymde.min.css'

interface SimpleMdeProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  options?: EasyMde.Options
  onTextChange: (value: string) => void
}

const Wrapper = styled.div`
  .EasyMDEContainer .CodeMirror {
    background: transparent;
    border-color: grey;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    box-shadow: ${({ theme }) => theme.shadows.inset};
    padding: 16px;
  }

  .CodeMirror-code {
    color: white;
  }

  .CodeMirror-cursor {
    border-left: ${({ theme }) => `1px solid ${theme.colors.text}`};
  }

  .editor-toolbar {
    background: linear-gradient(270deg, #A6185E 0%, #070097 100%);
    border-color: ${({ theme }) => theme.colors.cardBorder};
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    color: white;

    a,
    button {
      color: white;

      &:hover,
      &.active {
        background: transparent;
        border: 0;
      }
    }
  }
`

/**
 * @see https://github.com/Ionaru/easy-markdown-editor#configuration
 */
const defaultOptions: EasyMde.Options = {
  autofocus: false,
  status: false,
  hideIcons: ['guide', 'fullscreen', 'preview', 'side-by-side'],
  spellChecker: false,
  styleSelectedText: false,
}

const SimpleMde: React.FC<React.PropsWithChildren<SimpleMdeProps>> = ({ options, onTextChange, ...props }) => {
  const ref = useRef()
  const onTextChangeHandler = useRef(onTextChange)

  useEffect(() => {
    let simpleMde = new EasyMde(merge({ element: ref.current }, defaultOptions, options))

    simpleMde.codemirror.on('change', () => {
      onTextChangeHandler.current(simpleMde.value())
    })

    return () => {
      if (simpleMde) {
        simpleMde.toTextArea()
        simpleMde = null
      }
    }
  }, [options, onTextChangeHandler, ref])

  return (
    <Wrapper>
      <textarea ref={ref} readOnly {...props} />
    </Wrapper>
  )
}

export default SimpleMde
