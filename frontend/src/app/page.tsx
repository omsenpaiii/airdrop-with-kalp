"use client"
import React, { useEffect, useState } from 'react';
import { useKalpApi } from '@/hooks/useKalpAPI';
import HyperText from '@/components/magicui/hyper-text';



const Home: React.FC = () => {
  const { claim, balanceOf, totalSupply, loading } = useKalpApi();
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [totalAirdrop, setTotalAirdrop] = useState(0);

  const handleClaim = async () => {
    try {
      const data = await claim(walletAddress);
      await handleTotalSupply();
      console.log('Claim successful:', data);
    } catch (err) {
      console.error('Claim error:', err);
    }
  };

  const handleBalanceOf = async () => {
    try {
      const data = await balanceOf(walletAddress);
      setBalance(data.result.result);
      console.log('Balance:', data);
    } catch (err) {
      console.error('BalanceOf error:', err);
    }
  };

  const handleTotalSupply = async () => {
    try {
      const data = await totalSupply();
      setTotalAirdrop(data.result.result);
      console.log('Total Supply:', data);
    } catch (err) {
      console.error('TotalSupply error:', err);
    }
  };

  useEffect(() => {
    handleTotalSupply();
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center bg-img text-white'>
      <div className='bg-black bg-opacity-40 backdrop-blur-md p-6 rounded-3xl shadow-lg mt-12'>
        <HyperText
          className="text-6xl font-bold"
          text="Airdrop Machine"
        />
      </div>

      <div className='flex flex-col md:flex-row gap-10 mt-8'>
        <div className='bg-black bg-opacity-40 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md'>
          <HyperText
            className='text-2xl font-semibold mb-4'
            text="Claim Tokens"
          />
          <input
            placeholder='Enter your wallet address'
            type="text"
            className='border border-gray-600 bg-gray-700 p-3 rounded-lg text-white w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setWalletAddress(e.target.value)}
          />

            <button
              className={`w-full py-3 rounded-lg ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'} text-white transition`}
              onClick={handleClaim}
              disabled={loading}
              style={{ height: '50px', minWidth: '120px' }} // Set minWidth for consistent button width
            >
              {loading ? "Claiming..." : "Claim"}
            </button>

        </div>

        <div className='bg-black bg-opacity-40 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md'>
          <HyperText
            className='text-2xl font-semibold mb-4'
            text="My Balance"
          />
          <input
            placeholder='Enter your wallet address'
            type="text"
            className='border border-gray-600 bg-gray-700 p-3 rounded-lg text-white w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setWalletAddress(e.target.value)}
          />

            <button
              className='w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition'
              onClick={handleBalanceOf}
            >
              Check Balance
            </button>

          <p className='text-lg mt-4'>Balance: <span className='text-blue-400 text-2xl'>{balance}</span></p>
        </div>
      </div>

      <div className='bg-black bg-opacity-40 backdrop-blur-md p-8 mt-10 rounded-3xl shadow-lg w-full max-w-md text-center'>
        <HyperText
          className='text-2xl font-semibold mb-4'
          text="Total Airdrop Tokens Claimed"
        />
        <p className='text-6xl text-blue-400 font-bold'>{totalAirdrop}</p>

      </div>
    </div>
  );
}

export default Home;
