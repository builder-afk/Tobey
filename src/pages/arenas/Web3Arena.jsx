import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Coins, Play, CheckCircle2, ArrowLeft, Terminal, Key, 
  ExternalLink, ShieldAlert, Cpu, Network, Wallet, ShieldCheck, Database, Hexagon
} from 'lucide-react';

export default function Web3Arena() {
  const navigate = useNavigate();
  const [chain, setChain] = useState('ethereum');
  const [code, setCode] = useState({
    ethereum: `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract SimpleVault {\n    mapping(address => uint256) public balances;\n\n    function deposit() public payable {\n        balances[msg.sender] += msg.value;\n    }\n\n    // VULNERABLE FUNCTION\n    function withdraw() public {\n        uint256 bal = balances[msg.sender];\n        require(bal > 0, "No balance");\n        \n        (bool sent, ) = msg.sender.call{value: bal}("");\n        require(sent, "Failed to send Ether");\n        \n        balances[msg.sender] = 0;\n    }\n}`,
    solana: `use anchor_lang::prelude::*;\n\ndeclare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");\n\n#[program]\npub mod solana_vault {\n    use super::*;\n\n    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {\n        Ok(())\n    }\n\n    // VULNERABLE FUNCTION\n    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {\n        let user = &ctx.accounts.user;\n        // Missing signer check!\n        // if !user.is_signer { return err!(MyError::Unauthorized); }\n        Ok(())\n    }\n}\n\n#[derive(Accounts)]\npub struct Initialize {}\n\n#[derive(Accounts)]\npub struct Withdraw<'info> {\n    /// CHECK: Safe in this demo\n    pub user: AccountInfo<'info>,\n}`
  });
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [contractData, setContractData] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(chain === 'ethereum' ? {
        status: 'warning',
        title: 'Reentrancy Vulnerability Detected',
        description: 'The withdraw() function sends Ether before updating the balance state. This allows a malicious contract to re-enter withdraw() and drain funds.',
        recommendation: 'Apply Checks-Effects-Interactions: balances[msg.sender] = 0 MUST execute before external low-level call.'
      } : {
        status: 'danger',
        title: 'Missing Signer Check Detected',
        description: 'The withdraw() function does not verify if the user account signed the transaction. Anyone can withdraw funds on behalf of the user.',
        recommendation: 'Add #[account(signer)] constraint to user in Withdraw struct, or assert user.is_signer.'
      });
    }, 1200);
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setContractData(null);
    
    setTimeout(() => {
      setIsDeploying(false);
      setContractData(chain === 'ethereum' ? {
        address: '0x71C...976F',
        network: 'Ethereum Sepolia Testnet',
        gasUsed: '843,158 GAS',
        txHash: '0x9a8b...1f2e',
        status: 'MINED'
      } : {
        address: '3vK9...q8Zx',
        network: 'Solana Devnet',
        gasUsed: '0.000005 SOL',
        txHash: '4G9a...8pLm',
        status: 'CONFIRMED'
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F5] text-black font-mono">
      {/* Header */}
      <div className="h-16 border-b-4 border-black flex items-center justify-between px-6 bg-white shadow-[0px_4px_0px_#000] z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/royale')} 
            className="p-2 bg-white hover:bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            <ArrowLeft size={18} className="stroke-[3]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border-2 border-black bg-[#CCFF00] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Hexagon size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">WEB3 &amp; SMART CONTRACTS</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <button 
                  onClick={() => setChain('ethereum')}
                  className={`text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] ${chain === 'ethereum' ? 'bg-[#00F0FF] text-black' : 'bg-white text-gray-700'}`}
                >
                  ETHEREUM (SOLIDITY)
                </button>
                <button 
                  onClick={() => setChain('solana')}
                  className={`text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] ${chain === 'solana' ? 'bg-[#CCFF00] text-black' : 'bg-white text-gray-700'}`}
                >
                  SOLANA (ANCHOR)
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {!walletConnected ? (
            <button 
              onClick={handleConnectWallet}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFDE59] hover:bg-[#ffe57e] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
            >
              <Wallet size={14} className="stroke-[2.5]" /> CONNECT WALLET
            </button>
          ) : (
            <div className="flex items-center gap-3 px-3 py-1 bg-white border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>0XAB1...F89C</span>
              <span className="bg-[#FAF8F5] border border-black px-1.5 py-0.2">
                {chain === 'ethereum' ? '12.5 ETH' : '450.0 SOL'}
              </span>
            </div>
          )}
          
          <button 
            onClick={handleDeploy}
            disabled={isDeploying || !walletConnected}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isDeploying ? <span className="animate-spin text-sm">⍥</span> : <Play size={14} className="stroke-[3]" />}
            {isDeploying ? 'DEPLOYING CONTRACT...' : 'COMPILE & DEPLOY'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        
        {/* Left Panel: Editor */}
        <div className="flex flex-col bg-[#18181b] border-4 border-black overflow-hidden shadow-[5px_5px_0px_#000]">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <Terminal size={14} className="stroke-[3]" /> 
              {chain === 'ethereum' ? 'Vault.sol' : 'lib.rs'}
            </div>
            <button 
              onClick={handleScan}
              disabled={isScanning}
              className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider bg-[#FF0033] text-white border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            >
              {isScanning ? <span className="animate-spin">⍥</span> : <ShieldAlert size={12} className="stroke-[3]" />}
              RUN AUDITOR
            </button>
          </div>
          <div className="flex-1 flex relative overflow-hidden">
            <div className="w-12 bg-[#18181b] border-r border-zinc-700 py-6 text-zinc-500 font-mono text-xs select-none flex flex-col items-center">
              {Array.from({length: 20}).map((_, i) => <span key={i} className="leading-relaxed">{i + 1}</span>)}
            </div>
            <textarea
              value={code[chain]}
              onChange={(e) => setCode(prev => ({ ...prev, [chain]: e.target.value }))}
              className="w-full h-full bg-transparent text-zinc-100 p-6 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#CCFF00] selection:text-black"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right Panel: Explorer & Audit Dashboard */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          
          {/* Static Analysis Result */}
          {scanResult && (
            <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-3 mb-3 border-b-2 border-black pb-2">
                <div className="w-8 h-8 border-2 border-black bg-[#FF0033] text-white flex items-center justify-center shadow-[1px_1px_0px_#000]">
                  <ShieldAlert size={18} className="stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase text-black">
                    {scanResult.title}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-600 uppercase">SECURITY SCAN AUDIT REPORT</p>
                </div>
              </div>
              <div className="text-xs font-bold text-gray-800 leading-relaxed mb-3 bg-[#FAF8F5] border-2 border-black p-3">
                {scanResult.description}
              </div>
              <div className="bg-[#CCFF00] border-2 border-black p-3 text-xs font-black uppercase text-black flex items-start gap-2 shadow-[2px_2px_0px_#000]">
                <ShieldCheck size={16} className="shrink-0 stroke-[3]" />
                <span>FIX: {scanResult.recommendation}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col flex-1 bg-white border-4 border-black p-6 shadow-[5px_5px_0px_#000]">
            <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
              <Network size={18} className="stroke-[2.5]" />
              <h2 className="text-xs font-black uppercase tracking-wider text-black">
                [ {chain === 'ethereum' ? 'EVM ON-CHAIN EXPLORER' : 'SOLANA RPC EXPLORER'} ]
              </h2>
            </div>

            {!contractData && !isDeploying && (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-2 p-8">
                <Database size={36} className="stroke-[2.5] text-black" />
                <p className="text-xs font-black uppercase text-black text-center">
                  WRITE CONTRACT, CONNECT WALLET, AND CLICK [ COMPILE &amp; DEPLOY ] TO BROADCAST TRANSACTION.
                </p>
              </div>
            )}

            {isDeploying && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
                <div className="w-12 h-12 border-4 border-black border-t-[#00F0FF] animate-spin" />
                <div className="text-center font-mono text-xs font-black uppercase text-black">
                  WAITING FOR MEMPOOL INCLUSION &amp; CONSENSUS VALIDATION...
                </div>
              </div>
            )}

            {contractData && (
              <div className="space-y-4">
                <div className="bg-[#CCFF00] border-2 border-black p-3 flex items-center justify-between shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="stroke-[3]" />
                    <span className="font-black text-xs uppercase">DEPLOYMENT MINED SUCCESSFULLY</span>
                  </div>
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase">
                    {contractData.status}
                  </span>
                </div>

                <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-3 text-xs">
                  <div>
                    <div className="text-[10px] font-black text-gray-600 uppercase">NETWORK</div>
                    <div className="font-black text-black">{contractData.network}</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-black text-gray-600 uppercase">PROGRAM ID / ADDRESS</div>
                    <div className="font-mono font-bold bg-white border border-black p-2 flex items-center justify-between">
                      <span>{contractData.address}</span>
                      <ExternalLink size={14} className="stroke-[2.5]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-gray-300">
                    <div>
                      <div className="text-[10px] font-black text-gray-600 uppercase">GAS USAGE</div>
                      <div className="font-black text-black">{contractData.gasUsed}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-gray-600 uppercase">TX HASH</div>
                      <div className="font-mono font-bold truncate text-blue-600">{contractData.txHash}</div>
                    </div>
                  </div>
                </div>

                {/* Interact */}
                <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_#000]">
                  <h3 className="font-black text-xs uppercase mb-3">[ INTERACT WITH LIVE CONTRACT ]</h3>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="UINT256 AMOUNT" 
                      className="flex-1 bg-[#FAF8F5] border-2 border-black px-3 py-1.5 text-xs font-mono font-black uppercase shadow-[1px_1px_0px_#000]" 
                    />
                    <button className="px-4 py-1.5 bg-[#FFDE59] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5">
                      WITHDRAW
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
