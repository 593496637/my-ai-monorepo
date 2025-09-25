/**
 * 使用 useImmer 管理钱包状态的 Hook
 */
import { useImmer } from 'use-immer';
import { useCallback } from 'react';

interface Transaction {
  hash: string;
  description: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
  receipt?: any;
}

export interface WalletState {
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

interface UseWalletStateReturn {
  // 状态
  walletState: WalletState;

  // 连接相关
  setConnectionState: (isConnecting: boolean, isConnected?: boolean) => void;
  setWalletConnected: (account: string, chainId: number, networkName: string, balance?: string) => void;
  resetWalletState: () => void;

  // 账户相关
  setAccount: (account: string | null, balance?: string) => void;
  updateBalance: (newBalance: string) => void;

  // 网络相关
  setNetwork: (chainId: number | null, networkName?: string | null) => void;

  // 错误处理
  setError: (error: string | null) => void;
  clearError: () => void;

  // 交易管理
  addPendingTransaction: (txHash: string, description?: string) => void;
  updateTransactionStatus: (txHash: string, status: 'success' | 'failed', receipt?: any) => void;
  clearTransactions: () => void;

  // 计算属性
  hasPendingTransactions: boolean;
  hasTransactionHistory: boolean;
}

const useWalletState = (): UseWalletStateReturn => {
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
  }, [updateWalletState]);

  // 设置账户信息
  const setAccount = useCallback((account: string | null, balance: string = '0') => {
    updateWalletState(draft => {
      draft.account = account;
      draft.balance = balance;
      draft.isConnected = !!account;
    });
  }, [updateWalletState]);

  // 设置网络信息
  const setNetwork = useCallback((chainId: number | null, networkName: string | null = null) => {
    updateWalletState(draft => {
      draft.chainId = chainId;
      draft.networkName = networkName;
    });
  }, [updateWalletState]);

  // 设置错误
  const setError = useCallback((error: string | null) => {
    updateWalletState(draft => {
      draft.error = error;
      draft.isConnecting = false;
    });
  }, [updateWalletState]);

  // 清除错误
  const clearError = useCallback(() => {
    updateWalletState(draft => {
      draft.error = null;
    });
  }, [updateWalletState]);

  // 更新余额
  const updateBalance = useCallback((newBalance: string) => {
    updateWalletState(draft => {
      draft.balance = newBalance;
    });
  }, [updateWalletState]);

  // 添加待处理交易
  const addPendingTransaction = useCallback((txHash: string, description: string = '') => {
    updateWalletState(draft => {
      const tx: Transaction = {
        hash: txHash,
        description,
        timestamp: Date.now(),
        status: 'pending'
      };
      draft.pendingTransactions.push(tx);
    });
  }, [updateWalletState]);

  // 更新交易状态
  const updateTransactionStatus = useCallback((txHash: string, status: 'success' | 'failed', receipt: any = null) => {
    updateWalletState(draft => {
      // 从待处理列表中找到交易
      const pendingIndex = draft.pendingTransactions.findIndex(tx => tx.hash === txHash);

      if (pendingIndex !== -1) {
        const tx = draft.pendingTransactions[pendingIndex];
        tx.status = status;
        tx.receipt = receipt;

        // 如果交易完成（成功或失败），移到历史记录
        if (status === 'success' || status === 'failed') {
          draft.transactionHistory.unshift(tx);
          draft.pendingTransactions.splice(pendingIndex, 1);

          // 限制历史记录数量
          if (draft.transactionHistory.length > 50) {
            draft.transactionHistory = draft.transactionHistory.slice(0, 50);
          }
        }
      }
    });
  }, [updateWalletState]);

  // 清除所有交易记录
  const clearTransactions = useCallback(() => {
    updateWalletState(draft => {
      draft.pendingTransactions = [];
      draft.transactionHistory = [];
    });
  }, [updateWalletState]);

  // 重置钱包状态
  const resetWalletState = useCallback(() => {
    updateWalletState(() => initialWalletState);
  }, [updateWalletState]);

  // 批量更新状态（用于连接成功后）
  const setWalletConnected = useCallback((account: string, chainId: number, networkName: string, balance: string = '0') => {
    updateWalletState(draft => {
      draft.account = account;
      draft.chainId = chainId;
      draft.networkName = networkName;
      draft.balance = balance;
      draft.isConnected = true;
      draft.isConnecting = false;
      draft.error = null;
    });
  }, [updateWalletState]);

  return {
    // 状态
    walletState,

    // 连接相关
    setConnectionState,
    setWalletConnected,
    resetWalletState,

    // 账户相关
    setAccount,
    updateBalance,

    // 网络相关
    setNetwork,

    // 错误处理
    setError,
    clearError,

    // 交易管理
    addPendingTransaction,
    updateTransactionStatus,
    clearTransactions,

    // 计算属性
    hasPendingTransactions: walletState.pendingTransactions.length > 0,
    hasTransactionHistory: walletState.transactionHistory.length > 0
  };
};

export default useWalletState;