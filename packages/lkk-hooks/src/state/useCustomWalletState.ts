/**
 * 使用自定义 useImmer 管理钱包状态的 Hook
 */
import { useCallback } from 'react';
import useImmer from '../utils/immer';

interface Transaction {
  hash: string;
  description: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
  receipt?: any;
}

interface WalletState {
  // 连接状态
  isConnected: boolean;
  isConnecting: boolean;

  // 账户信息
  account: string | null;
  balance: string;

  // 网络信息
  chainId: number | null;
  networkName: string | null;

  // 错误信息
  error: string | null;

  // 交易相关
  pendingTransactions: Transaction[];
  transactionHistory: Transaction[];
}

const initialWalletState: WalletState = {
  // 连接状态
  isConnected: false,
  isConnecting: false,

  // 账户信息
  account: null,
  balance: '0',

  // 网络信息
  chainId: null,
  networkName: null,

  // 错误信息
  error: null,

  // 交易相关
  pendingTransactions: [],
  transactionHistory: []
};

interface UseCustomWalletStateReturn {
  // 状态
  walletState: WalletState;

  // 操作方法
  setConnectionState: (isConnecting: boolean, isConnected?: boolean) => void;
  setAccount: (account: string | null, balance?: string) => void;
  setNetwork: (chainId: number | null, networkName?: string | null) => void;
  setError: (error: string | null) => void;
  addPendingTransaction: (txHash: string, description?: string) => void;
  updateTransactionStatus: (txHash: string, status: 'success' | 'failed', receipt?: any) => void;
  setWalletConnected: (account: string, chainId: number, networkName: string, balance?: string) => void;
  resetWalletState: () => void;

  // 计算属性
  hasPendingTransactions: boolean;
  hasTransactionHistory: boolean;
}

const useCustomWalletState = (): UseCustomWalletStateReturn => {
  const [walletState, updateWalletState] = useImmer<WalletState>(initialWalletState);

  // 设置连接状态
  const setConnectionState = useCallback((isConnecting: boolean, isConnected: boolean = false) => {
    updateWalletState(draft => {
      draft.isConnecting = isConnecting;
      draft.isConnected = isConnected;
      if (isConnecting) {
        draft.error = null;
      }
    });
  }, []); // 移除依赖

  // 设置账户信息
  const setAccount = useCallback((account: string | null, balance: string = '0') => {
    updateWalletState(draft => {
      draft.account = account;
      draft.balance = balance;
      draft.isConnected = !!account;
    });
  }, []); // 移除依赖

  // 设置网络信息
  const setNetwork = useCallback((chainId: number | null, networkName: string | null = null) => {
    updateWalletState(draft => {
      draft.chainId = chainId;
      draft.networkName = networkName;
    });
  }, []); // 移除依赖

  // 设置错误
  const setError = useCallback((error: string | null) => {
    updateWalletState(draft => {
      draft.error = error;
      draft.isConnecting = false;
    });
  }, []); // 移除依赖

  // 添加待处理交易 (展示自定义immer的数组操作能力)
  const addPendingTransaction = useCallback((txHash: string, description: string = '') => {
    updateWalletState(draft => {
      const tx: Transaction = {
        hash: txHash,
        description,
        timestamp: Date.now(),
        status: 'pending'
      };
      // 直接 push，自定义 immer 会处理不可变更新
      draft.pendingTransactions.push(tx);
    });
  }, []); // 移除依赖

  // 更新交易状态 (展示复杂的数组操作)
  const updateTransactionStatus = useCallback((txHash: string, status: 'success' | 'failed', receipt: any = null) => {
    updateWalletState(draft => {
      // 查找并更新交易
      const txIndex = draft.pendingTransactions.findIndex(tx => tx.hash === txHash);

      if (txIndex !== -1) {
        const tx = draft.pendingTransactions[txIndex];
        tx.status = status;
        tx.receipt = receipt;

        // 如果完成，移动到历史记录
        if (status === 'success' || status === 'failed') {
          // 移除 pending 交易
          draft.pendingTransactions.splice(txIndex, 1);

          // 添加到历史记录开头
          draft.transactionHistory.unshift(tx);

          // 限制历史记录数量
          if (draft.transactionHistory.length > 50) {
            draft.transactionHistory.splice(50);
          }
        }
      }
    });
  }, []); // 移除依赖

  // 批量更新多个字段 (展示复杂状态更新)
  const setWalletConnected = useCallback((account: string, chainId: number, networkName: string, balance: string = '0') => {
    updateWalletState(draft => {
      // 一次性更新多个字段
      draft.account = account;
      draft.chainId = chainId;
      draft.networkName = networkName;
      draft.balance = balance;
      draft.isConnected = true;
      draft.isConnecting = false;
      draft.error = null;
    });
  }, []); // 移除依赖

  // 重置状态
  const resetWalletState = useCallback(() => {
    updateWalletState(() => initialWalletState);
  }, []); // 移除依赖

  return {
    // 状态
    walletState,

    // 操作方法
    setConnectionState,
    setAccount,
    setNetwork,
    setError,
    addPendingTransaction,
    updateTransactionStatus,
    setWalletConnected,
    resetWalletState,

    // 计算属性
    hasPendingTransactions: walletState.pendingTransactions.length > 0,
    hasTransactionHistory: walletState.transactionHistory.length > 0
  };
};

export default useCustomWalletState;