/**
 * @lkk/libs 主入口文件
 */

import * as addressUtils from './wallet/address';
import * as unitUtils from './wallet/units';
import * as chainUtils from './wallet/chains';

// 地址相关工具
export const {
  formatWalletAddress,
  isValidEthereumAddress,
  formatTxHash,
  isSameAddress
} = addressUtils;

// 单位转换工具
export const {
  formatEther,
  parseEther,
  formatBalance,
  formatNumber
} = unitUtils;

// 链相关工具
export const {
  CHAIN_CONFIG,
  getChainName,
  getChainInfo,
  isTestnet,
  getExplorerLink
} = chainUtils;

// 导出类型
export type { ChainConfig } from './wallet/chains';