'use client';

import React from 'react';
import { mapModifiers } from '@/utils/funtion';
import { Button as AButton } from 'antd';

interface IButtonProps {
  variant?: 'primary' | 'outline' | 'danger' | 'secondary' | 'default';
  shape?: 'outline' | 'fill';
  iconPosition?: 'start' | 'end';
  type?: 'submit' | 'reset' | 'button' | undefined;
  size?: 'default' | 'middle' | 'small' | 'large';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean | { delay: number };
  important?: boolean;
  style?: React.CSSProperties;
  className?: string;
  ariaLabel?: string; // Thêm ariaLabel
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({
  variant = 'outline',
  disabled,
  children,
  onClick,
  loading,
  important,
  type,
  size,
  shape,
  style,
  className,
  ariaLabel,
  ...props
}) => (
  <AButton
    className={mapModifiers(
      'a-button',
      variant,
      size,
      shape,
      loading ? 'loading' : '',
      important ? 'important' : '',
      className,
    )}
    disabled={disabled}
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick();
    }}
    style={style}
    aria-label={
      ariaLabel || (typeof children === 'string' ? children : undefined)
    }
    {...props}
    loading={loading}
  >
    {children}
  </AButton>
);

export default Button;
