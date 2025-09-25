/**
 * 钱包地址格式化工具函数
 */

/**
 * 格式化钱包地址，显示为缩写形式
 */
export function formatWalletAddress(
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address || typeof address !== 'string') {
    return '';
  }

  if (address.length <= startLength + endLength) {
    return address;
  }

  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * 验证是否为有效的以太坊地址
 */
export function isValidEthereumAddress(address: string): boolean {
  if (!address || typeof address !== 'string') {
    return false;
  }

  // 基本格式验证：0x开头，42位字符，只包含十六进制字符
  const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethereumAddressRegex.test(address);
}

/**
 * 格式化交易哈希，显示为缩写形式
 */
export function formatTxHash(
  hash: string,
  startLength: number = 8,
  endLength: number = 6
): string {
  if (!hash || typeof hash !== 'string') {
    return '';
  }

  if (hash.length <= startLength + endLength) {
    return hash;
  }

  return `${hash.slice(0, startLength)}...${hash.slice(-endLength)}`;
}

/**
 * 检查地址是否相等（忽略大小写）
 */
export function isSameAddress(address1: string, address2: string): boolean {
  if (!address1 || !address2) {
    return false;
  }

  return address1.toLowerCase() === address2.toLowerCase();
}