import { type FC } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import { cn } from '../../../lib/utils'

import { type MarkdownRendererProps } from './types'
import { inlineComponents } from './inlineStyles'
import { components } from './styles'

const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  classname,
  inline = false
}) => (
  //@ts-ignore
  <ReactMarkdown
    className={cn(
      'markdown',
      classname
    )}
    components={{ ...(inline ? inlineComponents : components) }}
    remarkPlugins={[remarkGfm]}
      //@ts-ignore
    rehypePlugins={[rehypeRaw, rehypeSanitize]}
  >
    {children}
  </ReactMarkdown>
)

export default MarkdownRenderer
