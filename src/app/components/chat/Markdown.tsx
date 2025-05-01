import { omit } from 'lodash';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import React from 'react';
import { PluggableList } from 'unified'


import { Separator } from '../ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';

import { Card } from '../ui/card';


interface Props {
  allowHtml?: boolean;
  latex?: boolean;
  children: string;
}


const Markdown = ({
  allowHtml,
  latex,
  children
}: Props) => {


  const rehypePlugins = useMemo(() => {
    let rehypePlugins: PluggableList = [];
    if (allowHtml) {
      rehypePlugins = [rehypeRaw, ...rehypePlugins];
    }
    if (latex) {
      rehypePlugins = [rehypeKatex, ...rehypePlugins];
    }
    return rehypePlugins;
  }, [allowHtml, latex]);

  const remarkPlugins = useMemo(() => {
    let remarkPlugins: PluggableList = [
      remarkGfm,
      remarkDirective,
    ];

    if (latex as boolean) {
      remarkPlugins = [...remarkPlugins, remarkMath];
    }
    return remarkPlugins;
  }, [latex]);


  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={{
        code({ className, children, ...props }) {
          return (
            <code
              className={className} {...props}>
              {children}
            </code>
          )

        },
        a({ children, ...props }) {
          return (
            <a
              {...props}
              className="text-smartops hover:underline"
              target="_blank"
            >
              {children}
            </a>
          );

        },
        blockquote(props) {
          return (
            <blockquote
              {...omit(props, ['node'])}
              className="mt-6 border-l-2 pl-6 italic"
            />
          );
        },
        em(props) {
          return <span {...omit(props, ['node'])} className="italic" />;
        },
        strong(props) {
          return <span {...omit(props, ['node'])} className="font-bold" />;
        },
        hr() {
          return <Separator />;
        },
        ul(props): React.JSX.Element {

          return (
            <ul
              {...omit(props, ['node', 'ordered'])}
              className="my-0 ml-3 list-disc pl-2 [&>li]:mt-0"
            />
          );
        },
        ol(props): React.JSX.Element {
          return (
            <ol
              {...omit(props, ['node', 'ordered'])}
              className="my-0 ml-3 list-decimal pl-2 [&>li]:mt-0"
            />
          );
        },
        h1(props): React.JSX.Element {
          return (
            <h1
              {...omit(props, ['node'])}
              className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-2 first:mt-0"
            />
          );
        },
        h2(props): React.JSX.Element {
          return (
            <h2
              {...omit(props, ['node'])}
              className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-2 first:mt-0"
            />
          );
        },
        h3(props): React.JSX.Element {
          return (
            <h3
              {...omit(props, ['node'])}
              className="scroll-m-20 text-2xl font-semibold tracking-tight mt-2 first:mt-0"
            />
          );
        },
        h4(props): React.JSX.Element {
          return (
            <h4
              {...omit(props, ['node'])}
              className="scroll-m-20 text-xl font-semibold tracking-tight mt-2 first:mt-0"
            />
          );
        },
        p(props) {
          return (
            <div
              {...omit(props, ['node'])}
              className="leading-7 [&:not(:first-child)]:mt-0 whitespace-pre-wrap break-words"
              role="article"
            />
          );
        },
        table({ children, ...props }) {
          return (
            <Card className="[&:not(:first-child)]:mt-2 [&:not(:last-child)]:mb-2">
              <Table {...(props)}>{children}</Table>
            </Card>
          );
        },
        thead({ children, ...props }) {
          return <TableHeader {...(props)}>{children}</TableHeader>;
        },
        tr({ children, ...props }) {
          return <TableRow {...(props)}>{children}</TableRow>;
        },
        th({ children, ...props }) {
          return <TableHead {...(props)}>{children}</TableHead>;
        },
        td({ children, ...props }) {
          return <TableCell {...(props)}>{children}</TableCell>;
        },
        tbody({ children, ...props }) {
          return <TableBody {...(props)}>{children}</TableBody>;
        }
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export { Markdown };