import React, { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import TransactionDetails from "./TransactionDetails";
import BlinkingDotsBackground from "./BlinkingDotsBackground";

const BalanceChecker = () => {
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);

  const checkBalance = async () => {
    if (!publicKey) return;

    try {
      const connection = new Connection(
        "https://solana-mainnet.g.alchemy.com/v2/FwdhXwz5TEVKoa5nxDNfKq49nb7-YHFO",
        "confirmed"
      );

      const pubKey = new PublicKey(publicKey);
      const balance = await connection.getBalance(pubKey);
      setBalance(balance / 1e9); // Convert lamports to SOL
      setError("");

      // Fetch transactions
      const recentTransactions =
        await connection.getConfirmedSignaturesForAddress2(pubKey, {
          limit: 5,
        });
      const transactionsData = await Promise.all(
        recentTransactions.map(async (tx) => {
          const transactionDetails = await connection.getTransaction(
            tx.signature
          );
          return {
            signature: tx.signature,
            amount:
              transactionDetails?.meta?.preBalances[0] -
              transactionDetails?.meta?.postBalances[0],
            timestamp: transactionDetails?.blockTime * 1000 || Date.now(),
          };
        })
      );
      setTransactions(transactionsData);
    } catch (err) {
      setError("Invalid Address or unable to fetch balance");
      setBalance(null);
      setTransactions([]);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000000",
        fontFamily: "'Roboto', sans-serif",
        padding: "1rem",
        minHeight: "100vh",
        position: "relative", // Ensure relative positioning for absolute children
        overflow: "hidden", // Prevent scrollbars
      }}
    >
      <BlinkingDotsBackground /> {/* Add the blinking dots background */}
      <div
        style={{
          textAlign: "center",
          position: "relative", // Position relative to stack above background
          zIndex: 1,
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: "3rem",
            marginBottom: "2rem",
            marginTop: "0rem",
          }}
        >
          Solana Balance Checker
        </h1>
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            maxWidth: "400px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <input
            type="text"
            placeholder="Enter your Address"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "100%",
              marginBottom: "1rem",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={checkBalance}
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
              boxSizing: "border-box",
              transition: "background-color 0.3s",
              marginBottom: "1rem",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Check Balance
          </button>
          {balance !== null && (
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginTop: "1.5rem",
                color: "#333",
              }}
            >
              Balance: {balance.toFixed(3)} SOL
            </p>
          )}
          {error && (
            <p style={{ color: "#d9534f", marginTop: "1rem" }}>{error}</p>
          )}
          <p
            style={{
              fontSize: "0.875rem",
              color: "#666",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Note: Balance is displayed in SOL (1 SOL = 1 billion lamports)
          </p>
        </div>
        {publicKey && <TransactionDetails transactions={transactions} />}
      </div>
      <style>
        {`
          @media (max-width: 768px) {
            h1 {
              font-size: 2rem;
              margin-bottom: 1.5rem;
            }
            div[style*="padding: 2rem;"] {
              padding: 1.5rem;
              max-width: 90%;
            }
            button {
              font-size: 0.9rem;
              padding: 0.7rem;
            }
            p[style*="font-size: 1.25rem;"] {
              font-size: 1rem;
            }
          }

          @media (max-width: 480px) {
            h1 {
              font-size: 1.5rem;
            }
            div[style*="padding: 2rem;"] {
              padding: 1rem;
            }
            input,
            button {
              font-size: 0.85rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BalanceChecker;
