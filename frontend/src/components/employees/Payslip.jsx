import React, { useEffect, useState } from "react";
import "../../styles/dashboard.css";

const Payslip = () => {
  const [payslips, setPayslips] = useState([]);

  const employeeId = localStorage.getItem("employeeId");

  // Fetch payslips from backend
  useEffect(() => {
    const fetchPayslips = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/payslips/${employeeId}`
        );

        const data = await response.json();
        setPayslips(data);
      } catch (error) {
        console.error("Error fetching payslips:", error);
      }
    };

    fetchPayslips();
  }, [employeeId]);

  return (
    <div className="payslip-wrapper">
      <h1 className="page-title">My Payslips</h1>

      {/* If no payslips available */}
      {payslips.length === 0 && (
        <p style={{ marginTop: "20px" }}>No payslips available yet.</p>
      )}

      {/* List of payslips */}
      <div className="payslip-list">
        {payslips.map((payslip, index) => (
          <div key={index} className="payslip-card">
            <div>
              <h3>
                {payslip.month} {payslip.year}
              </h3>
              <p><strong>Basic Salary:</strong> ₹{payslip.basic}</p>
              <p><strong>Net Pay:</strong> ₹{payslip.netPay}</p>
            </div>

            <button
              className="download-btn"
              onClick={() => window.open(payslip.pdfUrl, "_blank")}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payslip;
