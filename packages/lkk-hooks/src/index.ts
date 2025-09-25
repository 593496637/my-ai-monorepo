/**
 * @lkk/hooks 主入口文件
 */

// 钱包连接相关
export { default as useWallet } from './wallet/useWallet';
export { default as useBalance } from './wallet/useBalance';
export { default as useSendTransaction } from './wallet/useSendTransaction';

// 状态管理相关
export { default as useWalletState } from './state/useWalletState';
export { default as useCustomWalletState } from './state/useCustomWalletState';
export { default as useImmer } from './utils/immer';

// 类型导出
export type { WalletState } from './state/useWalletState';
export type { SendTransactionOptions, TransactionStatus } from './wallet/useSendTransaction';