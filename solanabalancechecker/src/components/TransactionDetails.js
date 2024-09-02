import React from "react";

const TransactionDetails = ({ transactions }) => {
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

            return (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  transition:
                    "transform 0.3s, box-shadow 0.3s, background-color 0.3s",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(0, 0, 0, 0.2)";
                  e.currentTarget.style.backgroundColor = "#bebcbc"; // Change to gray on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.backgroundColor = "#f9f9f9"; // Reset background color
                }}
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
