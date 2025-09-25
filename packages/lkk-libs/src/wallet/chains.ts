/**
 * 以太坊网络/链相关工具函数
 */

// 链配置类型定义
export interface ChainConfig {
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorerUrl: string;
}

// 常用链配置
export const CHAIN_CONFIG: Record<number, ChainConfig> = {
  1: {
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    rpcUrl: 'https://ethereum.publicnode.com',
    blockExplorerUrl: 'https://etherscan.io'
  },
  11155111: {
    name: 'Sepolia Testnet',
    symbol: 'ETH',
    rpcUrl: 'https://ethereum-sepolia.publicnode.com',
    blockExplorerUrl: 'https://sepolia.etherscan.io'
  },
  137: {
    name: 'Polygon Mainnet',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon.publicnode.com',
    blockExplorerUrl: 'https://polygonscan.com'
  },
  80001: {
    name: 'Polygon Mumbai',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-mumbai.publicnode.com',
    blockExplorerUrl: 'https://mumbai.polygonscan.com'
  }
};

/**
 * 根据chainId获取链名称
 */
export function getChainName(chainId: number | string): string {
  const id = typeof chainId === 'string' ? parseInt(chainId) : chainId;
  return CHAIN_CONFIG[id]?.name || `Chain ${id}`;
}

/**
 * 根据chainId获取链信息
 */
export function getChainInfo(chainId: number | string): ChainConfig {
  const id = typeof chainId === 'string' ? parseInt(chainId) : chainId;
  return CHAIN_CONFIG[id] || {
    name: `Chain ${id}`,
    symbol: 'ETH',
    rpcUrl: '',
    blockExplorerUrl: ''
  };
}

/**
 * 检查是否为测试网
 */
export function isTestnet(chainId: number | string): boolean {
  const id = typeof chainId === 'string' ? parseInt(chainId) : chainId;
  const testnetIds = [11155111, 80001, 5, 97]; // Sepolia, Mumbai, Goerli, BSC Testnet
  return testnetIds.includes(id);
}

/**
 * 生成区块浏览器链接
 */
export function getExplorerLink(
  chainId: number | string,
  hash: string,
  type: 'tx' | 'address' = 'tx'
): string {
  const chainInfo = getChainInfo(chainId);
  if (!chainInfo.blockExplorerUrl) return '';

  const endpoint = type === 'tx' ? 'tx' : 'address';
  return `${chainInfo.blockExplorerUrl}/${endpoint}/${hash}`;
}