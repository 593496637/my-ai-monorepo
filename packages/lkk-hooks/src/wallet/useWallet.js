/**
 * MetaMask 钱包连接管理 Hook
 */
import { useState, useEffect, useCallback } from 'react';
import { formatWalletAddress, isValidEthereumAddress, getChainName } from '@lkk/libs';

const useWallet = () => {
  const [walletState, setWalletState] = useState({
    account: null,
    chainId: null,
    isConnected: false,
    isConnecting: false,
    error: null
  });

  // 检查 MetaMask 是否安装
  const isMetaMaskInstalled = useCallback(() => {
    return typeof window !== 'undefined' &&
           typeof window.ethereum !== 'undefined' &&
           window.ethereum.isMetaMask;
  }, []);

  // 连接钱包
  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setWalletState(prev => ({
        ...prev,
        error: 'MetaMask is not installed. Please install MetaMask extension.'
      }));
      return;
    }

    setWalletState(prev => ({
      ...prev,
      isConnecting: true,
      error: null
    }));

    try {
      // 请求连接账户
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // 获取当前链ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      if (accounts.length > 0 && isValidEthereumAddress(accounts[0])) {
        setWalletState(prev => ({
          ...prev,
          account: accounts[0],
          chainId: parseInt(chainId, 16),
          isConnected: true,
          isConnecting: false,
          error: null
        }));
      }
    } catch (error) {
      console.error('Connection error:', error);
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect to MetaMask'
      }));
    }
  }, [isMetaMaskInstalled]);

  // 断开连接
  const disconnect = useCallback(() => {
    setWalletState({
      account: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
      error: null
    });
  }, []);

  // 切换网络
  const switchNetwork = useCallback(async (chainId) => {
    if (!isMetaMaskInstalled()) {
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      });
    } catch (error) {
      console.error('Switch network error:', error);
      setWalletState(prev => ({
        ...prev,
        error: `Failed to switch to network ${chainId}: ${error.message}`
      }));
    }
  }, [isMetaMaskInstalled]);

  // 监听账户变化
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnect();
      } else if (accounts[0] !== walletState.account) {
        setWalletState(prev => ({
          ...prev,
          account: accounts[0],
          isConnected: true
        }));
      }
    };

    const handleChainChanged = (chainId) => {
      setWalletState(prev => ({
        ...prev,
        chainId: parseInt(chainId, 16)
      }));
    };

    const handleDisconnect = () => {
      disconnect();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [isMetaMaskInstalled, disconnect, walletState.account]);

  // 初始化检查连接状态
  useEffect(() => {
    const checkConnection = async () => {
      if (!isMetaMaskInstalled()) return;

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        });

        if (accounts.length > 0) {
          const chainId = await window.ethereum.request({
            method: 'eth_chainId'
          });

          setWalletState(prev => ({
            ...prev,
            account: accounts[0],
            chainId: parseInt(chainId, 16),
            isConnected: true
          }));
        }
      } catch (error) {
        console.error('Check connection error:', error);
      }
    };

    checkConnection();
  }, [isMetaMaskInstalled]);

  // 格式化地址显示
  const formattedAddress = walletState.account
    ? formatWalletAddress(walletState.account)
    : null;

  // 获取当前网络名称
  const networkName = walletState.chainId
    ? getChainName(walletState.chainId)
    : null;

  return {
    // 状态
    account: walletState.account,
    chainId: walletState.chainId,
    isConnected: walletState.isConnected,
    isConnecting: walletState.isConnecting,
    error: walletState.error,

    // 格式化数据
    formattedAddress,
    networkName,

    // 操作方法
    connect,
    disconnect,
    switchNetwork,

    // 工具方法
    isMetaMaskInstalled: isMetaMaskInstalled()
  };
};

export default useWallet;