import React from 'react';
import './Button.css';

export interface ButtonProps {
  /**
   * 按钮显示的文本
   */
  children: React.ReactNode;
  /**
   * 按钮的类型
   */
  type?: 'primary' | 'secondary' | 'danger';
  /**
   * 按钮的尺寸
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * Button 组件 - 通用按钮组件
 * 
 * @example
 * ```tsx
 * <Button type="primary" size="medium" onClick={() => console.log('clicked')}>
 *   点击我
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}) => {
  const baseClass = 'lkk-button';
  const typeClass = `${baseClass}--${type}`;
  const sizeClass = `${baseClass}--${size}`;
  const disabledClass = disabled || loading ? `${baseClass}--disabled` : '';
  const loadingClass = loading ? `${baseClass}--loading` : '';

  const classes = [
    baseClass,
    typeClass,
    sizeClass,
    disabledClass,
    loadingClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
    >
      {loading && <span className="lkk-button__spinner" />}
      <span className="lkk-button__content">{children}</span>
    </button>
  );
};
