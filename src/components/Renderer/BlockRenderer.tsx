import React from 'react';
import { TItems } from '../../types/blocks.types';
import { OutputBlockData, OutputData } from '@editorjs/editorjs';

interface IBlockRendererProps {
  data: OutputData;
}

const renderHeader = (block: OutputBlockData): React.ReactNode => {
  return React.createElement(`h${block.data.level}`, {}, block.data.text);
};

const renderParagraph = (block: OutputBlockData): React.ReactNode => {
  return <p>{block.data.text}</p>;
};

const renderList = (block: OutputBlockData): React.ReactNode => {
  switch (block.data.style) {
    case 'ordered':
      return (
        <ol type={block.data.meta?.counterType === 'numeric' ? '1' : 'A'}>
          {block.data.items?.map((item: TItems, index: number) => (
            <li key={index}>{item.content}</li>
          ))}
        </ol>
      );
    case 'unordered':
      return (
        <ul>
          {block.data.items?.map((item: TItems, index: number) => (
            <li key={index}>{item.content}</li>
          ))}
        </ul>
      );
    case 'checklist':
      return (
        <ul>
          {block.data.items?.map((item: TItems, index: number) => (
            <li key={index}>
              <input type="checkbox" checked={item.meta?.checked} readOnly />
              <span>{item.content}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

const renderBlock = (block: OutputBlockData): React.ReactNode => {
  switch (block.type) {
    case 'header':
      return renderHeader(block);
    case 'paragraph':
      return renderParagraph(block);
    case 'list':
      return renderList(block);
    default:
      return null;
  }
};

const BlockRenderer: React.FC<IBlockRendererProps> = ({ data }) => {
  return (
    <div>
      {data.blocks.map((block, index) => (
        <div key={index}>{renderBlock(block)}</div>
      ))}
    </div>
  );
};

export default BlockRenderer;
