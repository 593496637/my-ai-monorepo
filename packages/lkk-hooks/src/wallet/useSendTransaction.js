/**
 * 发送交易 Hook
 */
import { useState, useCallback } from 'react';
import { parseEther } from '@lkk/libs';

const useSendTransaction = () => {
  const [txState, setTxState] = useState({
    loading: false,
    txHash: null,
    error: null,
    receipt: null
  });

  // 发送ETH交易
  const sendETH = useCallback(async (toAddress, amount, gasLimit = null) => {
    if (!window.ethereum) {
      setTxState(prev => ({
        ...prev,
        error: 'MetaMask not found'
      }));
      return null;
    }

    setTxState({
      loading: true,
      txHash: null,
      error: null,
      receipt: null
    });

    try {
      // 构建交易参数
      const transactionParameters = {
        to: toAddress,
        value: parseEther(amount.toString()), // parseEther 现在直接返回十六进制
        gas: gasLimit ? `0x${gasLimit.toString(16)}` : undefined
      };

      // 发送交易
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
      });

      setTxState(prev => ({
        ...prev,
        txHash,
        loading: false
      }));

      return txHash;

    } catch (error) {
      console.error('Transaction error:', error);

      let errorMessage = 'Transaction failed';

      if (error.code === 4001) {
        errorMessage = 'Transaction rejected by user';
      } else if (error.code === -32603) {
        errorMessage = 'Transaction execution error';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setTxState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));

      return null;
    }
  }, []);

  // 等待交易确认
  const waitForTransaction = useCallback(async (txHash) => {
    if (!txHash || !window.ethereum) return null;

    try {
      // 简化的交易确认等待（实际项目中建议使用ethers.js）
      let receipt = null;
      let attempts = 0;
      const maxAttempts = 60; // 最多等待60次，每次1秒

      while (!receipt && attempts < maxAttempts) {
        try {
          receipt = await window.ethereum.request({
            method: 'eth_getTransactionReceipt',
            params: [txHash]
          });

          if (receipt) {
            setTxState(prev => ({
              ...prev,
              receipt
            }));
            break;
          }

          // 等待1秒后重试
          await new Promise(resolve => setTimeout(resolve, 1000));
          attempts++;

        } catch (error) {
          // 如果获取receipt失败，继续重试
          attempts++;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      return receipt;

    } catch (error) {
      console.error('Wait for transaction error:', error);
      return null;
    }
  }, []);

  // 重置状态
  const reset = useCallback(() => {
    setTxState({
      loading: false,
      txHash: null,
      error: null,
      receipt: null
    });
  }, []);

  // 获取交易状态
  const getTransactionStatus = useCallback(() => {
    if (txState.receipt) {
      return txState.receipt.status === '0x1' ? 'success' : 'failed';
    }
    if (txState.txHash) {
      return 'pending';
    }
    return 'idle';
  }, [txState.receipt, txState.txHash]);

  return {
    // 状态
    loading: txState.loading,
    txHash: txState.txHash,
    error: txState.error,
    receipt: txState.receipt,

    // 操作方法
    sendETH,
    waitForTransaction,
    reset,

    // 工具方法
    status: getTransactionStatus(),
    isSuccess: getTransactionStatus() === 'success',
    isPending: getTransactionStatus() === 'pending',
    isFailed: getTransactionStatus() === 'failed'
  };
};

export default useSendTransaction;