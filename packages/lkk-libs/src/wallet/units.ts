/**
 * 以太坊单位转换工具函数哈
 */

/**
 * Wei转换为Ether（简化版，不依赖ethers.js）
 */
export function formatEther(weiValue: string | number): string {
  if (!weiValue) return '0';

  let wei: bigint;

  // 如果是十六进制字符串（MetaMask返回格式）
  if (typeof weiValue === 'string' && weiValue.startsWith('0x')) {
    wei = BigInt(weiValue);
  }
  // 如果是十进制字符串或数字
  else {
    const weiStr = typeof weiValue === 'string' ? weiValue : weiValue.toString();
    wei = BigInt(weiStr);
  }

  // 使用 BigInt 进行精确计算
  const etherBigInt = wei / BigInt(10 ** 18);
  const remainder = wei % BigInt(10 ** 18);

  // 转换为小数
  const etherValue = Number(etherBigInt) + Number(remainder) / (10 ** 18);

  return etherValue.toFixed(6);
}

/**
 * Ether转换为Wei（简化版，不依赖ethers.js）
 */
export function parseEther(etherValue: string | number): string {
  if (!etherValue) return '0x0';

  const ether = typeof etherValue === 'string' ? parseFloat(etherValue) : etherValue;

  // 使用 BigInt 进行精确计算
  const weiValue = BigInt(Math.floor(ether * (10 ** 18)));

  return '0x' + weiValue.toString(16);
}

/**
 * 格式化余额显示
 */
export function formatBalance(
  balance: string | number,
  decimals: number = 4,
  symbol: string = 'ETH'
): string {
  if (!balance) return `0 ${symbol}`;

  const etherValue = formatEther(balance);
  const rounded = parseFloat(etherValue).toFixed(decimals);

  return `${rounded} ${symbol}`;
}

/**
 * 格式化数量显示（带千分位分隔符）
 */
export function formatNumber(value: string | number, decimals: number = 2): string {
  if (!value || isNaN(Number(value))) return '0';

  const num = typeof value === 'string' ? parseFloat(value) : value;

  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
}

