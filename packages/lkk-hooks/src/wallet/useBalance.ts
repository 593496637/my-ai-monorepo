/**
 * 钱包余额查询 Hook
 */
import { useState, useEffect, useCallback } from 'react';
import { formatBalance } from '@lkk/libs';

interface UseBalanceReturn {
  balance: string;
  formattedBalance: string;
  loading: boolean;
  error: string | null;
  refreshBalance: () => Promise<void>;
}

const useBalance = (
  account: string | null,
  chainId: number | null,
  tokenAddress: string | null = null
): UseBalanceReturn => {
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 获取ETH余额
  const getETHBalance = useCallback(async (address: string): Promise<string> => {
    if (!window.ethereum || !address) return '0';

    const balance: string = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest']
    });

    return balance;
  }, []);

  // 获取ERC20代币余额（简化版，实际需要合约ABI）
  const getTokenBalance = useCallback(async (address: string, tokenAddress: string): Promise<string> => {
    // 这里是简化实现，实际项目中需要使用ethers.js或web3.js
    // 以及ERC20合约的ABI来调用balanceOf方法
    console.log('Token balance query not implemented in demo !');
    return '0';
  }, []);

  // 刷新余额
  const refreshBalance = useCallback(async (): Promise<void> => {
    if (!account || !window.ethereum) {
      setBalance('0');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let balanceResult: string;

      if (tokenAddress) {
        // 查询代币余额
        balanceResult = await getTokenBalance(account, tokenAddress);
      } else {
        // 查询ETH余额
        balanceResult = await getETHBalance(account);
      }

      setBalance(balanceResult);
    } catch (err: any) {
      console.error('Balance query error:', err);
      setError(err.message || 'Failed to fetch balance');
      setBalance('0');
    } finally {
      setLoading(false);
    }
  }, [account, tokenAddress, getETHBalance, getTokenBalance]);

  // 监听账户和网络变化，自动刷新余额
  useEffect(() => {
    refreshBalance();
  }, [refreshBalance, chainId]);

  // 格式化余额显示
  const formattedBalance = formatBalance(balance, 4, tokenAddress ? 'TOKEN' : 'ETH');

  return {
    balance,
    formattedBalance,
    loading,
    error,
    refreshBalance
  };
};

export default useBalance;