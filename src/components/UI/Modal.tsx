import React from 'react';
import { Modal as AntModal } from 'antd';

interface ModalProps {
  title: string;
  open: boolean;
  onOk?: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  width?: number;
  footer?: React.ReactNode | null;
  className?: string;
}

export function Modal({
  title,
  open,
  onOk,
  onCancel,
  children,
  okText = 'OK',
  cancelText = 'Cancel',
  width = 520,
  footer,
  className = ''
}: ModalProps) {
  return (
    <AntModal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      width={width}
      footer={footer}
      className={className}
      centered
    >
      {children}
    </AntModal>
  );
}
