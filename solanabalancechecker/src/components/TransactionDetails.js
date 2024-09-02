import React, { useState } from "react";
import "./TransactionDetails.css";

const TransactionDetails = ({ transactions }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (transactions.length === 0) {
    return null; // No transactions to display
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Centers the component horizontally
        marginTop: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "1.5rem",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <h2
          style={{
            color: "#333",
            fontSize: "2.5rem",
            marginBottom: "1rem",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Recent Transactions
        </h2>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {transactions.map((transaction, index) => {
            // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
            const amountInSol = parseFloat(transaction.amount) / 1_000_000_000;

            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`transaction-item ${isActive ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onTouchStart={() => setActiveIndex(index)}
                onTouchEnd={() => setActiveIndex(null)}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "1.1rem",
                    color: "#333",
                    fontWeight: "500",
                    wordBreak: "break-word",
                    alignSelf: "flex-end",
                  }}
                >
                  <strong>Transaction ID:</strong> {transaction.signature}
                </p>
                <p
                  style={{
                    margin: "0.5rem 0 0",
                    fontSize: "1rem",
                    color: "#666",
                  }}
                >
                  <strong>Amount:</strong> {amountInSol.toFixed(8)} SOL
                </p>
                <p
                  style={{
                    margin: "0.5rem 0 0",
                    fontSize: "0.875rem",
                    color: "#999",
                  }}
                >
                  <strong>Timestamp:</strong>{" "}
                  {new Date(transaction.timestamp).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
